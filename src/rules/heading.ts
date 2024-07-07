import markdown from '@khanacademy/simple-markdown';

export default {
    ...markdown.defaultRules.heading,
    match: (source, state) => {
        if (state.prevCapture === null || state.prevCapture.at(-1) === '\n') {
            return /^(#{1,3}) +([^\n]+?)(\n|$)/.exec(source);
        }
        return null;
    },
} as typeof markdown.defaultRules.heading;
