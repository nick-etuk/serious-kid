import { nextPage } from '../services/pagination/next-page';
import { Snippet } from '../services/data/data.interface';
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


import { NavButton } from './button';
import { renderSnippet } from './render-snippet';
import { stepQuestions } from '../services/journey/step-questions';
import { buildStages } from '../services/journey';

//export function StepPage({ stage, display }: StepProps) {
export function StepPage( {route, navigation}:any) {
  const { stage, display } = route.params;

  const pageHistory: number[] = [];
  let pageSnippetList = '';

  interface pageResult {
    snippets: Snippet[];
    lastSnippetID: number;
  }

  function getPageSub(currentSnippetId: number):pageResult {
    log(0, 'currentSnippetId', currentSnippetId, true);
    const result = nextPage(currentSnippetId, stage.steps[stepNum].snippetIds, display);
    pageSnippetList = result.reduce((a, i) => a + i.snippetId + ',', '');
    return {
      snippets: result,
      lastSnippetID: result[result.length - 1].snippetId
    }
  }


  function getPage (currentSnippetId: number) {
    setLoading(true);
    const result = getPageSub(currentSnippetId);
    setPageContent(result.snippets);
    setlastSnippetID(result.lastSnippetID);
    setLoading(false);
  };
  
    //const [stepNum, setStepNum] = useState(0);
    const dispatch = useAppDispatch();
    const stepNum = useAppSelector(state => state.counter.value);
    const step = stage.steps[stepNum];
    const showQuestions = useAppSelector(state => state.showQuestions.value);
    const currentSnippetId = useAppSelector(state => state.currentSnippetId.value);
  
  
    const [loading, setLoading] = useState(true);
    //const [showQuestions, setShowQuestions] = useState(false);
    log(1, 'stepNum bp1', stepNum, true);
    const [pageFirstSnippetId, setPageFirstSnippetID] = useState(step.start);
    pageHistory.push(step.start);
  
    const [pageContent, setPageContent] = useState([] as Snippet[]);
    const [pageLastSnippetId, setlastSnippetID] = useState(3); //*to-do: fix this
  

  useEffect(() => {
    getPage(pageFirstSnippetId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFirstSnippetId]);

  /*
  useEffect(() => {
    log(0,'next step click. snippetId set to',steps[stepNum].snippets[0].snippetId)
    setPageFirstSnippetID(steps[stepNum].snippets[0].snippetId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepNum]);
  */
  if (loading) return (<View><Text>Loading...</Text></View>);

  const prevButtonStyle = pageFirstSnippetId > step.start ? buttonStyles.show : buttonStyles.hide;
  const nextButtonStyle = pageLastSnippetId < step.end  ? buttonStyles.show : buttonStyles.hide;
  //const questionsButtonStyle = pageLastSnippetId === steps[stepNum].end  ? buttonStyles.show : buttonStyles.hide;

    return (
        <View style={containerStyles.container}>
            <View style={containerStyles.contentContainer}> 
                <View style={containerStyles.header}>
                    <Text>Step {stepNum}: Page snippets:{pageContent.reduce((a, i) => a + i.snippetId + ',', '')}  Step snippets: {step.snippetIds.join(',')}</Text>
          </View>
          <View style={containerStyles.panelContainer}>
            <View style={containerStyles.leftPanel}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 1 }}>
                {pageFirstSnippetId > step.start && <NavButton title='<' style={buttonStyles.newNavButton} onPress={() => setPageFirstSnippetID(pageHistory.pop() ?? 1)} />}
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
                    {showQuestions && <QuestionPage questions={stepQuestions(step)} stepStart={step.start} /> }        
                </View>
            </View>
            <View style={containerStyles.rightPanel}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 1 }}>
                {pageLastSnippetId < step.end && <NavButton title='>' style={buttonStyles.newNavButton} onPress={() => { setPageFirstSnippetID(pageLastSnippetId + 1); pageHistory.push(pageLastSnippetId + 1) }} />}
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


