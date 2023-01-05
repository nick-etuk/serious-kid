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

    function answerSubmitted(question:Question, answer: string, options:Answer[]) {
        log(logLevel, 'answer', answer);
        const correctAnswer = answers.find(a => a.answerId === 1);
        if (answer === correctAnswer?.descr) {
            alert(`Correct! ${answer}`);
            dispatch(incrementScore());
        } else {
            alert(`Wrong! ${answer}. The correct answer is ${correctAnswer?.descr}`);
        }
        recordAction('answer', [question.snippetId, question.questionId].join(','), answer);
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
    return (
        <>
            {questionCount > 0
                ?
                <>
                    <Text style={textStyles.normal}>{question.descr}</Text>
                    <TextInput style={textStyles.input} onChangeText={setAnswer} onSubmitEditing={() => answerSubmitted(question, answer, answers)} />
                    <Text style={textStyles.normal}>Answer: {answers.find(a => a.answerId === 1)?.descr}</Text>
                </>
                :
                <Text style={textStyles.normal}>There are no questions for this paragraph</Text>
            }
        </>
    )
}
