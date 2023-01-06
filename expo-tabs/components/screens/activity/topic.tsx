import { AnswerButton } from 'components/button';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Answer, Question } from 'services/data';
import { buttonStyles, textStyles } from 'styles';
import { log, recordAction } from 'utils';
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { stepNumIncrement } from 'store/step-num-slice';
import { incrementScore, decrementScore } from 'store/score-slice';
import { incrementQuestionIndex, decrementQuestionIndex, resetQuestionIndex } from 'store/question-index-slice';
import { GameProps } from 'components/screens/game-factory/game.interface';
import { renderSnippet } from 'services/pagination/render-snippet';
import { TutorProps } from './activity.interface';

export function Topic({ pageContent, dictionary }: TutorProps) {
    const logLevel = 1;
    log(logLevel, 'pageContent', pageContent, true);

    return (
        <>
            <Text style={textStyles.heading1}>{pageContent[0].descr}</Text>
            { pageContent.length > 1 ? <Text style={textStyles.normal}>{pageContent[1].descr}</Text> : null}
        </>
    )
}
