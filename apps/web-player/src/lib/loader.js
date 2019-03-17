import color from 'color'
import { propOr } from 'ramda'

import { tag } from '@podlove/utils/dom'
// eslint-disable-next-line
import css from '!css-loader!sass-loader!../styles/loader.scss'

const style = tag('style', css.toString())

const dom = ({ theme }) => {
  const light = '#fff'
  const dark = '#000'

  const main = propOr('#2B8AC6', 'main', theme)
  const luminosity = color(main).luminosity()

  const highlight = propOr(luminosity < 0.25 ? light : dark, 'highlight', theme)

  return `<div class="loader" id="loader" style="background: ${main}">
    <div class="dot bounce1" style="background: ${highlight}"></div>
    <div class="dot bounce2" style="background: ${highlight}"></div>
    <div class="dot bounce3" style="background: ${highlight}"></div>
  </div>`
}

const script = tag('script', `
  var loader = document.getElementById('loader')

  window.addEventListener('load', function() {
    setTimeout(function () {
      loader.className += ' done'
    }, 300)

    setTimeout(function () {
      loader.parentNode.removeChild(loader)
    }, 600)
  })
`)

export const createLoader = config => ([style, dom(config), script].join(''))
