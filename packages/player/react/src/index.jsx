import React from 'react'
import { toggleTab } from '@podlove/player-actions/tabs'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import loadScripts from 'load-scripts'
import { equals, omit } from 'ramda'
import debounce from 'lodash.debounce'

const cdnFallback = 'https://cdn.podlove.org/web-player/5.x'

export class PodloveWebPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.playerRef = React.createRef()
    this.mountIframe = debounce(() => {
      const node = this.playerRef.current

      if (!node) {
        return
      }

      if (this.props.variant) {
        node.setAttribute('data-variant', this.props.variant)
      }

      node.innerHTML = typeof this.props.children === 'string' ? this.props.children : ''
      window.podlovePlayer(node, this.props.episode, this.props.config).then(store => {
        this.props.onLoaded && this.props.onLoaded(store)

        if (this.props.playtime) {
          store.dispatch(requestPlaytime(this.props.playtime))
        }

        if (this.props.tab) {
          store.dispatch(toggleTab(this.props.tab))
        }
      })
    }, 600)
  }

  async componentDidMount() {
    window.podlovePlayer = undefined
    const script = `${this.props.base || cdnFallback}/embed.js`
    await loadScripts(script).then(this.mountIframe.bind(this))
  }

  componentWillReceiveProps(props) {
    if (equals(omit(props, 'onLoaded'), omit(this.props, 'onLoaded'))) {
      return
    }

    this.props = props
    this.mountIframe()
  }

  render() {
    return <div ref={this.playerRef}></div>
  }
}
