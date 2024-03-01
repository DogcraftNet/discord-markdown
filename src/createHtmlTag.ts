import { AttributeValue } from './types/AttributeValue';
import markdown, { State } from '@khanacademy/simple-markdown';

export default (
    tagName: string,
    content: string,
    attributes?: Partial<Record<any, AttributeValue>> | null | undefined,
    isClosed: boolean = true,
    state: State = {},
): string => {
    if (typeof attributes?.class === 'string' && state.cssModuleNames)
        attributes.class = attributes.class
            .split(' ')
            .map(cl => state.cssModuleNames![cl] ?? cl)
            .join(' ');

    return markdown.htmlTag(tagName, content, attributes, isClosed);
};
