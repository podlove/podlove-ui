import { useEffect, useState } from 'react'
import './App.css'

const DEFAULT_SETTINGS = {
  COLOR: '#a181c1',
  SIZE: 'small',
  FORMAT: 'rectangle',
  LANGUAGE: 'de',
  STYLE: 'filled',
}

const App = () => {
  const [color, setColor] = useState(DEFAULT_SETTINGS.COLOR)
  const [format, setFormat] = useState(DEFAULT_SETTINGS.FORMAT)
  const [language, setLanguage] = useState(DEFAULT_SETTINGS.LANGUAGE)
  const [size, setSize] = useState(DEFAULT_SETTINGS.SIZE)
  const [style, setStyle] = useState(DEFAULT_SETTINGS.STYLE)

  useEffect(() => {
    if (document.getElementsByClassName('podlove-subscribe-button-iframe')?.length > 0) {
      console.log(document.getElementsByClassName('podlove-subscribe-button-iframe'))
      while (document.getElementsByClassName('podlove-subscribe-button-iframe').length > 0) {
        var sidebarAd = document.getElementsByClassName('podlove-subscribe-button-iframe')[0];
          sidebarAd.parentNode.removeChild(sidebarAd);
      }
    }
    const script = document.createElement('script')
    script.src = 'https://cdn.podlove.org/subscribe-button/javascripts/app.js'
    script.setAttribute('id', 'psb-script')
    script.setAttribute('class', 'podlove-subscribe-button')
    script.setAttribute('data-language', language)
    script.setAttribute('data-color', color)
    script.setAttribute('data-format', format)
    script.setAttribute('data-size', size)
    script.setAttribute('data-style', style)
    script.setAttribute('data-json-data', 'podcastData')
    document.getElementById('psb-container').appendChild(script)
  }, [color, format, language, size, style])

  return (
    <section className="
      text-gray-100
    ">
      <div
        className="
          flex
          flex-row
        "
      >
        <div className="
          flex
          flex-row
          items-center
          p-4
          relative
        ">
          <label for="psb-size">Size:</label>
          <select
            name="size"
            id="psb-size"
            onChange={(e) => setSize(e.target.value)}
            value={size}
            className="
              appearance-none
              bg-blue-800
              border
              border-white
              px-4
              py-2
              m-2
              rounded
            "
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="big">Big</option>
          </select>
        </div>
        <div className="
          flex
          flex-row
          items-center
          p-4
          relative
        ">
          <label for="psb-format">Format:</label>
          <select
            name="format"
            id="psb-format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="
              appearance-none
              bg-blue-800
              border
              border-white
              px-4
              py-2
              m-2
              rounded
            "
          >
            <option value="rectangle">Rectangle</option>
            <option value="square">Square</option>
            <option value="cover">Cover</option>
          </select>
        </div>
        <div className="
          flex
          flex-row
          items-center
          p-4
          relative
        ">
          <label for="psb-style">Style:</label>
          <select
            name="style"
            id="psb-style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="
              appearance-none
              bg-blue-800
              border
              border-white
              px-4
              py-2
              m-2
              rounded
            "
          >
            <option value="filled">Filled</option>
            <option value="outlined">Outlined</option>
            <option value="frameless">Frameless</option>
          </select>
        </div>
      </div>
      <div
        className="
          flex
          flex-row
        "
      >
        <div className="
          flex
          flex-row
          items-center
          p-4
          relative
        ">
          <label for="psb-color">Color:</label>
          <input
            type="color"
            id="psb-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="
              bg-blue-800
              mx-4
            "
          />
        </div>
        <div className="
          flex
          flex-row
          items-center
          p-4
          relative
        ">
          <label for="psb-language">Language:</label>
          <select
            name="language"
            id="psb-language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="
              appearance-none
              bg-blue-800
              border
              border-white
              px-4
              py-2
              m-2
              rounded
            "
          >
            <option value="du">Dutsch</option>
            <option value="en">English</option>
            <option value="es">Esperanto</option>
            <option value="de">German</option>
            <option value="fi">Finnish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center my-4" id="psb-container" />
    </section>
  );
}

export default App;
