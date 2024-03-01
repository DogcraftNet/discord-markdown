import markdown, {
    HtmlOutputRule,
    ParserRule,
} from '@khanacademy/simple-markdown';
import createHtmlTag from '../../createHtmlTag';

export default {
    order: markdown.defaultRules.strong.order,
    match: source => /^<\/([\w-]{1,32}):([\d]{16,22})>/.exec(source),
    parse: capture => ({
        name: capture[1],
        id: capture[2],
    }),
    html: (node, output, state) =>
        createHtmlTag(
            'span',
            state.discordCallback.slash(node),
            { class: 'd-mention d-slash' },
            true,
            state,
        ),
} as ParserRule & HtmlOutputRule;
