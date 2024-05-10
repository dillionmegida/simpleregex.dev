# TODO

## Things to add to [regex-hook](./src/components/mdx/regex-hooks.ts)

- [ ] replace spaces with something like faded dot, so it's easy to identify spaces
- [ ] if a match contains a group and the match contains a new line, the group style does not apply; for example [no newline in match](https://simpleregex.dev/test?input=%22Something%20with%0Aa%20newline%22&pattern=%2Fthing%5Cs(with)%2F) (you see the group style), and then [a newline in match](https://simpleregex.dev/test?input=%22Something%20with%0Aa%20newline%22&pattern=%2Fthing%5Cs(with)%5Cn%2F) (the group has no style)
