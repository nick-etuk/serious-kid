import { AnswerButton } from 'components/button';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Answer, Question } from 'services/data';
import { buttonStyles, textStyles } from 'styles';
import { log, recordAction } from 'utils';
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { stepNumIncrement } from 'store/step-num-slice';
import { incrementScore, decrementScore } from 'store/score-slice';
import { incrementQuestionIndex, decrementQuestionIndex, resetQuestionIndex } from 'store/question-index-slice';
import { GameProps } from './game.interface';
import { useState } from 'react';
import { DONT_KNOW } from 'constants/labels';
import { setActivity } from 'store/activity-slice';
import { ACTIVITY } from 'utils/constants';
import { decrementHealth } from 'store/health-slice';
import { decrementLives } from 'store/lives-slice';

export function TextInputQuestion({ question, answers, questionIndex, questionCount, stageEnd, navigation }: GameProps) {
    const logLevel = 1;
    const [answer, setAnswer] = useState("");


    const dispatch = useAppDispatch();
    
    const stepNum = useAppSelector(state => state.stepNum.value);
    const score = useAppSelector(state => state.score.value);


    log(logLevel, 'question', question, true);
    log(logLevel, 'answers', answers, true);
    log(logLevel, 'question', questionIndex, true);
    log(logLevel, 'score', score, true);
    log(logLevel, 'questionCount', questionCount, true);

    function answerSubmit(question:Question, answer: string, options:Answer[]) {
        log(logLevel, 'answer', answer);
        const correctAnswer = answers.find(a => a.answerId === 1);
        if (answer === correctAnswer?.descr) {
            alert(`Correct! ${answer}`);
            dispatch(incrementScore());
        } else {
            alert(`Wrong! ${answer}. The correct answer is ${correctAnswer?.descr}`);
            dispatch(decrementLives());
        }
        recordAction('answer', [question.snippetId, question.questionId].join(','), answer);
        if (questionIndex === questionCount - 1) navigateNextStep();
        dispatch(incrementQuestionIndex());
    }

    function dontKnowClick(q:Question, a: Answer) {
        alert("Don't know");
        dispatch(decrementHealth());
        recordAction('answer', [question.snippetId, question.questionId].join(','), dontKnow.answerId + '.' + dontKnow.descr);
        if (questionIndex === questionCount - 1) navigateNextStep();
        dispatch(incrementQuestionIndex());
        navigateBackToStep();
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
        subjectId: question.subjectId,
        snippetId: question.snippetId,
        questionId: question.questionId,
        answerId: DONT_KNOW.labelId,
        descr: DONT_KNOW.descr
    }

    return (
        <>
            {questionCount > 0
                ?
                <>
                    <Text style={textStyles.normal}>{question.descr}</Text>
                    <TextInput style={textStyles.input} onChangeText={setAnswer} onSubmitEditing={() => answerSubmit(question, answer, answers)} />
                    <Text style={textStyles.normal}>Answer: {answers.find(a => a.answerId === 1)?.descr}</Text>
                    
                    <AnswerButton
                        style={buttonStyles.answerButton}
                        title={dontKnow.descr}
                        key={dontKnow.answerId}
                        onPress={() => dontKnowClick(question, dontKnow)}
                    />
                </>
                :
                <Text style={textStyles.normal}>There are no questions for this paragraph</Text>
            }
        </>
    )
}
