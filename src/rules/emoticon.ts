import markdown, {
    HtmlOutputRule,
    ParserRule,
} from '@khanacademy/simple-markdown';

export default {
    order: markdown.defaultRules.text.order,
    match: source => /^(¯\\_\(ツ\)_\/¯)/.exec(source),
    parse: capture => ({
        type: 'text',
        content: capture[1],
    }),
    html: (node, output, state) => output(node.content, state),
} as ParserRule & HtmlOutputRule;
