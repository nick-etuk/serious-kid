import { Text, } from 'react-native';
import { Fragment } from './fragments';
import { textStyles } from 'styles';
import  TextLink  from  'react-native-text-link';
import { Snippet } from 'services/data';
import { snippetLinkTable } from 'services/data';
import { meaning } from 'services/dictionary';

function zrenderFragments(fragments: Fragment[], snippetId: number) {
    let result:JSX.Element[] = [];
    //result.push(<Text onPress={lookupWord(f.descr)} key={snippetId+'-'+f.seq}>{f.descr}</Text >);
    for (const f of fragments) {
        const style = f.type == 'L' ? textStyles.link : textStyles.normal;
        result.push(<Text style={style} key={snippetId + '-' + f.seq}>{f.descr}</Text >);
    }
    result.push(<Text style={textStyles.normal} key={snippetId}>&nbsp;&nbsp;&nbsp;[{snippetId}]</Text >);
    return result;
}

function subFunction(fragments: Fragment[], snippetId:number) {
    let result = '';
    for (const f of fragments) {
        result += 
            f.type == 'P' ? f.descr : `<Text key=${snippetId + '-' + f.seq}>${f.descr}</Text>`
    }
    return result;
}

function z2renderFragments(fragments: Fragment[], snippetId: number) {
    return (
        <Text style={textStyles.normal} key={snippetId}>
            {subFunction(fragments, snippetId)}
            [{snippetId}]
        </Text >
    )
    //result.push(<Text onPress={lookupWord(f.descr)} key={snippetId+'-'+f.seq}>{f.descr}</Text >);
}
function z3renderFragments(fragments: Fragment[], snippetId: number) { 
    const CustomTag = `<Text style=${textStyles.normal} key=${snippetId}>
    ${subFunction(fragments, snippetId)}
    [${snippetId}]
</Text >`;
    return <CustomTag/>;
}

interface LinkType {
    text: string;
    onPress: ()=> void;
}

export function renderFragments(s: Snippet) {
    const links: LinkType[] = [];
    for (const word of snippetLinkTable[s.snippetId]) {
        links.push({
            text: word,
            onPress: ()=>alert(meaning(word))
        })
    }
    return (<TextLink key={s.snippetId} links={links} textStyle={textStyles.normal} textLinkStyle={textStyles.normal}>{s.descr + '   [' + s.snippetId + ']'}</TextLink>);
}
