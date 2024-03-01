import markdown from '@khanacademy/simple-markdown';

export default {
    ...markdown.defaultRules.list,
    match: (source, state, prevCapture) => {
        state._list = true;
        return markdown.defaultRules.list.match(source, state, prevCapture);
    },
} as typeof markdown.defaultRules.list;
