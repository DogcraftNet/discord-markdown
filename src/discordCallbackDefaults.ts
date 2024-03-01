import markdown from '@khanacademy/simple-markdown';
import { DiscordCallbacks } from './types/DiscordCallbacks';

export default {
    user: node => '@' + markdown.sanitizeText(node.id),
    channel: node => '#' + markdown.sanitizeText(node.id),
    role: node => '&' + markdown.sanitizeText(node.id),
    everyone: () => '@everyone',
    here: () => '@here',
    slash: node => '/' + markdown.sanitizeText(node.name),
    timestamp: node =>
        '<t:' +
        markdown.sanitizeText(node.timestamp) +
        (node.style ? ':' + node.style : '') +
        '>',
} as DiscordCallbacks;
