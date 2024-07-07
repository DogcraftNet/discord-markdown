import markdown from '@khanacademy/simple-markdown';

// The list rule is based on the default from @khanacademy/simple-markdown/src/index.ts
// but limited to only support `*`, `-` and ordered (e.g. `1.`) lists in tight format

// recognize a `*` `-`, `1.`, `2.`... list bullet
const LIST_BULLET = '(?:[*-]|\\d+\\.)';
// recognize the start of a list item:
// leading space plus a bullet plus a space (`   * `)
const LIST_ITEM_PREFIX = '( *)(' + LIST_BULLET + ') +';
const LIST_ITEM_PREFIX_R = new RegExp('^' + LIST_ITEM_PREFIX);
const LIST_ITEM_R = new RegExp(
    LIST_ITEM_PREFIX +
        '[^\\n]*(?:\\n' +
        '(?!\\1' +
        LIST_BULLET +
        ' )[^\\n]*)*(\\n|$)',
    'gm',
);
const LIST_ITEM_END_R = / *\n+$/;
// check whether a list item has paragraphs: if it does,
// we leave the newlines at the end
const LIST_R = new RegExp(
    '^( *)(' +
        LIST_BULLET +
        ') ' +
        '[\\s\\S]+?(?:(\\n)(?! )' +
        '(?!\\1' +
        LIST_BULLET +
        ' )\\n*' +
        // the \\s*$ here is so that we can parse the inside of nested
        // lists, where our content might end before we receive `\n`
        '|\\s*\\n*$)',
);
const LIST_LOOKBEHIND_R = /(?:^|\n)( *)$/;

export default {
    ...markdown.defaultRules.list,
    match: function (source, state) {
        // We only want to break into a list if we are at the start of a
        // line. This is to avoid parsing "hi * there" with "* there"
        // becoming a part of a list.
        // You might wonder, "but that's inline, so of course it wouldn't
        // start a list?". You would be correct! Except that some of our
        // lists can be inline, because they might be inside another list,
        // in which case we can parse with inline scope, but need to allow
        // nested lists inside this inline scope.
        const prevCaptureStr =
            state.prevCapture == null ? '' : state.prevCapture[0];
        const isStartOfLineCapture = LIST_LOOKBEHIND_R.exec(prevCaptureStr);

        if (isStartOfLineCapture) {
            source = isStartOfLineCapture[1] + source;
            return LIST_R.exec(source);
        } else {
            return null;
        }
    },
    parse: function (capture, parse, state) {
        const bullet = capture[2];
        const ordered = bullet.length > 1;
        const start = ordered ? +bullet : undefined;
        const items = capture[0].match(LIST_ITEM_R);

        // We know this will match here, because of how the regexes are
        // defined

        const itemContent = items!.map(item => {
            // We need to see how far indented this item is:
            const prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
            const space = prefixCapture ? prefixCapture[0].length : 0;
            // And then we construct a regex to "unindent" the subsequent
            // lines of the items by that amount:
            const spaceRegex = new RegExp('^ {1,' + space + '}', 'gm');

            const content = item
                // remove indents on trailing lines:
                .replace(spaceRegex, '')
                // remove the bullet:
                .replace(LIST_ITEM_PREFIX_R, '')
                .replace(LIST_ITEM_END_R, '');

            return parse(content, state);
        });

        return {
            ordered: ordered,
            start: start,
            items: itemContent,
        };
    },
} as typeof markdown.defaultRules.list;
