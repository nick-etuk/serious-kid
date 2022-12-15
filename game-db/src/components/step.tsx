import { nextPage } from '../services/pagination/next-page';
import { Snippet } from '../services/data/data.interface';
import React, { useState, useEffect } from 'react';
import { log } from '../../utils/log';
import { StepProps } from '../app.interface';
import { QuestionPage } from './questions';

import { useAppSelector } from '../store/hooks'

export function StepPage({ steps, display }: StepProps) {
  const pageHistory: number[] = [];
  let pageSnippetList = '';

  interface pageResult {
    snippets: Snippet[];
    lastSnippetID: number;
  }

  function getPageSub(currentSnippetId: number):pageResult {
    log(0, 'currentSnippetId', currentSnippetId, true);
    const result = nextPage(currentSnippetId, steps[stepNum].snippets, display);
    pageSnippetList = result.reduce((a, i) => a + i.snippetId + ',', '');
    return {
      snippets: result,
      lastSnippetID: result[result.length - 1].snippetId
    }
  }


  const getPage = (currentSnippetId: number) => {
    setLoading(true);
    const result = getPageSub(currentSnippetId);
    setPageContent(result.snippets);
    setlastSnippetID(result.lastSnippetID);
    setLoading(false);
  };
  
  //const [stepNum, setStepNum] = useState(0);
  const stepNum = useAppSelector(state => state.counter.value);

  const initialSnippetId = steps[stepNum].snippets[0].snippetId;
  pageHistory.push(initialSnippetId);
  const [loading, setLoading] = useState(true);
  const [pageFirstSnippetID, setPageFirstSnippetID] = useState(initialSnippetId);
  const [pageContent, setPageContent] = useState([] as Snippet[]);
  const [lastSnippetID, setlastSnippetID] = useState(3); //*to-do: fix this

  useEffect(() => {
    getPage(pageFirstSnippetID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFirstSnippetID]);

  /*
  useEffect(() => {
    log(0,'next step click. snippetId set to',steps[stepNum].snippets[0].snippetId)
    setPageFirstSnippetID(steps[stepNum].snippets[0].snippetId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepNum]);
  */
  if (loading) return (<div>Loading...</div>);

    return (
    <div>
    { lastSnippetID <= steps[stepNum].end && 
          <div>
            <p>Step {stepNum}: Step snippets: {steps[stepNum].snippets.reduce((a, i) => a + i.snippetId + ',', '')} Page snippets:{pageContent.reduce((a, i) => a + i.snippetId + ',', '')}</p>
            {pageContent.map(s => <p key={s.snippetId}>{s.descr}   [{s.snippetId}]</p>)}
            <div></div>
            <button onClick={() => setPageFirstSnippetID(pageHistory.pop() ?? 1)}>Previous</button>
            <button onClick={() => { setPageFirstSnippetID(lastSnippetID + 1); pageHistory.push(lastSnippetID + 1) }}>Next</button>
            <br/><br/>
            <QuestionPage questions={steps[stepNum].questions}/>
        </div>
            }
    { lastSnippetID > steps[stepNum].end && 
       <QuestionPage questions={steps[stepNum].questions}/>
    }
            
    </div>)
}


