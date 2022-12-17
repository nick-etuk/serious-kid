import { Image, Text } from 'react-native';
import TextLink from 'react-native-text-link';
import { Snippet } from '../services/data';
import { snippetLinks } from '../services/data/files/snippet-link-table';
import { fragments } from '../services/pagination/fragments';
import { renderFragments } from '../services/pagination/render-fragments';

function simpleSnippet(s: Snippet) {
    let result = <></>;
    switch (s.snippetType) {
        case 'HE':
            result = <Text key={s.snippetId} > {s.descr}[{s.snippetId}]</Text >;
            break;
        case 'I':
            result = <Image source={require('../assets/images/' + s.descr)} style={{ height: 200, width: 200 }} />
            break;
        default:
            result = <Text key={s.snippetId} > {s.descr}[{s.snippetId}]</Text >;
        }
    return result;
}

export function renderSnippet(s: Snippet) {
    if (s.snippetId.toString() in snippetLinks) {
        const f = fragments(s.descr, snippetLinks[s.snippetId]);
        //return renderFragments(f, s.snippetId);
        return renderFragments(s);
    }
    return simpleSnippet(s);
}
