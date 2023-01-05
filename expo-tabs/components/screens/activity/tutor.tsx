import { log } from 'utils';
import { renderSnippet } from 'services/pagination/render-snippet';
import { TutorProps } from './activity.interface';

export function Tutor({ pageContent, dictionary }: TutorProps) {
    const logLevel = 1;
    log(logLevel, 'pageContent', pageContent, true);
    log(logLevel, 'step dictionary', dictionary, true);

    return (
        <>
            { pageContent.map(s => renderSnippet(s, dictionary)) }
        </>
    )
}
