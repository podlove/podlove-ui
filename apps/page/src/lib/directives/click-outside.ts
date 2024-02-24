export default {
  beforeMount(el: HTMLElement, { value: fn } : { value: Function }) {
    el.addEventListener('click', (evt) => {
      if (evt.target !== el) {
        return;
      }

      fn();
    });
  }
}
