import React from 'react'
import { equals } from 'ramda'
import debounce from 'lodash.debounce'

const cdnFallback = 'https://cdn.podlove.org/subscribe-button/javascripts/'

export class PodloveSubscribeButton extends React.Component {
  constructor(props) {
    super(props)
    this.buttonRef = React.createRef()

    this.mountIframe = debounce(() => {
      const node = this.buttonRef.current
      if (!node) {
        return
      }

      node.innerHTML = ''

      window.podcastData = this.props.podcastData || {}
      const buttonScript = document.createElement('script')

      buttonScript.id = 'psb-script'
      buttonScript.className = 'podlove-subscribe-button'
      buttonScript.src = `${cdnFallback}app.js`
      buttonScript.setAttribute('data-json-data', 'podcastData')

      buttonScript.setAttribute('data-language', this.props.language)
      buttonScript.setAttribute('data-color', this.props.color)
      buttonScript.setAttribute('data-format', this.props.format)
      buttonScript.setAttribute('data-size', this.props.size)
      buttonScript.setAttribute('data-style', this.props.style)

      node.appendChild(buttonScript)
    }, 300)

    this.mountIframe()
  }

  componentDidUpdate(props) {
    if (equals(props, this.props)) {
      return
    }

    this.props = props
    this.mountIframe()
  }

  render() {
    return <div ref={this.buttonRef}></div>
  }
}
