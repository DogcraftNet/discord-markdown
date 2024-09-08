import { expect, test } from 'vitest';
import { toHTML } from '../src/main';

test('user parsing', () => {
    expect(toHTML('hey <@1234>!')).toBe(
        'hey <span class="d-mention d-user">@1234</span>!',
    );
});

test('custom user parsing', () => {
    expect(
        toHTML('hey <@1234>!', {
            discordCallback: {
                user: node => {
                    return '++@' + node.id + '++';
                },
            },
        }),
    ).toBe('hey <span class="d-mention d-user">++@1234++</span>!');
});

test('channel parsing', () => {
    expect(toHTML('goto <#1234>, please')).toBe(
        'goto <span class="d-mention d-channel">#1234</span>, please',
    );
});

test('custom channel parsing', () => {
    expect(
        toHTML('goto <#1234>, please', {
            discordCallback: {
                channel: node => {
                    return '++#' + node.id + '++';
                },
            },
        }),
    ).toBe('goto <span class="d-mention d-channel">++#1234++</span>, please');
});

test('role parsing', () => {
    expect(toHTML('is any of <@&1234> here?')).toBe(
        'is any of <span class="d-mention d-role">&1234</span> here?',
    );
});

test('custom role parsing', () => {
    expect(
        toHTML('is any of <@&1234> here?', {
            discordCallback: {
                role: node => {
                    return '++&' + node.id + '++';
                },
            },
        }),
    ).toBe('is any of <span class="d-mention d-role">++&1234++</span> here?');
});

test('emoji parsing', () => {
    expect(toHTML('heh <:blah:1234>')).toBe(
        'heh <img class="d-emoji" src="https://cdn.discordapp.com/emojis/1234.png" alt=":blah:">',
    );
});

test('everyone mentioning', () => {
    expect(
        toHTML('Hey @everyone!', {
            discordCallback: {
                everyone: () => {
                    return '++everyone++';
                },
            },
        }),
    ).toBe('Hey <span class="d-mention d-user">++everyone++</span>!');
});

test('here mentioning', () => {
    expect(
        toHTML('Hey @here!', {
            discordCallback: {
                here: () => {
                    return '++here++';
                },
            },
        }),
    ).toBe('Hey <span class="d-mention d-user">++here++</span>!');
});

test("don't parse stuff in code blocks", () => {
    expect(toHTML('`<@1234>`')).toBe('<code>&lt;@1234&gt;</code>');
});

test('animated emojis work', () => {
    expect(toHTML('heh <a:blah:1234>')).toBe(
        'heh <img class="d-emoji d-emoji-animated" src="https://cdn.discordapp.com/emojis/1234.gif" alt=":blah:">',
    );
});

test("with discord-only don't parse normal stuff", () => {
    expect(toHTML('*yay* <@123456>', { discordOnly: true })).toBe(
        '*yay* <span class="d-mention d-user">@123456</span>',
    );
});

test('spoilers are handled correctly', () => {
    expect(toHTML('||spoiler||')).toBe(
        '<span class="d-spoiler">spoiler</span>',
    );
    expect(toHTML('|| spoiler ||')).toBe(
        '<span class="d-spoiler"> spoiler </span>',
    );
    expect(toHTML('|| spoiler | message ||')).toBe(
        '<span class="d-spoiler"> spoiler | message </span>',
    );
    expect(toHTML('a ||spoiler|| may have ||multiple\nlines||')).toBe(
        'a <span class="d-spoiler">spoiler</span> may have <span class="d-spoiler">multiple<br>lines</span>',
    );
    expect(toHTML('||strange||markdown||')).toBe(
        '<span class="d-spoiler">strange</span>markdown||',
    );
    expect(toHTML('||<i>italics</i>||')).toBe(
        '<span class="d-spoiler">&lt;i&gt;italics&lt;/i&gt;</span>',
    );
    expect(toHTML('||```\ncode\nblock\n```||')).toBe(
        '<span class="d-spoiler"><pre><code class="hljs">code\nblock</code></pre></span>',
    );
});

test('slash command parsing', () => {
    expect(toHTML('</command:1234567890123456>')).toBe(
        '<span class="d-slash">/command</span>',
    );
});

test.each([
    [':t', '22:40'],
    [':T', '22:40:18'],
    [':d', '01/03/2024'],
    [':D', '1 Mar 2024'],
    [':F', 'Friday 1 March 2024 at 22:40'],
    [':R', '1 March 2024 at 22:40'],
    [':f', '1 March 2024 at 22:40'],
    ['', '1 March 2024 at 22:40'],
])('timestamp parsing with "%s"', (format, expected) => {
    expect(toHTML(`<t:1709332818${format}>`)).toBe(
        `<span class="d-timestamp">${expected}</span>`,
    );
});
