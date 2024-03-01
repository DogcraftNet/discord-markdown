import markdown from '@khanacademy/simple-markdown';

export default {
    ...markdown.defaultRules.br,
    match: markdown.anyScopeRegex(/^\n/),
} as typeof markdown.defaultRules.br;
