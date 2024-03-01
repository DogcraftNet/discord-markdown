import markdown from '@khanacademy/simple-markdown';
import createHtmlTag from '../createHtmlTag';

export default {
    ...markdown.defaultRules.inlineCode,
    match: source => markdown.defaultRules.inlineCode.match.regex!.exec(source),
    html: (node, output, state) =>
        createHtmlTag(
            'code',
            markdown.sanitizeText(node.content.trim()),
            null,
            true,
            state,
        ),
} as typeof markdown.defaultRules.inlineCode;
