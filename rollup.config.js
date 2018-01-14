/**
 * Rollup config.
 * @author TheoryOfNekomata
 * @date 2018-01-14
 */

import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'

export default [
    {
        input: 'src/docs/index.js',
        output: {
            file: 'docs/index.js',
            format: 'iife',
            name: 'index',
        },
        plugins: [
            scss({
                output: 'docs/index.css',
                processor: css => postcss([autoprefixer])
                    .process(css)
                    .then(result => result.css),
            })
        ]
    },
    {
        input: 'src/lib/index.js',
        output: {
            file: 'dist/textmoji.js',
            format: 'umd',
            name: 'textmoji',
        }
    },
]
