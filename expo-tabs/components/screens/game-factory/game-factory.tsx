
import React, { useEffect, useState } from 'react';
import { log, recordAction } from 'utils';
import { QuestionProps } from 'components/components.interface';
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { stepNumIncrement } from 'store/step-num-slice';
import { incrementQuestionIndex, decrementQuestionIndex, resetQuestionIndex } from 'store/question-index-slice';

import { hideQuestionsAction } from 'store/show-questions-slice';
import { setCurrentSnippetId } from 'store/current-snippet-id-slice';
import { View, Text } from 'react-native';
import { AnswerButton, NavButton } from 'components/button';
import { buttonStyles, containerStyles, textStyles } from 'styles';
import { questionAnswers } from 'services/journey';
import { Answer, Question } from 'services/data/data.interface';
import { GameHeader } from './game-header';
import { random } from 'lodash';
import { incrementScore } from 'store/score-slice';
import { MulitpleChoice } from './multiple-choice';
import { getNextGame } from './next-game';
import { student } from 'services/student';
import { shuffle } from './shuffle';
import { TextInputQuestion } from './text-input-question';

export function GameFactory({ route, navigation }: any) /*todo remove 'any' see TabOnescreen */ {
    const logLevel = 1;
    const { step, stageEnd } = route.params;
    
    const dispatch = useAppDispatch();
    let questionIndex = useAppSelector(state => state.questionIndex.value);
    const question: Question = step.questions[questionIndex];
    shuffle(step.answers);
    const answers: Answer[] = step.answers;
    const game = getNextGame(student);
    
    const questionCount = step.questions.length;
    log(logLevel, 'questionCount', questionCount, true);

    const stepNum = useAppSelector(state => state.stepNum.value);

    function navigateNextStep() {
        log(logLevel, 'questionIndex', questionIndex, true);
        if (stepNum === stageEnd) {
            navigation.navigate('Stages');
            return;
        }
        dispatch(resetQuestionIndex()); 
        dispatch(stepNumIncrement());
        //dispatch(setCurrentSnippetId(step.start))       
        navigation.navigate('Step'); //*todo: do we need StepPage parameters?
    }

    function navigateBackToStep() {
        log(logLevel, 'questionIndex', questionIndex, true);
        dispatch(resetQuestionIndex());
        navigation.navigate('Step'); //*todo: do we need StepPage parameters?
    }
    
    function navigateNextQuestion() {
        if (questionIndex === questionCount - 1) {
            navigateNextStep();
            return
        }
        dispatch(incrementQuestionIndex());
    }

    function navigatePrevQuestion() {
        if (questionIndex === 0) {
            navigateBackToStep();
            return
        }
        dispatch(decrementQuestionIndex());
    }

    log(logLevel,'questions:', step.questions, true);
    log(logLevel, 'questionIndex:', questionIndex, true);
    log(logLevel, 'q:', question, true);

    return (
        <View style={containerStyles.container}>
            <View style={containerStyles.contentContainer}> 
                <View style={containerStyles.header}>
                    <GameHeader game={game} stepNum={stepNum} questionIndex={questionIndex} questionCount={questionCount} />
                </View>
            <View style={containerStyles.panelContainer}>
                <View style={containerStyles.leftPanel}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1 }}>
                        { <NavButton title='<' style={buttonStyles.newNavButton} onPress={() => navigatePrevQuestion()} />}
                    </View>
                    <View style={{flex: 1}}></View>
                </View>
                <View style={containerStyles.centrePanel}>
                    <View style={containerStyles.body}>
                        {game === 'MULTI' && <MulitpleChoice question={question} answers={answers} questionIndex={questionIndex} questionCount={questionCount} stageEnd={stageEnd} navigation={navigation} />}
                        {game === 'INPUT' && <TextInputQuestion question={question} answers={answers} questionIndex={questionIndex} questionCount={questionCount} stageEnd={stageEnd} navigation={navigation} />}
                    </View>
                </View>
                <View style={containerStyles.rightPanel}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1 }}>
                        { <NavButton title='>' style={buttonStyles.newNavButton} onPress={() => navigateNextQuestion()} />}
                    </View>
                    <View style={{flex: 1}}></View>
                </View>
            </View>
            </View>
            <View style={containerStyles.footer}></View>
        </View>
    );
}
