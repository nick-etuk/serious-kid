/*
import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
*/
import { nextPage } from '../services/pagination/next-page';
import { snippet } from '../services/data/data.interface';
import { useState } from 'react';
import { getCurrentSnippet } from '../services/student/progress';



export function TabOneScreen() {
  var pageSnippets: snippet[] = [];
  var pageContent1: JSX.Element[] = [];
  //var pageContent: JSX.Element[] = [];
  var lastSnippet = getCurrentSnippet(1);
  const pageHistory: number[] = [];


  const [pageContent, setPageContent] = useState();


  const gotoPage = (start: number) => {
    pageSnippets = nextPage(lastSnippet.id);
    lastSnippet = pageSnippets[pageSnippets.length - 1];
    
    pageContent1 = pageSnippets.map(s =>
      <p key={s.id}>{s.content}</p>
    );
    setPageContent(pageContent1);
  }

  function nextPageClick() {
    pageHistory.push(lastSnippet.id);
    gotoPage(lastSnippet.id);
  }

  function prevPageClick() {
    gotoPage(pageHistory.pop() ?? 0);
  }

  gotoPage(lastSnippet.id);

  return (
    <div >
      {pageContent}
      <div>
      </div>
      <button title='Previous' onClick={prevPageClick} />
      <button title='Next' onClick={nextPageClick} />
    </div>
  );
}


