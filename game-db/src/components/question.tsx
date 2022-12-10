/*
import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
*/
import { nextPage } from '../services/pagination/next-page';
import { Snippet } from '../services/data/data.interface';
import React, { useState, useEffect } from 'react';
import { getStudentPos } from '../services/student/progress';
import { log } from '../../utils/log';
import { listSnippets } from '../services/data';
import { getQuestions, refineQuestions, Step } from '../services/journey';
import { Link } from 'react-router-dom';

export function StepPage() {
  //var pageSnippets: snippet[] = [];
  //var pageContent1: JSX.Element[] = [];
  //var pageContent: JSX.Element[] = [];
  //let pageContentStr = '';
  const pageHistory: number[] = [];

  interface pageResult {
    snippets: Snippet[];
    lastSnippetID: number;
  }

  async function getPageSub(start: number):Promise<pageResult> {
    log(0, 'pos:', start, true);
    const pageSnippets = await nextPage(start);

    const x = pageSnippets.reduce((a, i) => a + i.id + ',', '');
    console.log('snippets:' + x);
    //log(0, 'snippets:'+x, null, true);

    const result = pageSnippets;

    return await Promise.resolve({
      snippets: result,
      lastSnippetID: pageSnippets[pageSnippets.length - 1].id
    });
  }

  async function askQuestions(step: Step) {
    const snippets = await listSnippets(step.start, step.end);
    const questions = getQuestions(snippets);
    const refined = refineQuestions(questions);
    console.log(refined);
    //navigate to questions(refined)

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

  //const x = await listSnippets(1,3);
  //log(0, 'snippets 1 to 3:', x, true);
  //const [studentPos, setStudentPos] = useState(getStudentPos(1));    
  const [studentPos, setStudentPos] = useState(1);    

  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pageContent, setPageContent] = useState([] as Snippet[]);
  const [lastSnippetID, setlastSnippetID] = useState(3);


  const getPage = async(start: number) => {
    setLoading(true);
    const result = await getPageSub(start).then((x) => x);
    setPageContent(result.snippets);
    setlastSnippetID(result.lastSnippetID);
    setLoading(false);
  };
  
  pageHistory.push(1);

  const step:Step = {
    id: 1,
    start: 1,
    end: 6
  };

  const studenContext = {
    pos: getStudentPos(1),
    lastSnippetID: 3
  };

  //const [lastSnippetID, setlastSnippetID] = useState(result.lastSnippetID);

  //const actual = listSnippets(3, 6);
  //log(0, 'snippets 3 to 6:', actual);

  useEffect(() => {
    getPage(pageNum);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);
  
  if (loading) return (<div>Loading...</div>);

  return (
    <div>
      {pageContent.map(s =>
        <p key={s.id}>{s.content}</p>)}
      <div></div>
      {<button onClick={()=>setPageNum(pageHistory.pop() ?? 1)}>Previous</button>}
      <button onClick={() => { setPageNum(lastSnippetID + 1); pageHistory.push(lastSnippetID + 1) }}>Next</button>
      {lastSnippetID===step.end && <Link to="/question/1">Questions</Link>}
    </div>
  );
}


