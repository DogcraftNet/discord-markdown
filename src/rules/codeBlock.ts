import markdown from '@khanacademy/simple-markdown';
import highlight from 'highlight.js';
import createHtmlTag from '../createHtmlTag';

export default {
    ...markdown.defaultRules.codeBlock,
    match: markdown.inlineRegex(/^```(([a-z0-9-]+?)\n+)?\n*([^]+?)\n*```/i),
    parse: (capture, parse, state) => ({
        lang: (capture[2] || '').trim(),
        content: capture[3] || '',
        inQuote: state.inQuote || false,
    }),
    html: (node, output, state) => {
        let code;
        if (node.lang && highlight.getLanguage(node.lang))
            code = highlight.highlight(node.content, {
                language: node.lang,
                ignoreIllegals: true,
            }); // Discord seems to set ignoreIllegals: true

        if (code && state.cssModuleNames)
            // Replace classes in hljs output
            code.value = code.value.replace(
                /<span class="([a-z0-9-_ ]+)">/gi,
                (str, m) =>
                    str.replace(
                        m,
                        m
                            .split(' ')
                            .map((cl: string) => state.cssModuleNames[cl] || cl)
                            .join(' '),
                    ),
            );

        return createHtmlTag(
            'pre',
            createHtmlTag(
                'code',
                code ? code.value : markdown.sanitizeText(node.content),
                { class: `hljs${code ? ' ' + code.language : ''}` },
                true,
                state,
            ),
            null,
            true,
            state,
        );
    },
} as typeof markdown.defaultRules.codeBlock;
