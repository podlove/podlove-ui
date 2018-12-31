import { storiesOf } from '@storybook/vue'

// Buttons
import playButtonStory from './play-button/story.js'
import chapterButtonStory from './chapter-button/story.js'
import stepperButtonStory from './stepper-button/story.js'

// Icons
import iconStory from './icons/story.js'

const buttons = storiesOf('Buttons', module)

buttons.add('play-button', playButtonStory)
buttons.add('chapter-button', chapterButtonStory)
buttons.add('stepper-button', stepperButtonStory)

const icons = storiesOf('Icons', module)

icons.add('icon', iconStory)
