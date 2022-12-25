import { nextPage } from '../services/pagination/next-page';
import { Answer, Question, Snippet } from '../services/data/data.interface';
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import { buttonStyles, containerStyles, styles } from '../styles';
import { log } from '../utils';
import { StepProps } from '../app.interface';
import { QuestionPage } from './questions';

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { showQuestionsAction } from '../store/show-questions-slice';
import { increment } from '../store/step-num-slice';
import { hideQuestionsAction } from '../store/show-questions-slice';
import { setCurrentSnippetId } from '../store/current-snippet-id-slice';
import { useGetAnswersQuery, useGetQuestionsQuery, useGetSnippetsQuery } from "../store/features/api/api-slice";

import { NavButton } from './button';
import { renderSnippet } from './render-snippet';
import { buildStages, questionAnswers, refineQuestions, Step } from '../services/journey';

interface pageResult {
    snippets: Snippet[];
    lastSnippetId: number;
}
  
//export function StepPage({ stage, display }: StepProps) {
export function StepPage( {route, navigation}:any) /*todo remove 'any' see TabOnescreen */ {
    const { stage, display } = route.params;
    
    const dispatch = useAppDispatch();
    const stepNum = useAppSelector(state => state.counter.value);
    const step = stage.steps[stepNum];
    const showQuestions = useAppSelector(state => state.showQuestions.value);
    const currentSnippetId = useAppSelector(state => state.currentSnippetId.value);
  
    let pageFirstSnippetId = step.start;
    let pageLastSnippetId = 3; //*to-do: fix this

    const pageHistory: number[] = [];
    pageHistory.push(step.start);

    let pageSnippetList = ''; 
    let pageContent:Snippet[] = [];

    let snippetTable:Snippet[] = [];
    let questionTable:Question[] = [];;
    let answerTable:Answer[] = [];;

    const {
        data: snippetsResponse,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSnippetsQuery(stage.start, stage.end);
    
    if (isLoading) {
        return <Text>Loading paragraphs...</Text>;
      } else if (isSuccess) {
        snippetTable = snippetsResponse.body;
      } else if (isError) {
        return <Text>{error.toString()}</Text>;
    }
    /*
    const {
        data: questionsResponse,
        isLoading: questionsLoading,
        isSuccess: questionsSuccess,
        isError: questionsError,
        error: questionsMsg
    } = useGetQuestionsQuery(stage.start, stage.end);
    
    if (questionsLoading) {
        return <Text>Loading questions...</Text>;
      } else if (questionsSuccess) {
        questionTable = questionsResponse.body;
      } else if (questionsError) {
        return <Text>{questionsMsg.toString()}</Text>;
    }
    const {
        data: answersResponse,
        isLoading: answersLoading,
        isSuccess:answersSuccess,
        isError: answersError,
        error: answersMsg
    } = useGetAnswersQuery(stage.start, stage.end);
    
    if (answersLoading) {
        return <Text>Loading answers...</Text>;
      } else if (answersSuccess) {
        answerTable = answersResponse.body;
      } else if (answersError) {
        return <Text>{answersMsg.toString()}</Text>;
      }
 */
  function getPage(snippets:Snippet[], current: number):pageResult {
    log(0, 'current', current, true);
    const result = nextPage(snippets, current, stage.steps[stepNum].snippetIds, display);
    pageSnippetList = result.reduce((a, i) => a + i.snippetId + ',', '');
    return {
      snippets: result,
      lastSnippetId: result[result.length - 1].snippetId
    }
  }


  function zgetPage (snippets:Snippet[], current: number) {
    const result = getPage(snippets, current);
    pageContent = result.snippets;
    pageLastSnippetId = result.lastSnippetId;
  };
  
    const stepSnippets:Snippet[] = [];
    for (const s of snippetTable) {
        if (s.snippetId >= step.start && s.snippetId <= step.end)
            stepSnippets.push(s)
    }

    const tmp:Question[] = [];
    for (const q of questionTable) 
        for (const s of snippetTable)
            if (s.subjectId === q.subjectId
                && s.snippetId === q.snippetId)
                tmp.push(q);
    
    const stepQuestions = refineQuestions(tmp);
    //const stepQuestions = refineQuestions(questionTable.filter(q=>q.snippetId >= step.start && q.snippetId <= step.end));


    const stepAnswers:Answer[] = [];
    for (const a of answerTable)
        for (const q of questionTable)
            if (a.subjectId === q.subjectId
                && a.snippetId === q.snippetId
                && a.questionId == q.questionId)
                stepAnswers.push(a);
    
    const p = getPage(stepSnippets, currentSnippetId);
    pageContent = p.snippets;
    pageLastSnippetId = p.lastSnippetId;

/*
  useEffect(() => {
    getPage(stepSnippets, pageFirstSnippetId);
    /*
    //*todo: do this in stepNum useEffect:
    useEffect(() => {
        async function getQuestions(step: Step) {
            setQuestions(await stepQuestions(step));
            let result: Answer[] = [];
            for (const q of questions) {
                const a = await questionAnswers(q)
                result = result.concat(a);
            }
            setAnswers(result);
        }
      getQuestions();
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFirstSnippetId]);
*/
  /*
  useEffect(() => {
    log(0,'next step click. snippetId set to',steps[stepNum].snippets[0].snippetId)
    setPageFirstSnippetID(steps[stepNum].snippets[0].snippetId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepNum]);
  */


    return (
        <View style={containerStyles.container}>
            <View style={containerStyles.contentContainer}> 
                <View style={containerStyles.header}>
                    <Text>Stage {stage.stageId}   Step {stepNum}:   Page snippets:{pageContent.reduce((a, i) => a + i.snippetId + ',', '')}  Step snippets: {step.snippetIds.join(',')}</Text>
          </View>
          <View style={containerStyles.panelContainer}>
            <View style={containerStyles.leftPanel}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 1 }}>
                {currentSnippetId > step.start && <NavButton title='<' style={buttonStyles.newNavButton} onPress={() => dispatch(setCurrentSnippetId(pageHistory.pop() ?? step.start))} />}
              </View>
              <View style={{flex: 1}}></View>
            </View>
            <View style={containerStyles.centrePanel}>
            <View style={containerStyles.body}>
                    { pageLastSnippetId <= step.end && !showQuestions &&
                        <View>
                            <>
                                {pageContent.map(s => renderSnippet(s))}
                            </>
                        </View>
                    }
                            {showQuestions && <QuestionPage questions={stepQuestions} answers={stepAnswers} stepStart={step.start} /> }        
                </View>
            </View>
            <View style={containerStyles.rightPanel}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 1 }}>
                {pageLastSnippetId < step.end && <NavButton title='>' style={buttonStyles.newNavButton} onPress={() => { dispatch(setCurrentSnippetId(pageLastSnippetId + 1)); pageHistory.push(pageLastSnippetId + 1) }} />}
              </View>
              <View style={{flex: 1}}></View>
            </View>
          </View>
                
            </View>
        <View style={styles.footer}>
            {pageLastSnippetId === step.end && 
                <NavButton title='Test me' style={buttonStyles.answerButton} onPress={() => { dispatch(showQuestionsAction()) }} />
            }
            {showQuestions &&
                <>          
                    <Button title='Wrong Answer' onPress={() => { dispatch(hideQuestionsAction()); dispatch(setCurrentSnippetId(step.start)) }} />
                    <Button title='Right Answer' onPress={() => { dispatch(increment()); dispatch(hideQuestionsAction()); dispatch(setCurrentSnippetId(step.start)) }} />
                </>
            }
        </View>
        </View>
    )
}


