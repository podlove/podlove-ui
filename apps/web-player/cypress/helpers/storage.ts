import { prop } from 'ramda';

const getItem = (key) =>
  cy
    .window()
    .its('localStorage')
    .should('exist')
    .then((win) => win.localStorage)
    .then((storage) => {
      let item

      for (let i = 0; i < storage.length; i++) {
        if (storage.key(i).startsWith('pwp')) {
          item = storage.getItem(storage.key(i))
        }
      }

      if (!item) {
        throw new Error(`Could not find Web Player Local Storage Entry`)
      }

      return item
    })
    .then((item) => JSON.parse(item))
    .then(prop(key))

const mock = (value = {}) =>
  cy.window().then((win) => (win.localStorage.getItem = () => JSON.stringify(value)))

export default { getItem, mock }
