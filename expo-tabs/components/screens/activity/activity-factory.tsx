import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Answer, Question, Snippet } from "services/data";
import { Dictionary } from "services/dictionary";
import { log } from 'utils';
import { ACTIVITY } from "utils/constants";
import { MultipleChoice } from "../game-factory/multiple-choice";
import { TextInputQuestion } from "../game-factory/text-input-question";
import { Topic } from "./topic";
import { Tutor } from "./tutor";

export function activityFactory(activity: string, pageContent:Snippet[], dictionary:Dictionary[], question: Question, answers: Answer[], questionIndex: number, questionCount: number, stageEnd:number, navigation:any){
    const logLevel = 0;
    log(logLevel, '=>activityFactory', '', true);
    log(logLevel, 'activity', activity, true);
    log(logLevel, 'pageContent', pageContent, true);
    let result = <></>;
    switch (activity) {
        case ACTIVITY.multi:
            result = <MultipleChoice question={question} answers={answers} questionIndex={questionIndex} questionCount={questionCount} stageEnd={stageEnd} navigation={navigation} pageContent={[]}/>;
            break;
        case ACTIVITY.input:
            result = <TextInputQuestion question={question} answers={answers} questionIndex={questionIndex} questionCount={questionCount} stageEnd={stageEnd} navigation={navigation} pageContent={[]} />
            break;
        case ACTIVITY.tutor:
            result = pageContent[0].snippetType==='T' ?
            <Topic pageContent={pageContent} dictionary={dictionary} />
            :
            <Tutor pageContent={pageContent} dictionary={dictionary} />
            break;
        default:
            result = <Text>Unknown activity: {activity}</Text>
        }
    log(logLevel, '<=activityFactory', '', true);
    return result;
}