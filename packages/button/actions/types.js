export const PREFIX = `BUTTON`

const type = (name) => `${PREFIX}_${name}`

export const INIT = type('INIT')

export const SHOW_LIST = type('SHOW_LIST')
export const HIDE_LIST = type('HIDE_LIST')

export const SHOW_OVERLAY = type('SHOW_OVERLAY')
export const HIDE_OVERLAY = type('HIDE_OVERLAY')

export const SHOW_FINISH_CARD = type('SHOW_FINISH_CARD')
export const HIDE_FINISH_CARD = type('HIDE_FINISH_CARD')

export const SET_RUNTIME = type('SET_RUNTIME')
export const SET_LANGUAGE = type('SET_LANGUAGE')
export const SET_VERSION = type('SET_VERSION')
