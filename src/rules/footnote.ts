import { HtmlOutputRule, ParserRule } from '@khanacademy/simple-markdown';
import createHtmlTag from '../createHtmlTag';

export default {
    order: 0,
    match: (source, state) => {
        if (state.prevCapture === null || state.prevCapture.at(-1) === '\n') {
            return /^-# +([^\n]+?)(\n|$)/.exec(source);
        }
        return null;
    },
    parse: (capture, parse, state) => ({
        content: parse(capture[1].trim(), state),
    }),
    html: (node, output, state) =>
        createHtmlTag('small', output(node.content, state), null, true, state),
} as ParserRule & HtmlOutputRule;
