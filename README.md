# discord-markdown

A markdown parser for Discord messages.

This package is a fork of [discord-markdown by brussell98](https://github.com/brussell98/discord-markdown), rewritten in TypeScript and actively maintained.

## Using

```bash
npm install @odiffey/discord-markdown
yarn add @odiffey/discord-markdown
```

For browser use, import `@odiffey/discord-markdown/dist/discord-markdown.umd.js`

```js
import { parser, htmlOutput, toHTML } from '@odiffey/discord-markdown';

console.log(toHTML('This **is** a __test__'));
// => This <strong>is</strong> a <u>test</u>
```

Fenced codeblocks will include highlight.js tags and classes.

## Options

```js
import { toHTML } from '@odiffey/discord-markdown';
toHTML('This **is** a __test__', options);
```

`options` is an object with the following properties (all are optional):

* `embed`: Boolean (default: false), if it should parse embed contents (rules are slightly different)
* `escapeHTML`: Boolean (default: true), if it should escape HTML
* `discordOnly`: Boolean (default: false), if it should only parse the discord-specific stuff
* `discordCallback`: Object, callbacks used for discord parsing. Each receive an object with different properties, and are expected to return an HTML escaped string
  * `user`: (`id`: Number) User mentions "@someperson"
  * `channel`: (`id`: Number) Channel mentions "#somechannel"
  * `role`: (`id`: Number) Role mentions "@somerole"
  * `everyone`: () Everyone mention "@everyone"
  * `here`: () Here mention "@here"
  * `slash`: (`name`: String, `id`: Number) Slash command reference "</somecommand:someid>"
  * `timestamp`: (`timestamp`: Number, `style`: String|undefined) Relative timestamp reference "<t:sometimestamp:somestyle>"
* `cssModuleNames`: Object, maps CSS class names to CSS module class names

### Mention and Emoji Handling

Using the `discordCallback` option you can define custom functions to handle parsing mention and emoji content. You can use these to turn IDs into names.

Example:

```js
import { toHTML } from '@odiffey/discord-markdown';
toHTML('This is a mention for <@95286900801146880>', {
	discordCallback: {
		user: node => '@' + users[node.id];
	}
}); // -> This is a mention for @Brussell
```

## Customizing

It is possible to change the rules used by discord-markdown. Take a look at the code to see how to create your own modified rule set.

## Contributing

Find an inconsistency? File an issue or submit a pull request with the fix and updated test(s).
