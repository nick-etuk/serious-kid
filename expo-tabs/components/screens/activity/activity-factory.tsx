import { Answer, Question, Snippet } from "services/data";
import { ACTIVITY } from "utils/constants";
import { MultipleChoice } from "../game-factory/multiple-choice";
import { TextInputQuestion } from "../game-factory/text-input-question";
import { Topic } from "./topic";
import { Tutor } from "./tutor";

export function activityFactory(activity: string, question: Question, answers: Answer[], questionIndex: number, questionCount: number, stageEnd:number, navigation:any, pageContent:Snippet[]){
    let result = <></>;
    switch (activity) {
        case ACTIVITY.multi:
            result = <MultipleChoice question={question} answers={answers} questionIndex={questionIndex} questionCount={questionCount} stageEnd={stageEnd} navigation={navigation} pageContent={[]}/>;
            break;
        case ACTIVITY.input:
            result = <TextInputQuestion question={question} answers={answers} questionIndex={questionIndex} questionCount={questionCount} stageEnd={stageEnd} navigation={navigation} pageContent={[]} />
            break;
        case ACTIVITY.tutor:
            if (pageContent[0].snippetType==='T') 
                <Topic question={question} answers={answers} questionIndex={questionIndex} questionCount={questionCount} stageEnd={stageEnd} navigation={navigation} pageContent={pageContent}/>
            else
                <Tutor question={question} answers={answers} questionIndex={questionIndex} questionCount={questionCount} stageEnd={stageEnd} navigation={navigation} pageContent={pageContent}/>
            break;
    }
    return result;
}