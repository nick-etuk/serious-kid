import { Image, Text, View } from 'react-native';
import TextLink from 'react-native-text-link';
import { Snippet } from '../services/data';
import { snippetLinkTable } from '../services/data/files/snippet-link-table';
import { fragments } from '../services/pagination/fragments';
import { renderFragments } from '../services/pagination/render-fragments';
import { CachedImage } from '../store/cached-image';
import { styles } from '../styles';
import { API_URL } from '../utils/constants';

function simpleSnippet(s: Snippet) {
    let result = <></>;
    switch (s.snippetType) {
        case 'HE':
            result = <Text key={s.snippetId} style={styles.heading}>{s.descr}<Text style={styles.snippetNum}>{s.snippetId}</Text></Text >;
            break;
        case 'I':
            const url = "https://cdn.britannica.com/34/231234-050-5B2280BB/volcanic-eruption-Antigua-Guatemala-volcano.jpg"
            const url2 = `${API_URL}/images/${s.descr}`;
            result =
                <View key={s.snippetId} style={styles.image}>
                    <CachedImage key={s.snippetId} url={url} filename={s.descr} />
                    <Text key={`${s.snippetId}-legend`}>{s.descr}<Text style={styles.snippetNum}>{s.snippetId}</Text></Text >
                </View>
            
            //result = <Text key={s.snippetId}>{s.descr}<Text style={styles.snippetNum}>{s.snippetId}</Text></Text >;
            break;
        default:
            result = <Text key={s.snippetId} style={styles.para}>{s.descr}<Text style={styles.snippetNum}>{s.snippetId}</Text></Text >;
        }
    return result;
}

export function renderSnippet(s: Snippet) {
    if (s.snippetId.toString() in snippetLinkTable) {
        const f = fragments(s.descr, snippetLinkTable[s.snippetId]);
        //return renderFragments(f, s.snippetId);
        return renderFragments(s);
    }
    return simpleSnippet(s);
}
