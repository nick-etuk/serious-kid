import { View, Text } from 'react-native';
import { textStyles } from 'styles';
import { log } from 'utils';
import { incrementScore } from 'store/score-slice';
import { useAppDispatch, useAppSelector } from 'store/hooks'

interface GameHeaderProps {
    game: string;
    stepNum: number;
    questionIndex: number;
    questionCount: number;
}

export function GameHeader({ game, stepNum, questionIndex, questionCount }: GameHeaderProps) {
    const log_level = 1;
    let score = useAppSelector(state => state.score.value);

    log(log_level, 'game', game, true);
    log(log_level, 'stepNum', stepNum, true);
    log(log_level, 'questionIndex', questionIndex, true);
    log(log_level, 'score', score, true);
    log(log_level, 'questionCount', questionCount, true);

    return (
        <>
            <View style={{ flexDirection:'row' }} >
                <Text style={{width:100}}>Game: {game}</Text>
                <Text style={{width:100}}>Step: {stepNum}</Text>
                <Text style={{marginLeft:50}}>Question: {questionIndex}</Text>
                <Text style={{ marginLeft: 50 }}>Score: {score}/{questionCount}</Text>
            </View>
            <Text/>
            <Text style={textStyles.heading2}>Questions</Text>
        </>
    )
}