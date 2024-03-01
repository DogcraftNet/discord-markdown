import markdown, { ParserRule } from '@khanacademy/simple-markdown';

export default {
    ...markdown.defaultRules.list,
    match: (source, state, prevCapture) => {
        state._list = true;
        return markdown.defaultRules.list.match(source, state, prevCapture);
    },
} as ParserRule;
