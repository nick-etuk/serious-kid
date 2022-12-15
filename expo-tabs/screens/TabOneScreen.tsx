import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

//import { getCurrentSnippet } from '../services/data/student/progress';



export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
        <Text>Steps page</Text>
      </View>
      <Button title='Previous' onPress={()=>alert('Previous')} />
      <Button title='Next' onPress={()=>alert('Next')} />
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