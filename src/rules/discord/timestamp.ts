import markdown, {
    HtmlOutputRule,
    ParserRule,
} from '@khanacademy/simple-markdown';
import createHtmlTag from '../../createHtmlTag';

export default {
    order: markdown.defaultRules.strong.order,
    match: source => /^<t:(\d+)(?::(R|t|T|d|D|f|F))?>/.exec(source),
    parse: capture => ({
        timestamp: capture[1],
        style: capture[2],
    }),
    html: (node, output, state) =>
        createHtmlTag(
            'span',
            state.discordCallback.timestamp(node),
            { class: 'd-timestamp' },
            true,
            state,
        ),
} as ParserRule & HtmlOutputRule;
