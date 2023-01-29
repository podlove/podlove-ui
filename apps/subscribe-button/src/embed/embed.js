import url from 'button?url'

export default function embedDom({ base }) {
  return `<div>
    <script type="text/javascript">
      window.resourceBaseUrl = '${base}';
    </script>

    <div id="subscribe-button">
      <subscribe-button></subscribe-button>
    </div>

    <script type="module">
      import createButton from '${url}'
      const { app } = createButton()

      app.mount('#subscribe-button')
    </script>

    <style>
      #subscribe-button {
        display: inline-block;
      }
    </style>
  </div>`
}
