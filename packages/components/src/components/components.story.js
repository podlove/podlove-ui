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
