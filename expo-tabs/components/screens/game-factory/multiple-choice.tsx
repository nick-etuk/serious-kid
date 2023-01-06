import { AnswerButton } from 'components/button';
import { View, Text } from 'react-native';
import { Answer, Question } from 'services/data';
import { buttonStyles, textStyles } from 'styles';
import { log, recordAction } from 'utils';
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { stepNumIncrement } from 'store/step-num-slice';
import { incrementScore, decrementScore } from 'store/score-slice';
import { incrementQuestionIndex, decrementQuestionIndex, resetQuestionIndex } from 'store/question-index-slice';
import { GameProps } from './game.interface';
import { DONT_KNOW } from 'constants/labels';
import { decrementHealth } from 'store/health-slice';
import { setActivity } from 'store/activity-slice';
import { ACTIVITY } from 'utils/constants';
import { decrementLives } from 'store/lives-slice';


export function MultipleChoice({ question, answers, questionIndex, questionCount, stageEnd, navigation, pageContent }: GameProps) {
    const logLevel = 1;
    const dispatch = useAppDispatch();
    
    const stepNum = useAppSelector(state => state.stepNum.value);
    const score = useAppSelector(state => state.score.value);


    log(logLevel, 'question', question, true);
    log(logLevel, 'answers', answers, true);
    log(logLevel, 'question', questionIndex, true);
    log(logLevel, 'score', score, true);
    log(logLevel, 'questionCount', questionCount, true);

    function answerClick(q:Question, a: Answer) {
        log(logLevel, 'answer', a);
        switch (a.answerId) {
            case 1:
                alert(`Correct! ${a.answerId} - ${a.descr}`);
                dispatch(incrementScore());
                break;
            
            case DONT_KNOW.labelId:
                alert(`Dont' know`);
                dispatch(decrementHealth());
                navigateBackToStep();
                break;
                
                default:
                    alert(`Wrong! ${a.answerId} - ${a.descr}`);
                dispatch(decrementScore());
                dispatch(decrementLives());
        }
        recordAction('answer', [q.snippetId, q.questionId].join(','), a.answerId + '.' + a.descr);
        if (questionIndex === questionCount - 1) navigateNextStep();
        dispatch(incrementQuestionIndex());
    }

    function navigateNextStep() {
        if (stepNum === stageEnd) {
            navigation.navigate('Stages');
            return;
        }
        dispatch(resetQuestionIndex()); 
        dispatch(stepNumIncrement());
        //dispatch(setCurrentSnippetId(step.start))       
        //navigation.navigate('Step'); //*todo: do we need StepPage parameters?
    }

    function navigateBackToStep() {
        log(logLevel, 'questionIndex', questionIndex, true);
        dispatch(resetQuestionIndex());
        //navigation.navigate('Step'); //*todo: do we need StepPage parameters?
        dispatch(setActivity(ACTIVITY.tutor));
    }
    
    const dontKnow: Answer = {
        subjectId: question?.subjectId,
        snippetId: question?.snippetId,
        questionId: question?.questionId,
        answerId: DONT_KNOW.labelId,
        descr: DONT_KNOW.descr
    }

    return (
        <>
            {questionCount > 0
                ?
                <>
                    <Text style={textStyles.normal}>{question.descr}</Text>
                    { question && answers.filter(a =>a.snippetId===question.snippetId && a.questionId === question.questionId).map(a =>
                        <AnswerButton
                            style={buttonStyles.answerButton}
                            title={a.answerId + '. ' + a.descr}
                            key={a.answerId}
                            onPress={() => answerClick(question, a)}
                        />
                    )}
                    
                    <AnswerButton
                        style={buttonStyles.answerButton}
                        title={dontKnow.descr}
                        key={dontKnow.answerId}
                        onPress={() => answerClick(question, dontKnow)}
                    />
                </>
                :
                <Text style={textStyles.normal}>There are no questions for this paragraph</Text>
            }
        </>
    )
}