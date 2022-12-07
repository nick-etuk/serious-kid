/*
import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
*/
import { nextPage } from '../services/pagination/next-page';
import { snippet } from '../services/data/data.interface';
import { useState } from 'react';
import { getStudentPos } from '../services/student/progress';
import { log } from '../../utils/log';
import { listSnippets } from '../services/data';



export function TabOneScreen() {
  //var pageSnippets: snippet[] = [];
  //var pageContent1: JSX.Element[] = [];
  //var pageContent: JSX.Element[] = [];
  //let pageContentStr = '';
  const pageHistory: number[] = [];

  function getPage(start: number) {
    log(0, 'pos:', start, true);
    const pageSnippets = nextPage(start);

    const x = pageSnippets.reduce((a, i) => a + i.id + ',', '');
    console.log('snippets:' + x);
    //log(0, 'snippets:'+x, null, true);

    const result = pageSnippets.map(s =>
      <p key={s.id}>{s.content}</p>
    );

    return {
      jsx: result,
      lastSnippetID: pageSnippets[pageSnippets.length - 1].id
    }
  }

  function nextPageClick() {
    pageHistory.push(studentPos);
    const result = getPage(lastSnippetID + 1);
    setPageContent(result.jsx);
    setStudentPos(result.lastSnippetID);
    setlastSnippetID(result.lastSnippetID);
  }

  function prevPageClick() {
    log(0, 'pageHistory:', pageHistory, true);
    const prevPageStart = pageHistory.pop() ?? 1;
    const result = getPage( prevPageStart);
    setPageContent(result.jsx);
    setStudentPos(prevPageStart);
    setlastSnippetID(result.lastSnippetID);
  }

  const [studentPos, setStudentPos] = useState(getStudentPos(1));
  const result = getPage(1);
  pageHistory.push(1);
  const [pageContent, setPageContent] = useState(result.jsx);
  const [lastSnippetID, setlastSnippetID] = useState(result.lastSnippetID);

  //const actual = listSnippets(3, 6);
  //log(0, 'snippets 3 to 6:', actual);

  return (
    <div>
      {pageContent}
      <div></div>
      {studentPos > 1 && <button onClick={prevPageClick}>Previous</button>}
      <button onClick={nextPageClick}>Next</button>
    </div>
  );
}


