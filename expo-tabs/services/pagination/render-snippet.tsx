import { Image, Text, View } from 'react-native';
import TextLink from 'react-native-text-link';
import { Snippet } from 'services/data';
import { snippetLinkTable } from 'services/data/files/snippet-link-table';
import { Dictionary } from 'services/dictionary';
import { splitWords } from 'services/journey';
import { fragments } from 'services/pagination/fragments';
import { renderFragments } from 'services/pagination/render-fragments';
import { CachedImage } from 'store/cached-image';
import { imageStyles, textStyles } from 'styles';
import { API_URL } from 'utils/constants';
import * as tts from 'expo-speech'

function simpleSnippet(s: Snippet) {
    let result = <></>;
    switch (s.snippetType) {
        case 'HE':
            result = <Text key={s.snippetId} style={textStyles.heading2}>{s.descr}<Text style={textStyles.snippetNum}>{s.snippetId}</Text></Text >;
            break;
        case 'I':
            const url = "https://cdn.britannica.com/34/231234-050-5B2280BB/volcanic-eruption-Antigua-Guatemala-volcano.jpg"
            const url2 = `${API_URL}/images/${s.descr}`;
            result =
                <View key={s.snippetId} style={imageStyles.normal}>
                    <CachedImage key={s.snippetId} url={url} filename={s.descr} />
                    <Text key={`${s.snippetId}-legend`}>{s.descr}<Text style={textStyles.snippetNum}>{s.snippetId}</Text></Text >
                </View>
            
            //result = <Text key={s.snippetId}>{s.descr}<Text style={styles.snippetNum}>{s.snippetId}</Text></Text >;
            break;
        default:
            result = <Text key={s.snippetId} style={textStyles.normal}>{s.descr}<Text style={textStyles.snippetNum}>{s.snippetId}</Text></Text >;
        }
    return result;
}

interface LinkType {
    text: string;
    onPress: ()=> void;
}

export function renderSnippet(snippet: Snippet, dictionary:Dictionary[]) {
    /*
    if (snippet.snippetId.toString() in snippetLinkTable) {
       const f = fragments(s.descr, snippetLinkTable[s.snippetId]);
        return renderFragments(f, s.snippetId);
    */
    //Tts.setDefaultLanguage('en-GB');
    //Tts.setDefaultVoice('com.apple.ttsbundle.Daniel-compact');

    const links: LinkType[] = [];

    const snippetWords = splitWords(snippet.descr);
    let found = false;
    for (const dict of dictionary)
        if (snippetWords.includes(dict.word)) {
            found = true;
            links.push({
                text: dict.word,
                onPress: () => tts.speak(`${dict.word} means ${dict.meaning}`)
            });
        }
    
    if (found)
        return (<TextLink key={snippet.snippetId} links={links} textStyle={textStyles.normal} textLinkStyle={textStyles.dictionary}>{snippet.descr + '   [' + snippet.snippetId + ']'}</TextLink>);
    else
        return simpleSnippet(snippet);
}
