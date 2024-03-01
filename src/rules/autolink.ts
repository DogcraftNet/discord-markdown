import markdown, { HtmlOutputRule } from '@khanacademy/simple-markdown';
import createHtmlTag from '../createHtmlTag';

export default {
    ...markdown.defaultRules.autolink,
    parse: capture => ({
        content: [
            {
                type: 'text',
                content: capture[1],
            },
        ],
        target: capture[1],
    }),
    html: (node, output, state) =>
        createHtmlTag(
            'a',
            output(node.content, state),
            { href: markdown.sanitizeUrl(node.target) },
            true,
            state,
        ),
} as typeof markdown.defaultRules.autolink & HtmlOutputRule;
