import { storiesOf } from '@storybook/vue'

import playButtonStory from './play-button/story.js'

const buttons = storiesOf('Buttons', module)

buttons.add('Play Button', playButtonStory)
