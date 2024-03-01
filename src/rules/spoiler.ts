import { HtmlOutputRule, ParserRule } from '@khanacademy/simple-markdown';
import createHtmlTag from '../createHtmlTag';

export default {
    order: 0,
    match: source => /^\|\|([\s\S]+?)\|\|/.exec(source),
    parse: (capture, parse, state) => ({
        content: parse(capture[1], state),
    }),
    html: (node, output, state) =>
        createHtmlTag(
            'span',
            output(node.content, state),
            { class: 'd-spoiler' },
            true,
            state,
        ),
} as ParserRule & HtmlOutputRule;
