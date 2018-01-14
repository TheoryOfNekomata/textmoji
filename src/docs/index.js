/**
 * The script for the generator file.
 * @author TheoryOfNekomata
 * @date 2018-01-14
 */

import './index.scss'

import TextmojiGenerator from './TextmojiGenerator'

new TextmojiGenerator({
    input: window.document.getElementById('txtInput'),
    output: window.document.getElementById('txtOutput'),
    black: window.document.getElementById('txtBlack'),
    white: window.document.getElementById('txtWhite'),
    font: window.document.getElementById('ddFont'),
    chars: window.document.getElementById('lblChars')
})
