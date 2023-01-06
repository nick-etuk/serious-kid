import { log } from 'utils';
import { renderSnippet } from 'services/pagination/render-snippet';
import { TutorProps } from './activity.interface';

export function Tutor({ pageContent, dictionary }: TutorProps) {
    const logLevel = 1;
    log(logLevel, '=>Tutor', '', true);
    log(logLevel, 'pageContent', pageContent, true);
    log(logLevel, 'step dictionary', dictionary, true);
    log(1, '<=Tutor', '', true);
    return (
        <>
            { pageContent.map(s => renderSnippet(s, dictionary)) }
        </>
    )
}
