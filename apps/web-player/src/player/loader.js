import { tag } from '@podlove/utils/dom'
// eslint-disable-next-line
import css from '!css-loader!sass-loader!../styles/loader.scss'

const style = tag('style', css.toString())

const script = tag(
  'script',
  `
  var app = document.getElementById('app')

  window.addEventListener('load', function() {
    setTimeout(function () {
      app.className += ' loaded'
    }, 600)
  })
`
)

export const createLoader = () => [style, script].join('')
