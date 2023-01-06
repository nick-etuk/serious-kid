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
    const logLevel = 1;
    const score = useAppSelector(state => state.score.value);
    const health = useAppSelector(state => state.health.value);
    const lives = useAppSelector(state => state.lives.value);
    const stageNum = useAppSelector(state => state.stageNum.value);

    log(logLevel, 'game', game, true);
    log(logLevel, 'stage', stageNum, true);
    log(logLevel, 'stepNum', stepNum, true);
    log(logLevel, 'questionIndex', questionIndex, true);
    log(logLevel, 'score', score, true);
    log(logLevel, 'questionCount', questionCount, true);

    return (
        <>
            <View style={{ flexDirection:'row' }} >
                <Text style={{width:100}}>Game: {game}</Text>
                <Text style={{width:100}}>Stage: {stageNum}</Text>
                <Text style={{width:100}}>Step: {stepNum}</Text>
                <Text style={{marginLeft:50}}>Question: {questionIndex}</Text>
                <Text style={{ marginLeft: 50 }}>Score: {score}/{questionCount}</Text>
                <Text style={{ marginLeft: 50 }}>Lives: {lives}</Text>
                <Text style={{ marginLeft: 50 }}>Health: {health}</Text>
            </View>
            <Text />
            <View style={{ flexDirection:'row', justifyContent:'center' }} >
                <Text style={textStyles.heading2}>Questions</Text>
            </View>
        </>
    )
}