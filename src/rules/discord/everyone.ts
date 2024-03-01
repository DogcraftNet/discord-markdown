import markdown, {
    HtmlOutputRule,
    ParserRule,
} from '@khanacademy/simple-markdown';
import createHtmlTag from '../../createHtmlTag';

export default {
    order: markdown.defaultRules.strong.order,
    match: source => /^@everyone/.exec(source),
    parse: () => ({}),
    html: (node, output, state) =>
        createHtmlTag(
            'span',
            state.discordCallback.everyone(node),
            { class: 'd-mention d-user' },
            true,
            state,
        ),
} as ParserRule & HtmlOutputRule;
