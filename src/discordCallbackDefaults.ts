import markdown from '@khanacademy/simple-markdown';
import { DiscordCallbacks } from './types/DiscordCallbacks';

export default {
    user: node => '@' + markdown.sanitizeText(node.id),
    channel: node => '#' + markdown.sanitizeText(node.id),
    role: node => '&' + markdown.sanitizeText(node.id),
    everyone: () => '@everyone',
    here: () => '@here',
    slash: node => '/' + markdown.sanitizeText(node.name),
    timestamp: node => {
        const date = new Date(node.timestamp * 1000);

        switch (node.style) {
            case 't':
                return date.toLocaleTimeString(undefined, {
                    timeStyle: 'short',
                });
            case 'T':
                return date.toLocaleTimeString(undefined, {
                    timeStyle: 'medium',
                });
            case 'd':
                return date.toLocaleDateString(undefined, {
                    dateStyle: 'short',
                });
            case 'D':
                return date.toLocaleDateString(undefined, {
                    dateStyle: 'medium',
                });
            case 'F':
                return date.toLocaleString(undefined, {
                    dateStyle: 'full',
                    timeStyle: 'short',
                });
            case 'R': // Not yet implemented relative time
            case 'f':
            default:
                return date.toLocaleString(undefined, {
                    dateStyle: 'long',
                    timeStyle: 'short',
                });
        }
    },
} as DiscordCallbacks;
