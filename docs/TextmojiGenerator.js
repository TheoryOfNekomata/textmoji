var TextmojiGenerator = (function () {
'use strict';

/**
 * Script description.
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
 * Script description.
 * @author TheoryOfNekomata
 * @date 2018-01-14
 */

function renderGlyph(c, fontData, { black, white }) {
    let glyphData = fontData.glyphs[c.charCodeAt(0)];
    let [, width, data] = glyphData;
    let blackChar = black;
    let whiteChar = white;
    return data.map(chunk => {
        let rendered = chunk
            .toString(2);

        if (whiteChar.length < 1) {
            if (blackChar.length < 1) {
                blackChar = '@';
            }
            whiteChar = blackChar.split('').map(() => ' ').join('');
        }

        while (rendered.length < width) {
            rendered = `0${ rendered }`;
        }

        return rendered
            .replace(/0/g, whiteChar)
            .replace(/1/g, blackChar)
    })
}

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

    return rendered.join('\n')
}

function renderText(str, fontData, { black, white }) {
    return str
        .split('\n')
        .map(line => renderLine(line, fontData, { black, white }))
        .join('\n\n')
}

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2018-01-14
 */

function resetStoredFonts() {
    let defaultStoredFonts = [
        {
            name: 'default',
            data: FONT_DEFAULT
        }
    ];

    window.localStorage.setItem(
        'fonts',
        JSON.stringify(defaultStoredFonts)
    );

    return defaultStoredFonts
}

class TextmojiGenerator {
    constructor({
        input,
        output,
        black,
        white,
        font
    }) {
        this.txtInput = input;
        this.txtOutput = output;
        this.txtBlack = black;
        this.txtWhite = white;
        this.ddFont = font;

        this.loadStoredFonts();
        this.attachEvents();
    }

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

        this.updateFontSelection(this.ddFont, this.storedFonts);

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

    loadStoredFonts() {
        let storedFontsRaw = window.localStorage.getItem('fonts');
        let storedFonts = null;

        if (storedFontsRaw !== null) {
            try {
                storedFonts = JSON.parse(storedFontsRaw);
            } catch(e) {
                this.storedFonts = resetStoredFonts();
                return
            }
        }

        if (!(storedFonts instanceof Array)) {
            storedFonts = resetStoredFonts();
        }

        this.storedFonts = storedFonts;
    }

    updateTextAreas() {
        let currentFont = this.storedFonts.filter(font => font.name === this.ddFont.value);

        if (currentFont < 1) {
            this.txtOutput.value = '';
            return
        }

        this.txtOutput.value = renderText(
            this.txtInput.value,
            currentFont[0].data,
            {
                black: this.txtBlack.value,
                white: this.txtWhite.value,
            },
        );
    }

    updateFontSelection(el, fonts) {
        el.innerHTML = '';

        fonts.forEach(font => {
            let option = window.document.createElement('option');

            option.innerText = font.name;
            option.setAttribute('value', font.name);
            el.appendChild(option);
        });
    }
}

return TextmojiGenerator;

}());
