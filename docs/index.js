(function () {
'use strict';

/**
 * Default font.
 * @author TheoryOfNekomata
 * @date 2018-01-14
 */

var FONT_DEFAULT = {
    height: 8,
    glyphs: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        [0, 3, [0b000, 0b000, 0b000, 0b000, 0b000, 0b000, 0b000, 0b000]],
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        [0, 4, [0b0000, 0b0110, 0b1001, 0b1001, 0b1111, 0b1001, 0b0000, 0b0000]],
        [0, 4, [0b0000, 0b1110, 0b1001, 0b1110, 0b1001, 0b1110, 0b0000, 0b0000]],
        [0, 4, [0b0000, 0b0110, 0b1001, 0b1000, 0b1001, 0b0110, 0b0000, 0b0000]],
        [0, 4, [0b0000, 0b1110, 0b1001, 0b1001, 0b1001, 0b1110, 0b0000, 0b0000]],
        [0, 4, [0b0000, 0b1111, 0b1000, 0b1110, 0b1000, 0b1111, 0b0000, 0b0000]],
        [0, 4, [0b0000, 0b1111, 0b1000, 0b1110, 0b1000, 0b1000, 0b0000, 0b0000]],
        [0, 4, [0b0000, 0b0111, 0b1000, 0b1011, 0b1001, 0b0110, 0b0000, 0b0000]],
        [0, 4, [0b0000, 0b1001, 0b1001, 0b1111, 0b1001, 0b1001, 0b0000, 0b0000]],
        [0, 3, [0b000, 0b111, 0b010, 0b010, 0b010, 0b111, 0b000, 0b000]],
        [0, 4, [0b0000, 0b0001, 0b0001, 0b0001, 0b1001, 0b0110, 0b0000, 0b0000]],
        [0, 4, [0b0000, 0b1001, 0b1010, 0b1100, 0b1010, 0b1001, 0b0000, 0b0000]],
        [0, 4, [0b0000, 0b1000, 0b1000, 0b1000, 0b1000, 0b1111, 0b0000, 0b0000]],
        [0, 7, [0b0000000, 0b1000001, 0b1100011, 0b1010101, 0b1001001, 0b1000001, 0b0000000, 0b0000000]],
        [0, 5, [0b00000, 0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b00000, 0b00000]],
        [0, 5, [0b00000, 0b01110, 0b10001, 0b10001, 0b10001, 0b01110, 0b00000, 0b00000]],
        [0, 4, [0b0000, 0b1110, 0b1001, 0b1001, 0b1110, 0b1000, 0b0000, 0b0000]],
        [0, 5, [0b00000, 0b01110, 0b10001, 0b10001, 0b10001, 0b01110, 0b00011, 0b00000]],
        [0, 4, [0b0000, 0b1110, 0b1001, 0b1110, 0b1001, 0b1001, 0b0000, 0b0000]],
        [0, 4, [0b0000, 0b0111, 0b1000, 0b0110, 0b0001, 0b1110, 0b0000, 0b0000]],
        [0, 5, [0b00000, 0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00000, 0b00000]],
        [0, 4, [0b0000, 0b1001, 0b1001, 0b1001, 0b1001, 0b0110, 0b0000, 0b0000]],
        [0, 5, [0b00000, 0b10001, 0b10001, 0b01010, 0b01010, 0b00100, 0b00000, 0b00000]],
        [0, 7, [0b0000000, 0b1000001, 0b1001001, 0b1001001, 0b0110110, 0b0100010, 0b0000000, 0b0000000]],
        [0, 5, [0b00000, 0b10001, 0b01010, 0b00100, 0b01010, 0b10001, 0b00000, 0b00000]],
        [0, 5, [0b00000, 0b10001, 0b10001, 0b01110, 0b00100, 0b00100, 0b00000, 0b00000]],
        [0, 5, [0b00000, 0b11111, 0b00010, 0b00100, 0b01000, 0b11111, 0b00000, 0b00000]],
    ]
}

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

/**
 * The generator.
 * @author TheoryOfNekomata
 * @date 2018-01-14
 */

/**
 * Gets the default stored fonts.
 * @returns {Object[]} The default fonts.
 */
function getDefaultFonts() {
    return [
        {
            name: 'default',
            data: FONT_DEFAULT
        }
    ]
}

/**
 * Resets the stored fonts.
 */
function resetStoredFonts() {
    let defaultStoredFonts = getDefaultFonts();

    window.localStorage.setItem(
        'fonts',
        JSON.stringify(defaultStoredFonts)
    );
}

/**
 * Class for the textmoji generator Web interface
 */
class TextmojiGenerator {
    /**
     * Constructs a new generator form.
     * @param {Element} input The element for  input text.
     * @param {Element} output The element for output text.
     * @param {Element} black The element for the input text for positive space.
     * @param {Element} white The element for the input text for negative space.
     * @param {Element} font The element for the font selection.
     * @param {Element} chars The element for the output text character count.
     */
    constructor({
                    input,
                    output,
                    black,
                    white,
                    font,
                    chars,
                }) {
        this.txtInput = input;
        this.txtOutput = output;
        this.txtBlack = black;
        this.txtWhite = white;
        this.ddFont = font;
        this.lblChars = chars;

        this.loadStoredFonts();
        this.attachEvents();
    }

    /**
     * Attach event listeners from elements.
     */
    attachEvents() {
        let txtAreas = [this.txtInput, this.txtBlack, this.txtWhite,];
        let events = ['keydown', 'keyup'];
        let eventHandler = () => {
            this.updateTextAreas({
                input: this.txtInput,
                output: this.txtOutput,
                black: this.txtBlack,
                white: this.txtWhite,
                font: this.ddFont,
            });
        };

        this.updateFontSelection();

        txtAreas.forEach(txtArea => {
            events.forEach(event => {
                txtArea.addEventListener(event, eventHandler);
            });
        });

        this.ddFont.addEventListener('change', () => {
            window.localStorage.setItem('currentFont', this.ddFont.value);
            eventHandler();
        });
    }

    /**
     * Load stored fonts from a storage (LocalStorage).
     */
    loadStoredFonts() {
        let storedFontsRaw = window.localStorage.getItem('fonts');
        let storedFonts = null;

        if (storedFontsRaw !== null) {
            try {
                storedFonts = JSON.parse(storedFontsRaw);
            } catch(e) {
                resetStoredFonts();
                this.storedFonts = getDefaultFonts();
                return
            }
        }

        if (!(storedFonts instanceof Array)) {
            resetStoredFonts();
            storedFonts = getDefaultFonts();
        }

        this.storedFonts = storedFonts;
    }

    /**
     * Update the text areas for rendering.
     */
    updateTextAreas() {
        let currentFont = this.storedFonts.filter(font => font.name === this.ddFont.value);
        let output;

        if (currentFont < 1) {
            this.txtOutput.value = '';
            this.lblChars.innerText = 0;
            return
        }

        output = renderText(
            this.txtInput.value,
            currentFont[0].data,
            {
                black: this.txtBlack.value,
                white: this.txtWhite.value,
            },
        );

        this.txtOutput.value = output;
        this.lblChars.innerText = output.length;
    }

    /**
     * Update the font selection for available fonts.
     */
    updateFontSelection() {
        this.ddFont.innerHTML = '';

        this.storedFonts.forEach(font => {
            let option = window.document.createElement('option');

            option.innerText = font.name;
            option.setAttribute('value', font.name);
            this.ddFont.appendChild(option);
        });
    }
}

/**
 * The script for the generator file.
 * @author TheoryOfNekomata
 * @date 2018-01-14
 */

new TextmojiGenerator({
    input: window.document.getElementById('txtInput'),
    output: window.document.getElementById('txtOutput'),
    black: window.document.getElementById('txtBlack'),
    white: window.document.getElementById('txtWhite'),
    font: window.document.getElementById('ddFont'),
    chars: window.document.getElementById('lblChars')
});

}());
