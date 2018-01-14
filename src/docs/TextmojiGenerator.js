import FONT_DEFAULT from './fonts/default';
import renderText from '../lib/index';

/**
 * Script description.
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
    let defaultStoredFonts = getDefaultFonts()

    window.localStorage.setItem(
        'fonts',
        JSON.stringify(defaultStoredFonts)
    )
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
     */
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

    /**
     * Attach event listeners from elements.
     */
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

        this.updateFontSelection()

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

    /**
     * Load stored fonts from a storage (LocalStorage).
     */
    loadStoredFonts() {
        let storedFontsRaw = window.localStorage.getItem('fonts')
        let storedFonts = null

        if (storedFontsRaw !== null) {
            try {
                storedFonts = JSON.parse(storedFontsRaw)
            } catch(e) {
                resetStoredFonts()
                this.storedFonts = getDefaultFonts()
                return
            }
        }

        if (!(storedFonts instanceof Array)) {
            resetStoredFonts()
            storedFonts = getDefaultFonts()
        }

        this.storedFonts = storedFonts
    }

    /**
     * Update the text areas for rendering.
     */
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

    /**
     * Update the font selection for available fonts.
     */
    updateFontSelection() {
        this.ddFont.innerHTML = '';

        this.storedFonts.forEach(font => {
            let option = window.document.createElement('option')

            option.innerText = font.name
            option.setAttribute('value', font.name)
            this.ddFont.appendChild(option)
        })
    }
}

export default TextmojiGenerator
