/*
import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
*/
import { nextPage } from '../services/pagination/next-page';
import { Snippet } from '../services/data/data.interface';
import React, { useState, useEffect } from 'react';
import { log } from '../../utils/log';
import { Link } from 'react-router-dom';
import { AppProps } from '../app.interface';
import { QuestionPage } from './questions';

export function Lesson(snippets:Snippet[]) {
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
    log(0, 'pos:', currentSnippetId, true);
    const pageSnippets = nextPage(currentSnippetId, step.snippets, display);

    const x = pageSnippets.reduce((a, i) => a + i.snippetId + ',', '');
    console.log('snippets:' + x);

    const result = pageSnippets;

    return {
      snippets: result,
      lastSnippetID: pageSnippets[pageSnippets.length - 1].snippetId
    }
  }

  async function nextPageClick() {
    if (lastSnippetID === step.end) {
      askQuestions(step);
      return;
    }

    pageHistory.push(studentPos);
    const result = await getPageSub(lastSnippetID + 1);
    //setPageContent(result.snippets);
    //setStudentPos(result.lastSnippetID);
    //setlastSnippetID(result.lastSnippetID);
  }

  async function prevPageClick() {
    log(0, 'pageHistory:', pageHistory, true);
    const prevPageStart = pageHistory.pop() ?? 1;
    const result = await getPageSub(prevPageStart);
    //setPageContent(result.snippets);
    setStudentPos(prevPageStart);
    studenContext.pos = prevPageStart;
    //setlastSnippetID(result.lastSnippetID);
  }


  const getPage = (pos: number) => {
    setLoading(true);
    const result = getPageSub(pos);
    setPageContent(result.snippets);
    setlastSnippetID(result.lastSnippetID);
    setLoading(false);
  };
  
  pageHistory.push(1);

  const studenContext = {
    pos: getStudentPos(1),
    lastSnippetID: 3
  };

  //const [lastSnippetID, setlastSnippetID] = useState(result.lastSnippetID);

  //const actual = listSnippets(3, 6);
  //log(0, 'snippets 3 to 6:', actual);

  const [studentPos, setStudentPos] = useState(1);    

  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(step.pos);
  const [pageContent, setPageContent] = useState([] as Snippet[]);
  const [lastSnippetID, setlastSnippetID] = useState(3);

  useEffect(() => {
    let pageContent=getPage(pageNum);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);
  
  if (loading) return (<div>Loading...</div>);

  return (
    <div>
      {snippets.map(s =>
        <p key={s.snippetId}>{s.descr}</p>
      )}
      <div></div>
      {<button onClick={()=>setPageNum(pageHistory.pop() ?? 1)}>Previous</button>}
      <button onClick={() => { setPageNum(lastSnippetID + 1); pageHistory.push(lastSnippetID + 1) }}>Next</button>
    </div>
  );
}


