/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2018-01-14
 */

function renderGlyph(c, fontData, { black, white }) {
    let glyphData = fontData.glyphs[c.charCodeAt(0)]
    let [, width, data] = glyphData
    let blackChar = black
    let whiteChar = white
    return data.map(chunk => {
        let rendered = chunk
            .toString(2)

        if (whiteChar.length < 1) {
            if (blackChar.length < 1) {
                blackChar = '@'
            }
            whiteChar = blackChar.split('').map(() => ' ').join('')
        }

        while (rendered.length < width) {
            rendered = `0${ rendered }`
        }

        return rendered
            .replace(/0/g, whiteChar)
            .replace(/1/g, blackChar)
    })
}

function renderLine(line, fontData, { black, white }) {
    let cs = line.split('')
    let renderedGlyphs = cs.map(c => renderGlyph(c, fontData, { black, white }))
    let rendered = []

    for (let i = 0; i < fontData.height; i += 1) {
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

function renderText(str, fontData, { black, white }) {
    return str
        .split('\n')
        .map(line => renderLine(line, fontData, { black, white }))
        .join('\n\n')
}

export default renderText
