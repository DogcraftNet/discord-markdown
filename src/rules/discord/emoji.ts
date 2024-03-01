import markdown, {
    HtmlOutputRule,
    ParserRule,
} from '@khanacademy/simple-markdown';
import createHtmlTag from '../../createHtmlTag';

export default {
    order: markdown.defaultRules.strong.order,
    match: source => /^<(a?):(\w+):(\d+)>/.exec(source),
    parse: capture => ({
        animated: capture[1] === 'a',
        name: capture[2],
        id: capture[3],
    }),
    html: (node, output, state) =>
        createHtmlTag(
            'img',
            '',
            {
                class: `d-emoji${node.animated ? ' d-emoji-animated' : ''}`,
                src: `https://cdn.discordapp.com/emojis/${node.id}.${node.animated ? 'gif' : 'png'}`,
                alt: `:${node.name}:`,
            },
            false,
            state,
        ),
} as ParserRule & HtmlOutputRule;
