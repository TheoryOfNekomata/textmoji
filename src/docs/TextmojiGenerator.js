import FONT_DEFAULT from './fonts/default';
import renderText from '../lib/index';

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
    ]

    window.localStorage.setItem(
        'fonts',
        JSON.stringify(defaultStoredFonts)
    )

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
        this.txtInput = input
        this.txtOutput = output
        this.txtBlack = black
        this.txtWhite = white
        this.ddFont = font

        this.loadStoredFonts()
        this.attachEvents()
    }

    attachEvents() {
        let txtAreas = [this.txtInput, this.txtBlack, this.txtWhite,]
        let events = ['keydown', 'keyup']
        let eventHandler = () => {
            this.updateTextAreas({
                input: this.txtInput,
                output: this.txtOutput,
                black: this.txtBlack,
                white: this.txtWhite,
                font: this.ddFont,
            })
        }

        this.updateFontSelection(this.ddFont, this.storedFonts)

        txtAreas.forEach(txtArea => {
            events.forEach(event => {
                txtArea.addEventListener(event, eventHandler)
            })
        })

        this.ddFont.addEventListener('change', () => {
            window.localStorage.setItem('currentFont', this.ddFont.value)
            eventHandler()
        })
    }

    loadStoredFonts() {
        let storedFontsRaw = window.localStorage.getItem('fonts')
        let storedFonts = null

        if (storedFontsRaw !== null) {
            try {
                storedFonts = JSON.parse(storedFontsRaw)
            } catch(e) {
                this.storedFonts = resetStoredFonts()
                return
            }
        }

        if (!(storedFonts instanceof Array)) {
            storedFonts = resetStoredFonts()
        }

        this.storedFonts = storedFonts
    }

    updateTextAreas() {
        let currentFont = this.storedFonts.filter(font => font.name === this.ddFont.value)

        if (currentFont < 1) {
            this.txtOutput.value = ''
            return
        }

        this.txtOutput.value = renderText(
            this.txtInput.value,
            currentFont[0].data,
            {
                black: this.txtBlack.value,
                white: this.txtWhite.value,
            },
        )
    }

    updateFontSelection(el, fonts) {
        el.innerHTML = '';

        fonts.forEach(font => {
            let option = window.document.createElement('option')

            option.innerText = font.name
            option.setAttribute('value', font.name)
            el.appendChild(option)
        })
    }
}

export default TextmojiGenerator
