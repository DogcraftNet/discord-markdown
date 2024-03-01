import markdown from '@khanacademy/simple-markdown';

export default {
    ...markdown.defaultRules.del,
    match: markdown.inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
} as typeof markdown.defaultRules.del;
