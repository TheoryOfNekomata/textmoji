/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2018-01-14
 */

export default [
    {
        input: 'src/docs/TextmojiGenerator.js',
        output: {
            file: 'docs/TextmojiGenerator.js',
            format: 'iife',
            name: 'TextmojiGenerator',
        },
    },
    {
        input: 'src/lib/index.js',
        output: {
            file: 'dist/textmoji.js',
            format: 'umd',
            name: 'textmoji',
        }
    },
    {
        input: 'src/lib/index.js',
        output: {
            file: 'docs/textmoji.js',
            format: 'umd',
            name: 'textmoji',
        }
    },
]
