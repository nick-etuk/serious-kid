import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { nextPage } from '../services/pagination/next-page';
import { snippet } from '../services/data/data.interface';
import { useState } from 'react';
import { getCurrentSnippet } from '../services/data/student/progress';



export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  var pageSnippets: snippet[] = [];
  var pageContent1: JSX.Element[] = [];
  //var pageContent: JSX.Element[] = [];
  var lastSnippet = getCurrentSnippet(1);
  const pageHistory: number[] = [];


  const [pageContent, setPageContent] = useState(pageContent1);


  const gotoPage = (start: number) => {
    pageSnippets = nextPage(lastSnippet.id);
    lastSnippet = pageSnippets[pageSnippets.length - 1];
    
    pageContent1 = pageSnippets.map(s =>
      < Text style={styleMap[s.type]} key={s.id}>{s.content}</Text>
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
    <View style={styles.container}>
      {pageContent}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
      </View>
      <Button title='Previous' onPress={prevPageClick} />
      <Button title='Next' onPress={nextPageClick} />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  para: {
    fontSize: 20,
    fontWeight: 'normal',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

const styleMap: any = {
  P: styles.para,
  HE: styles.heading
};