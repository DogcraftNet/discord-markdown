import discordChannel from './rules/discord/channel';
import discordEmoji from './rules/discord/emoji';
import discordEveryone from './rules/discord/everyone';
import discordHere from './rules/discord/here';
import discordRole from './rules/discord/role';
import discordSlash from './rules/discord/slash';
import discordText from './rules/discord/text';
import discordTimestamp from './rules/discord/timestamp';
import discordUser from './rules/discord/user';
import autolink from './rules/autolink';
import blockQuote from './rules/blockQuote';
import br from './rules/br';
import codeBlock from './rules/codeBlock';
import em from './rules/em';
import emoticon from './rules/emoticon';
import heading from './rules/heading';
import inlineCode from './rules/inlineCode';
import list from './rules/list';
import spoiler from './rules/spoiler';
import strike from './rules/strike';
import url from './rules/url';
import markdown from '@khanacademy/simple-markdown';

export const rulesDiscordOnlyHtml = {
    discordChannel,
    discordEmoji,
    discordEveryone,
    discordHere,
    discordRole,
    discordSlash,
    discordTimestamp,
    discordUser,
    text: discordText,
};

export const rulesDiscordOnly = rulesDiscordOnlyHtml;

export const rulesHtml = {
    ...rulesDiscordOnlyHtml,
    autolink,
    blockQuote,
    br,
    codeBlock,
    em,
    emoticon,
    inlineCode,
    link: markdown.defaultRules.link,
    newline: markdown.defaultRules.newline,
    spoiler,
    strike,
    strong: markdown.defaultRules.strong,
    u: markdown.defaultRules.u,
    url,
};

export const rules = {
    ...rulesDiscordOnly,
    ...rulesHtml,
    escape: markdown.defaultRules.escape,
    heading,
    list,
};
