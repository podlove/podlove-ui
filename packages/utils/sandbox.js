import { compose, curry, prop } from 'ramda'
import { createNode, appendNode, setAttributes, setStyles } from './dom'

const iframe = compose(
  setAttributes({
    'min-width': '100%',
    seamless: '',
    scrolling: 'no',
    frameborder: '0'
  }),
  setStyles({
    height: 'auto'
  }),
  createNode
)

const createFrame = () => new Promise(resolve => resolve(iframe('iframe')))

export const sandboxWindow = prop('contentWindow')
export const sandboxDocument = compose(prop('document'), sandboxWindow)

export const resize = curry((anchor, frame) => {
  const setFrameSize = () => setAttributes({ width: anchor.offsetWidth }, frame)

  setFrameSize()

  // Reset the width on window load
  window.addEventListener('load', setFrameSize)

  // Reset the width on viewport resize
  window.addEventListener('resize', setFrameSize)

  return frame
})

const inject = curry(
  (content, sandbox) =>
    new Promise(resolve => {
      const sdbxWindow = sandboxWindow(sandbox)
      const doc = sandboxDocument(sandbox)

      // transfer global window functions to sandbox
      if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        sdbxWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ =
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      }

      const onLoad = () => {
        if (doc.readyState === 'complete') {
          return resolve(sandbox)
        }

        return setTimeout(onLoad, 150)
      }

      doc.open()
      doc.write(content)
      doc.close()

      onLoad()
    })
)

export const sandbox = curry((anchor, content) =>
  createFrame()
    .then(appendNode(anchor))
    .then(inject(content))
)
