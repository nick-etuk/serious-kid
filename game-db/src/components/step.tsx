import { nextPage } from '../services/pagination/next-page';
import { Snippet } from '../services/data/data.interface';
import React, { useState, useEffect } from 'react';
import { log } from '../../utils/log';
import { AppProps } from '../app.interface';
import { QuestionPage } from './questions';

export function StepPage({ step, questions, display }:AppProps) {
  //var pageSnippets: snippet[] = [];
  //var pageContent1: JSX.Element[] = [];
  //var pageContent: JSX.Element[] = [];
  //let pageContentStr = '';
  const pageHistory: number[] = [];

  interface pageResult {
    snippets: Snippet[];
    lastSnippetID: number;
  }

  function getPageSub(currentSnippetId: number):pageResult {
    log(0, 'currentSnippetId', currentSnippetId, true);
    const result = nextPage(currentSnippetId, step.snippets, display);
    const x = result.reduce((a, i) => a + i.snippetId + ',', '');
    console.log('snippets:' + x);
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
  
  pageHistory.push(step.currentSnippetId);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(step.currentSnippetId);
  const [pageContent, setPageContent] = useState([] as Snippet[]);
  const [lastSnippetID, setlastSnippetID] = useState(3);

  useEffect(() => {
    getPage(pageNum);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);
  
  if (loading) return (<div>Loading...</div>);

    return (
    <div>
    { lastSnippetID <= 3 /*step.end*/ && 
        <div>
            {pageContent.map(s => <p key={s.snippetId}>{s.descr}</p>)}
            <div></div>
            <button onClick={()=>setPageNum(pageHistory.pop() ?? 1)}>Previous</button>
            <button onClick={() => { setPageNum(lastSnippetID + 1); pageHistory.push(lastSnippetID + 1) }}>Next</button>
        </div>
            }
    { lastSnippetID > 3 /*step.end*/ && 
       <QuestionPage questions={questions} step={step} display={display} />
    }
            
    </div>)
}


