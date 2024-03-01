import markdown, {
    HtmlOutputRule,
    ParserRule,
} from '@khanacademy/simple-markdown';
import createHtmlTag from '../../createHtmlTag';

export default {
    order: markdown.defaultRules.strong.order,
    match: source => /^<@!?([0-9]*)>/.exec(source),
    parse: capture => ({
        id: capture[1],
    }),
    html: (node, output, state) =>
        createHtmlTag(
            'span',
            state.discordCallback.user(node),
            { class: 'd-mention d-user' },
            true,
            state,
        ),
} as ParserRule & HtmlOutputRule;
