import { JSDOM } from 'jsdom'
const dom = new JSDOM(`<body></body>`)
global.document = dom.window.document
global.window = dom.window
