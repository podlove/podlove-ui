/* globals spyOn */

import {
  findNode,
  createNode,
  appendNode,
  tag,
  setStyles,
  addClasses,
  getClasses,
  removeClasses,
  setAttributes,
  hasOverflow
} from './dom'

describe('dom', () => {
  beforeEach(() => {
    spyOn(document, 'querySelectorAll').and.callThrough()
    spyOn(document, 'createElement').and.callThrough()
  })

  describe('findNode()', () => {
    test('should be a function', () => {
      expect(typeof findNode).toBe('function')
    })

    test('should call the document api', () => {
      const result = findNode('body')

      expect(document.querySelectorAll).toHaveBeenCalledWith('body')
      expect(result).toEqual(document.body)
    })

    test(`returns a given dom node`, () => {
      const testNode = document.createElement('p')
      const result = findNode(testNode)

      expect(testNode).toEqual(result)
    })
  })

  describe('createNode()', () => {
    test('should be a function', () => {
      expect(typeof createNode).toBe('function')
    })

    test('should call the document api', () => {
      createNode('div')
      expect(document.createElement).toHaveBeenCalledWith('div')
    })
  })

  describe('appendNode()', () => {
    test('should be a function', () => {
      expect(typeof appendNode).toBe('function')
    })

    test('appendNode should call the document api', () => {
      let testNode = document.createElement('div')
      let appender = appendNode(testNode)
      appender(document.createElement('p'))

      expect(testNode.children[0].tagName).toBe('P')
    })
  })

  describe('tag()', () => {
    test('should be a function', () => {
      expect(typeof tag).toBe('function')
    })

    test('tag should create a html tag', () => {
      expect(tag('p', 'foo')).toEqual('<p>foo</p>')
      expect(tag('div', 'foo', { bar: 'baz', bla: 'blub' })).toEqual(
        '<div bar="baz" bla="blub">foo</div>'
      )
    })
  })

  describe('setStyles()', () => {
    test('should be a function', () => {
      expect(typeof setStyles).toBe('function')
    })

    test('adds styles to a dom node', () => {
      const testNode = createNode('div')

      setStyles({ color: 'red', width: '200px' })(testNode)

      expect(testNode.style.color).toEqual('red')
      expect(testNode.style.width).toEqual('200px')
    })
  })

  describe('getClasses()', () => {
    test('should be a function', () => {
      expect(typeof getClasses).toBe('function')
    })

    test(`should return the class names`, () => {
      const testNode = createNode('div')
      addClasses(['foo', 'bar'])(testNode)

      expect(getClasses(testNode)).toEqual(['foo', 'bar'])
    })
  })

  describe('addClasses()', () => {
    test('should be a function', () => {
      expect(typeof addClasses).toBe('function')
    })

    test(`should add classes to dom elements`, () => {
      const testNode = createNode('div')
      addClasses(['foo', 'bar'])(testNode)

      expect(testNode.className).toEqual('foo bar')
    })
  })

  describe('removeClasses()', () => {
    test('should be a function', () => {
      expect(typeof removeClasses).toBe('function')
    })

    test(`should remove classes to dom elements`, () => {
      const testNode = createNode('div')
      testNode.className = 'foo bar baz'
      removeClasses(['foo', 'bar'])(testNode)

      expect(testNode.className).toEqual('baz')
    })
  })

  describe('setAttributes()', () => {
    test('should be a function', () => {
      expect(typeof setAttributes).toBe('function')
    })

    test(`should add attributes to an dom element`, () => {
      const testNode = createNode('div')
      setAttributes()(testNode)
      setAttributes({ title: 'foobar' })(testNode)

      expect(testNode.getAttribute('title')).toEqual('foobar')
    })
  })

  describe('hasOverflow()', () => {
    test('should be a function', () => {
      expect(typeof hasOverflow).toBe('function')
    })

    test(`should return true if clientWidth is smaller than scrollWidth`, () => {
      const testNode = {
        clientWidth: 500,
        scrollWidth: 700
      }

      expect(hasOverflow(testNode)).toBe(true)
    })

    test(`should return false if clientWidth is large than scrollWidth`, () => {
      const testNode = {
        clientWidth: 500,
        scrollWidth: 400
      }

      expect(hasOverflow(testNode)).toBe(false)
    })
  })
})
