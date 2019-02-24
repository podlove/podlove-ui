import { storiesOf } from '@storybook/vue'

// Buttons
import playButtonStory from './play-button/story'
import chapterButtonStory from './chapter-button/story'
import stepperButtonStory from './stepper-button/story'

// Icons
import iconStory from './icons/story'

// Progress
import progressStory from './progress-bar/story'

// Timer
import timerStory from './timer/story'

// Tab
import tabStory from './tab/story'

// Image
import imageStory from './image/story'

// ChapterProgress
import chapterProgressStory from './chapter-progress/story'

// Card
import cardStory from './card/story'

// Inputs
import buttonStory from './button/story'
import inputTextStory from './input-text/story'
import inputGroupStory from './input-group/story'

// Tooltip
import tooltipStory from './tooltip/story'

// Channel
import channelStory from './channel/story'

// ContentOption
import contentOptionStory from './content-option/story'

const buttons = storiesOf('Buttons', module)

buttons.add('play-button', playButtonStory)
buttons.add('chapter-button', chapterButtonStory)
buttons.add('stepper-button', stepperButtonStory)

const icons = storiesOf('Icons', module)

icons.add('icon', iconStory)

const progress = storiesOf('Progress', module)

progress.add('progress', progressStory)

const timer = storiesOf('Timer', module)

timer.add('timer', timerStory)

const tab = storiesOf('Tab', module)

tab.add('tab', tabStory)

const image = storiesOf('Image', module)
image.add('image', imageStory)

const chapters = storiesOf('Chapter Progress', module)
chapters.add('chapter-progress', chapterProgressStory)

const card = storiesOf('Card', module)
card.add('card', cardStory)

const input = storiesOf('Inputs', module)
input.add('button-component', buttonStory)
input.add('input-text', inputTextStory)
input.add('input-group', inputGroupStory)

const tooltip = storiesOf('Tooltip', module)
tooltip.add('tooltip', tooltipStory)

const channel = storiesOf('Channel', module)
channel.add('channel', channelStory)

const contentOption = storiesOf('Content Option', module)
contentOption.add('content-option', contentOptionStory)
