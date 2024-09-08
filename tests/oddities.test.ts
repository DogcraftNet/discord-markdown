import { expect, test } from 'vitest';
import { toHTML } from '../src/main';

test('Unmatched mark', () => {
    expect(toHTML('`Inline `code` with extra marker')).toBe(
        '<code>Inline</code>code` with extra marker',
    );
});

test('* next to space', () => {
    expect(toHTML('*Hello World! *')).toBe('*Hello World! *');
});

test('Triple *s', () => {
    expect(toHTML('***underlined bold***')).toBe(
        '<em><strong>underlined bold</strong></em>',
    );
});

test('Inline code with ` inside', () => {
    expect(toHTML('``function test() { return "`" }``')).toBe(
        '<code>function test() { return &quot;`&quot; }</code>',
    );
});

test("Code blocks aren't parsed", () => {
    expect(toHTML('some\n    text')).toBe('some<br>    text');
});

test('multiple new lines', () => {
    expect(toHTML('some\n\ntext')).toBe('some<br><br>text');
});

test('no underscore italic in one word', () => {
    expect(toHTML('test_ing_stuff')).toBe('test_ing_stuff');
});

test('Codeblocks should work with ini', () => {
    expect(toHTML('```ini\n[01] asdasd\n```')).toContain('hljs ini');
});

test('Codeblocks should work with css modules', () => {
    expect(
        toHTML('```ini\n;asdasada\n[01] asdasd\n```', {
            cssModuleNames: {
                'hljs-section': 'testing',
            },
        }),
    ).toContain('<span class="testing">[01]</span>');
});

test('Spoiler edge-cases', () => {
    expect(toHTML('||||')).toBe('||||');
    expect(toHTML('|| ||')).toBe('<span class="d-spoiler"> </span>');
    expect(toHTML('||||||')).toBe('<span class="d-spoiler">|</span>|');
});

test('Nested <em>', () => {
    expect(toHTML('_hello world *foo bar* hello world_')).toBe(
        '<em>hello world foo bar hello world</em>',
    );
    expect(toHTML('_hello world *foo __blah__ bar* hello world_')).toBe(
        '<em>hello world foo <u>blah</u> bar hello world</em>',
    );
    expect(toHTML('_hello *world*_ not em *foo*')).toBe(
        '<em>hello world</em> not em <em>foo</em>',
    );
});
