const FONT_DEFAULT = {
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

let currentFont = FONT_DEFAULT

function renderGlyph(c, font, { black, white }) {
    let glyphData = font.glyphs[c.charCodeAt(0)]
    let [, width, data] = glyphData
    return data.map(chunk => {
        let rendered = chunk
            .toString(2)

        if (white.length > 0) {
            while (rendered.length < width) {
                rendered = `0${ rendered }`
            }
        }

        return rendered
            .replace(/0/g, white)
            .replace(/1/g, black)
    })
}

function renderLine(line, font, { black, white }) {
    let cs = line.split('')
    let renderedGlyphs = cs.map(c => renderGlyph(c, font, { black, white }))
    let rendered = []

    for (let i = 0; i < font.height; i += 1) {
        rendered.push(
            renderedGlyphs
                .reduce(
                    (chunk, glyph) => chunk.length < 1 ?
                        glyph[i] :
                        `${ chunk }${ white }${ glyph[i] }`,
                    ''
                )
        )
    }

    return rendered.join('\n')
}

function transformText(str, font, { black, white }) {
    return str
        .split('\n')
        .map(line => renderLine(line, font, { black, white }))
        .join('\n\n')
}

function updateTextAreas({
                             input: txtInput,
                             output: txtOutput,
                             black: txtBlack,
                             white: txtWhite,
                         }) {
    txtOutput.value = transformText(
        txtInput.value,
        currentFont,
        {
            black: txtBlack.value,
            white: txtWhite.value,
        },
    )
}

function attachEvents({
                          input: txtInput,
                          output: txtOutput,
                          black: txtBlack,
                          white: txtWhite,
                      }) {
    let txtAreas = [txtInput, txtBlack, txtWhite]
    let events = ['keydown', 'keyup']
    let eventHandler = () => {
        updateTextAreas({
            input: txtInput,
            output: txtOutput,
            black: txtBlack,
            white: txtWhite,
        })
    }

    txtAreas.forEach(txtArea => {
        events.forEach(event => {
            txtArea.addEventListener(event, eventHandler)
        })
    })
}

let txtInput = window.document.getElementById('txtInput')
let txtOutput = window.document.getElementById('txtOutput')
let txtBlack = window.document.getElementById('txtBlack')
let txtWhite = window.document.getElementById('txtWhite')

attachEvents({
    input: txtInput,
    output: txtOutput,
    black: txtBlack,
    white: txtWhite,
})
