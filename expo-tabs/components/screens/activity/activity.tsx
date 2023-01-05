
import React, { useEffect, useState } from 'react';
import { log, recordAction } from 'utils';
import { QuestionProps } from 'components/components.interface';
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { stepNumDecrement, stepNumIncrement } from 'store/step-num-slice';
import { incrementQuestionIndex, decrementQuestionIndex, resetQuestionIndex } from 'store/question-index-slice';

import { hideQuestionsAction } from 'store/show-questions-slice';
import { setCurrentSnippetId } from 'store/current-snippet-id-slice';
import { View, Text, useWindowDimensions } from 'react-native';
import { AnswerButton, NavButton } from 'components/button';
import { buttonStyles, containerStyles, textStyles } from 'styles';
import { questionAnswers } from 'services/journey';
import { Answer, Question, Snippet } from 'services/data/data.interface';
import { GameHeader } from 'components/screens/game-factory/game-header';
import { random } from 'lodash';
import { incrementScore } from 'store/score-slice';
import { MultipleChoice } from 'components/screens/game-factory/multiple-choice';
import { getNextGame } from 'components/screens/game-factory/next-game';
import { student } from 'services/student';
import { shuffle } from 'components/screens/game-factory/shuffle';
import { TextInputQuestion } from 'components/screens/game-factory/text-input-question';
import { ACTIVITY } from 'utils/constants';
import { setActivity } from 'store/activity-slice';
import { getPage } from 'services/pagination/get-next-page';
import { TutorHeader } from '../step/tutor-header';
import { Tutor } from './tutor';

export function Activity({ route, navigation }: any) /*todo remove 'any' see TabOnescreen */ {
    const logLevel = 1;
    const { stage } = route.params;
    const { height, width, scale, fontScale } = useWindowDimensions();

    const dispatch = useAppDispatch();
    let activity = useAppSelector(state => state.activity.value);
    let stepNum = useAppSelector(state => state.stepNum.value);
    let step = stage.steps[stepNum];
    let questionIndex = useAppSelector(state => state.questionIndex.value);

    const question: Question = step.questions[questionIndex];
    //log(logLevel, 'bp 1 step', step, true);
    shuffle(step.answers);
    log(logLevel, 'step.answers after shuffle', step.answers, true);

    const answers: Answer[] = step.answers;
    const game = getNextGame(student);
    
    const questionCount = step.questions.length;
    log(logLevel, 'questionCount', questionCount, true);

    const currentSnippetId = useAppSelector(state => state.currentSnippetId.value);
  
    let pageFirstSnippetId = step.start;
    let pageLastSnippetId = 3; //*to-do: fix this

    const pageHistory: number[] = [];
    pageHistory.push(step.start);

    let pageSnippetList = ''; 
    let pageContent:Snippet[] = [];

    function navigateNext() {
        log(logLevel, 'navigate Next', '', true);
        log(logLevel, 'activity', activity, true);
        if (activity === ACTIVITY.tutor) navigateNextPage();
        if (activity === ACTIVITY.multi) navigateNextQuestion();
        if (activity === ACTIVITY.input) navigateNextQuestion();
    }

    function navigatePrev() {
        if (activity === ACTIVITY.tutor) navigatePrevPage();
        if (activity === ACTIVITY.multi) navigatePrevQuestion();
        if (activity === ACTIVITY.input) navigatePrevQuestion();
    }

    function navigateNextPage() {
        log(logLevel, 'navigate NextPage', '', true);
        if (pageLastSnippetId === step.end) {
            log(logLevel, 'bp 1 dispatch(setActivity(game));', '', true);
            dispatch(setActivity(game));
            log(logLevel, 'bp2 - done', '', true);
            return;
        }
        
        if (stepNum === stage.end) {
            navigation.navigate('Stages');
            return;
        }
        
        pageHistory.push(pageLastSnippetId); 
        dispatch(setCurrentSnippetId(pageLastSnippetId + 1));
    }
    
    function navigatePrevPage() {
        if (stepNum === stage.start) {
            navigation.navigate('Stages');
            return;
        }
        
        if (pageFirstSnippetId === step.start) {
            dispatch(stepNumDecrement());
            return;
        }
        
        //dispatch(setCurrentSnippetId(step.start))
        dispatch(setCurrentSnippetId(pageHistory.pop() ?? step.start))
    }
    const p = getPage(step.snippets, currentSnippetId, step.start, height, width);
    pageContent = p.snippets;
    pageLastSnippetId = p.lastSnippetId;
    
    function navigateNextStep() {
        log(logLevel, 'questionIndex', questionIndex, true);
        if (stepNum === stage.end) {
            navigation.navigate('Stages');
            return;
        }
        dispatch(resetQuestionIndex()); 
        dispatch(stepNumIncrement());
        //dispatch(setCurrentSnippetId(step.start))
        //navigation.navigate('Step'); //*todo: do we need StepPage parameters?
        dispatch(setActivity(ACTIVITY.tutor));
    }
    
    function navigateBackToStep() {
        log(logLevel, 'questionIndex', questionIndex, true);
        dispatch(resetQuestionIndex());
        //navigation.navigate('Step'); //*todo: do we need StepPage parameters?
        dispatch(setActivity(ACTIVITY.tutor));
    }
    
    function navigateNextQuestion() {
        log(logLevel, 'navigate Next Question', '', true);
        if (questionIndex >= questionCount - 1) {
            navigateNextStep();
            return
        }
        dispatch(incrementQuestionIndex());
    }

    function navigatePrevQuestion() {
        if (questionIndex <= 0) {
            navigateBackToStep();
            return
        }
        dispatch(decrementQuestionIndex());
    }

    const pageSnippetIds = pageContent.reduce((a, i) => a + i.snippetId + ',', '');

    log(logLevel, 'Activity', activity, true);
    log(logLevel, 'Stage', stage.stageId, true);
    log(logLevel, 'stepNum', stepNum, true);
    //log(logLevel, 'Step', step, true);        
    log(logLevel, 'Page snippets', pageSnippetIds, true);
    if (activity !== ACTIVITY.tutor) {
        log(logLevel, 'question:', question, true);
        log(logLevel, 'questionIndex:', questionIndex, true);
        //log(logLevel,'questions:', step.questions, true);
    }

    return (
        <View style={containerStyles.container}>
            <View style={containerStyles.contentContainer}> 
                <View style={containerStyles.header}>
                    {activity === ACTIVITY.tutor
                    ? <TutorHeader stageId={stage.stageId} stepNum={stepNum} pageContent={pageContent} step={step} height={height} width={width} />
                    : <GameHeader game={game} stepNum={stepNum} questionIndex={questionIndex} questionCount={questionCount} />
                    }
                </View>
            <View style={containerStyles.panelContainer}>
                <View style={containerStyles.leftPanel}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1 }}>
                        { <NavButton title='<' style={buttonStyles.newNavButton} onPress={() => navigatePrev()} />}
                    </View>
                    <View style={{flex: 1}}></View>
                </View>
                <View style={containerStyles.centrePanel}>
                    <View style={containerStyles.body}>
                        {/*activityFactory(activity)*/}
                        {activity === ACTIVITY.multi && <MultipleChoice question={question} answers={answers} questionIndex={questionIndex} questionCount={questionCount} stageEnd={stage.end} navigation={navigation} pageContent={[]}/>}
                        {activity === ACTIVITY.input && <TextInputQuestion question={question} answers={answers} questionIndex={questionIndex} questionCount={questionCount} stageEnd={stage.end} navigation={navigation} pageContent={[]} />}
                        {activity === ACTIVITY.tutor && <Tutor pageContent={pageContent} dictionary={step.dictionary} />}
                    </View>
                </View>
                <View style={containerStyles.rightPanel}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1 }}>
                        { <NavButton title='>' style={buttonStyles.newNavButton} onPress={() => navigateNext()} />}
                    </View>
                    <View style={{flex: 1}}></View>
                </View>
            </View>
            </View>
            <View style={containerStyles.footer}></View>
        </View>
    );
}
