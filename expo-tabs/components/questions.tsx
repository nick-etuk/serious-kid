
//import { Answer, Question } from '../services/data/data.interface';
import React, { useState } from 'react';
import { log, recordAction } from '../utils';
import { QuestionProps } from '../app.interface';

import { useAppDispatch } from '../store/hooks'
import { increment } from '../store/step-num-slice';
import { hideQuestionsAction } from '../store/show-questions-slice';
import { setCurrentSnippetId } from '../store/current-snippet-id-slice';


import { View } from 'react-native';
import { AnswerButton, NavButton } from './button';

export function QuestionPage({ questions, stepStart }:QuestionProps) {
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
    log(0,'q:', q, true);

    return (
        <View>  
            <p>{q ? q.descr : 'There are no questions for this section'}</p>
            <br></br>
            {q && q.answers.map(a =>
                <AnswerButton title={a.descr} key={a.answerSeq} onPress={() => {
                    alert('answer ' + a.answerSeq + ' clicked');
                    recordAction('answer', [q.snippetId, q.questionSeq].join(','), a.answerSeq + '.' + a.descr);
                    if (questionNum === questions.length-1) navigateNextStep;
                    setQuestionNum(questionNum + 1);
                }
                }/>)
          }
            <NavButton title='Wrong Answer' onPress={() => { dispatch(hideQuestionsAction()); dispatch(setCurrentSnippetId(stepStart)) }} />
            <NavButton title='Right Answer' onPress={() => { dispatch(increment()); dispatch(hideQuestionsAction()); dispatch(setCurrentSnippetId(stepStart)) }} />
        </View>
    );
}


