export type DiscordCallbacks = {
    user?: (node: { id: string }) => string;
    channel?: (node: { id: string }) => string;
    role?: (node: { id: string }) => string;
    everyone?: () => string;
    here?: () => string;
    slash?: (node: { name: string }) => string;
    timestamp?: (node: { timestamp: number; style: string }) => string;
};
