import markdown from '@khanacademy/simple-markdown';

export default {
    ...markdown.defaultRules.blockQuote,
    match: (source, state, prevSource) =>
        !/^$|\n *$/.test(prevSource) || state.inQuote
            ? null
            : /^( *>>> ([\s\S]*))|^( *> [^\n]*(\n *> [^\n]*)*\n?)/.exec(source),
    parse: (capture, parse, state) => {
        const all = capture[0];
        const isBlock = Boolean(/^ *>>> ?/.exec(all));
        const removeSyntaxRegex = isBlock ? /^ *>>> ?/ : /^ *> ?/gm;
        const content = all.replace(removeSyntaxRegex, '');

        return {
            content: parse(
                content,
                Object.assign({}, state, { inQuote: true }),
            ),
            type: 'blockQuote',
        };
    },
} as typeof markdown.defaultRules.blockQuote;
