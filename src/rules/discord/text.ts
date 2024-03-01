import markdown from '@khanacademy/simple-markdown';

export default {
    ...markdown.defaultRules.text,
    match: source =>
        /^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff-]|\n\n|\n|\w+:\S|$)/.exec(
            source,
        ),
    html: (node, output, state) => {
        if (state.escapeHTML) return markdown.sanitizeText(node.content);

        return node.content;
    },
} as typeof markdown.defaultRules.text;
