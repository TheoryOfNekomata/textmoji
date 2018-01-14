(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.textmoji = factory());
}(this, (function () { 'use strict';

/**
 * The generator source file.
 * @author TheoryOfNekomata
 * @date 2018-01-14
 */

/**
 * Renders an individual glyph.
 * @param {String} c The character to render.
 * @param {Object} fontData The font data containing all glyph data.
 * @param {String} black The "positive" character, that is, the character for filled-up spaces.
 * @param {String} white The "negative" character, that is, the character for empty spaces.
 * @returns {Number[][]} The intermediate rendered glyph.
 */
function renderGlyph(c, fontData, { black, white }) {
    let glyphData = fontData.glyphs[c.charCodeAt(0)];
    let [, width, data] = glyphData;
    return data.map(chunk => {
        let rendered = chunk
            .toString(2);

        while (rendered.length < width) {
            rendered = `0${ rendered }`;
        }

        return rendered
            .replace(/0/g, white)
            .replace(/1/g, black)
    })
}

/**
 * Renders a single line of text.
 * @param {String} line The line of text to render.
 * @param {Object} fontData The font data containing all glyph data.
 * @param {String} black The "positive" character, that is, the character for filled-up spaces.
 * @param {String} white The "negative" character, that is, the character for empty spaces.
 * @returns {String} The rendered line of text.
 */
function renderLine(line, fontData, { black, white }) {
    let cs = line.split('');
    let renderedGlyphs = cs.map(c => renderGlyph(c, fontData, { black, white }));
    let rendered = [];

    for (let i = 0; i < fontData.height; i += 1) {
        rendered.push(
            renderedGlyphs
                .reduce(
                    (chunk, glyph) => chunk.length < 1 ?
                        glyph[i] :
                        `${ chunk }${ white }${ glyph[i] }`,
                    ''
                )
        );
    }

    rendered = rendered.join('\n');

    if (rendered.trim().length < 1) {
        return ''
    }

    return rendered
}

/**
 * Renders a string.
 * @param {String} str The string to render.
 * @param {Object} fontData The font data containing all glyph data.
 * @param {String} black The "positive" character, that is, the character for filled-up spaces.
 * @param {String} white The "negative" character, that is, the character for empty spaces.
 * @returns {String} The corresponding rendered string.
 */
function renderText(str, fontData, { black, white }) {
    let whiteChar = white;
    let blackChar = black;
    let rendered;

    if (whiteChar.length < 1) {
        if (blackChar.length < 1) {
            blackChar = '@';
        }
        whiteChar = blackChar.split('').map(() => ' ').join('');
    }

    rendered = str
        .split('\n')
        .map(line => renderLine(line, fontData, { black: blackChar, white: whiteChar }));

    return rendered.join('\n\n')
}

return renderText;

})));
