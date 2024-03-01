import { DiscordCallbacks } from './DiscordCallbacks';

export type HtmlOptions = {
    embed?: boolean;
    escapeHTML?: boolean;
    discordOnly?: boolean;
    discordCallback?: DiscordCallbacks;
    cssModuleNames?: Record<string, string>;
};
