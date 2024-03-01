import markdown from '@khanacademy/simple-markdown';

export default {
    ...markdown.defaultRules.em,
    parse: (capture, parse, state) => {
        const parsed = markdown.defaultRules.em.parse(
            capture,
            parse,
            Object.assign({}, state, { inEmphasis: true }),
        );
        return state.inEmphasis ? parsed.content : parsed;
    },
} as typeof markdown.defaultRules.em;
