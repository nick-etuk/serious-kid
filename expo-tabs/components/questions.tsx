
//import { Answer, Question } from '../services/data/data.interface';
import React, { useEffect, useState } from 'react';
import { log, recordAction } from '../utils';
import { QuestionProps } from '../app.interface';

import { useAppDispatch } from '../store/hooks'
import { increment } from '../store/step-num-slice';
import { hideQuestionsAction } from '../store/show-questions-slice';
import { setCurrentSnippetId } from '../store/current-snippet-id-slice';


import { View, Text } from 'react-native';
import { AnswerButton, NavButton } from './button';
import { buttonStyles } from '../styles';
import { questionAnswers } from '../services/journey';
import { Answer, Question } from '../services/data/data.interface';

async function zgetAnswers(q: Question) {
    const result = await questionAnswers(q);
    return Promise.resolve(result);
}

export function QuestionPage({ questions, answers, stepStart }:QuestionProps) {
    const dispatch = useAppDispatch();

    function navigateNextStep() {
        //set student step in db to = student step + 1;
        //navigate to step page, which should read student step from db
    return
    }

    const [questionNum, setQuestionNum] = useState(0);

    /*
    function answerClick(q:Question, a: Answer) {
        alert('answer ' + a.answerSeq + ' clicked');
        log(0, 'answer ' + a.answerSeq + ' clicked');
        recordAction('answer', [q.snippetId, q.questionSeq].join(','), a.answerSeq + '.' + a.descr);
        if (questionNum === questions.length) navigateNextStep;
        setQuestionNum(questionNum + 1);
    }
    */
    const q = questions[questionNum];
    log(0,'questions:', questions, true);
    log(0, 'questionNum:', questionNum, true);
    log(0, 'q:', q, true);
    /*
    const init: Answer[] = [];
    const [answers, setAnswers] = useState(init);
    useEffect(() => {
        async function getAnswers(questions:Question[]) {
            let result:Answer[] = [];
            for (const q of questions) {
                const a = await questionAnswers(q)
                result = result.concat(a);
            }
            setAnswers(result);
        }
    }, []);
    */
    return (
        <View>  
            <Text>{q ? q.descr : 'There are no questions for this section'}</Text>
            <br></br>
            {q && answers.filter(a=>a.questionId===q.questionId).map(a =>
                <AnswerButton style={buttonStyles.answerButton} title={a.descr} key={a.answerId} onPress={() => {
                    alert('answer ' + a.answerId + ' clicked');
                    recordAction('answer', [q.snippetId, q.questionId].join(','), a.answerId + '.' + a.descr);
                    if (questionNum === questions.length-1) navigateNextStep;
                    setQuestionNum(questionNum + 1);
                }
                }/>)
          }
        </View>
    );
}
