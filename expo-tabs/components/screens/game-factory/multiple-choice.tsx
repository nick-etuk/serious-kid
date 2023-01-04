import { AnswerButton } from 'components/button';
import { View, Text } from 'react-native';
import { Answer, Question } from 'services/data';
import { buttonStyles, textStyles } from 'styles';
import { log, recordAction } from 'utils';
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { stepNumIncrement } from 'store/step-num-slice';
import { incrementScore, decrementScore } from 'store/score-slice';
import { incrementQuestionIndex, decrementQuestionIndex, resetQuestionIndex } from 'store/question-index-slice';


interface GameHeaderProps {
    question: Question;
    answers: Answer[];
    questionIndex: number;
    questionCount: number;
    stageEnd: number;
    navigation: any;
}

export function MulitpleChoice({ question, answers, questionIndex, questionCount, stageEnd, navigation }: GameHeaderProps) {
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
        if (a.answerId === 1) {
            alert(`Correct! ${a.answerId} - ${a.descr}`);
            dispatch(incrementScore());
        } else {
            alert(`Wrong! ${a.answerId} - ${a.descr}`);
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
        navigation.navigate('Step'); //*todo: do we need StepPage parameters?
    }
    return (
        <>
            <Text style={textStyles.normal}>{question ? question.descr : 'There are no questions for this section'}</Text>
            { question && answers.filter(a =>a.snippetId===question.snippetId && a.questionId === question.questionId).map(a =>
                <AnswerButton style={buttonStyles.answerButton} title={a.answerId + '. ' + a.descr} key={a.answerId}
                onPress={() => answerClick(question, a)} />)
            }
        </>
    )
}