import {
    rules,
    rulesDiscordOnly,
    rulesDiscordOnlyHtml,
    rulesHtml,
} from './rules';
import createHtmlTag from './createHtmlTag';
import { HtmlOptions } from './types/HtmlOptions';
import markdown, { Parser, Output } from '@khanacademy/simple-markdown';
import discordCallbackDefaults from './discordCallbackDefaults';

const parser = markdown.parserFor(rules);
const output = markdown.outputFor(rulesHtml, 'html');
const parserDiscord = markdown.parserFor(rulesDiscordOnly);
const outputDiscord = markdown.outputFor(rulesDiscordOnlyHtml, 'html');
const parserEmbed = markdown.parserFor(rules);
const outputEmbed = markdown.outputFor(rulesHtml, 'html');

const toHTML = (
    source: string,
    options?: HtmlOptions,
    customParser?: Parser,
    customOutput?: Output<any>,
): string => {
    if ((customParser || customOutput) && (!customParser || !customOutput))
        throw new Error(
            'You must pass both a custom parser and custom htmlOutput function, not just one',
        );

    options = Object.assign(
        {
            embed: false,
            escapeHTML: true,
            discordOnly: false,
            discordCallback: {},
        },
        options ?? {},
    );

    let markdownParser = parser;
    let markdownOutput = output;

    if (customParser && customOutput) {
        markdownParser = customParser;
        markdownOutput = customOutput;
    } else if (options.discordOnly) {
        markdownParser = parserDiscord;
        markdownOutput = outputDiscord;
    } else if (options.embed) {
        markdownParser = parserEmbed;
        markdownOutput = outputEmbed;
    }

    const state = {
        inline: true,
        inQuote: false,
        inEmphasis: false,
        escapeHTML: options.escapeHTML,
        cssModuleNames: options.cssModuleNames || null,
        discordCallback: Object.assign(
            {},
            discordCallbackDefaults,
            options.discordCallback,
        ),
    };

    return markdownOutput(markdownParser(source, state), state);
};

export default {
    parser: (source: string) => parser(source, { inline: true }),
    output,
    htmlOutput: output, // Keep for backwards compatibility
    toHTML,
    rules,
    rulesDiscordOnly,
    rulesEmbed: rules,
    markdownEngine: markdown,
    createHtmlTag,
    htmlTag: createHtmlTag, // Keep for backwards compatibility
};
