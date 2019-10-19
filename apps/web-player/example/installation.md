# Installation Podlove Web Player 5.0.0 Preview

## Resourcen

* `npm install @podlove/web-player@5.0.0-preview1`
* `embed.js` in Dokument einbinden


## Embedding

* DOM Node erzeugen (bspw.: `<div id="player" data-template="template.html"></div>`)
* Konfigurationen referenzieren

```
podlovePlayer('#player', '/episode.json', '/config.json');
```

## Konfiguration

### Episoden Metadaten

```javascript
{
  "version": 5,
  "show": {
    "title": "Forschergeist",
    "subtitle": "Horizonte für Bildung und Forschung",
    "summary": "Moderator Tim Pritlove spricht mit Wissenschaftlern und anderen Aktiven des Wissenschaftssystems über aktuelle und zukünftige Trends und Praktiken für die Bildung, der Forschung und der Organisation und Kommunikation der Wissenschaft.\r\n\r\nDie ausführlichen Interviews wenden sich vor allem an junge und angehende Wissenschaftler, die nach Möglichkeiten suchen, ihre Forschung und Lehre den neuen Bedürfnissen der Zeit anzupassen und weiter zu entwickeln.\r\n\r\nForschergeist ist ein Projekt des Stifterverbands für die Deutsche Wissenschaft und erscheint im Schnitt alle drei Wochen neu.",
    "poster": "https://forschergeist.de/wp-content/cache/podlove/56/919e28c4f31fedd72bcd78569f81bc/forschergeist_500x500.jpg",
    "link": "https://forschergeist.de"
  },
  "title": "FG066 Klimaneutralität",
  "subtitle": "Klimakompensation als Mittel der Öffentlichkeit zur Erreichung von Klimaneutralität jenseits politischer Verwerfungen",
  "summary": "Eigentlich möchte doch jeder etwas für die Umwelt tun. Doch nicht nur, wenn die Lösung der Probleme von den sozial Schwachen bezahlt werden soll, stößt jede noch so gut gemeinte Initiative auf erbitterten Widerstand. Darüber hinaus führen viele Ansätze, mit denen die Weltgemeinschaft die Erderwärmung aufhalten will, am Ziel vorbei. Auch das Klima-Abkommen von Paris ist im Grunde schon heute zum Scheitern verurteilt. Wie also kann ein realistischer Ausweg aussehen, um dem Aufheizen der Erdatmosphäre Einhalt zu gebieten?\r\n\r\nFranz Josef Radermacher, Leiter des Forschungsinstituts für Anwendungsorientierte Wissensforschung (FAW) in Ulm, beschäftigt sich seit Jahrzehnten mit diesen Themen. In dieser Folge nennt er die tatsächlichen Verursacher des Klimawandels. Und entlarvt anhand von Zahlen, dass manche Annahmen zu den Dimensionen von Umweltbelastungen und zur Effektivität von Gegenmaßnahmen einfach nicht stimmen. Sollten sich die Chinesen am deutschen Klimaschutz ein Beispiel nehmen? Besser nicht.\r\n\r\nIn der Umweltpolitik geht es im Kern um die Frage, wie Wohlstand verteilt ist, so Radermacher. Und das nicht nur in Deutschland, sondern weltweit. Aber gerade im globalen Maßstab zu denken, fällt enorm schwer. Eigentlich wäre es sinnvoll, dafür zu bezahlen, dass der Regenwald im Amazonas nicht abgeholzt wird. Es würde sich langfristig rentieren, jenseits von marginaler Entwicklungshilfe die Aufforstung und die Entwicklung der Landwirtschaft in Afrika zu finanzieren. Das passiert aber ebensowenig wie das Elektroauto als Patentrezept zum Vermindern von Treibhausgasen kritisch zu hinterfagen. Radermacher legt den Finger in die offenen Wunden der Klimapolitik.\r\n\r\nDiese Folge schließt an die Episode 023 an, in der Radermacher vor einem Zwei-Klassen-System beim Umweltschutz gewarnt hatte.",
  "publicationDate": "2019-02-20T23:01:56+00:00",
  "poster": "example.jpg",
  "duration": "01:40:36.297",
  "link": "https://forschergeist.de/podcast/fg066-klimaneutralitaet/",
  "audio": [{"url":"https:\/\/forschergeist.de\/podlove\/file\/1781\/s\/webplayer\/c\/episode\/fg066-klimaneutralitaet.m4a","size":"65728876","title":"MPEG-4 AAC Audio (m4a)","mimeType":"audio\/mp4"},{"url":"https:\/\/forschergeist.de\/podlove\/file\/1783\/s\/webplayer\/c\/episode\/fg066-klimaneutralitaet.opus","size":"49217134","title":"Opus Audio (opus)","mimeType":"audio\/opus"},{"url":"https:\/\/forschergeist.de\/podlove\/file\/1774\/s\/webplayer\/c\/episode\/fg066-klimaneutralitaet.oga","size":"68768334","title":"Ogg Vorbis Audio (oga)","mimeType":"audio\/ogg"},{"url":"https:\/\/forschergeist.de\/podlove\/file\/1782\/s\/webplayer\/c\/episode\/fg066-klimaneutralitaet.mp3","size":"85274872","title":"MP3 Audio (mp3)","mimeType":"audio\/mpeg"}],
  "chapters": "chapters.json",
  "contributors": [
    {
      "id": "1",
      "name": "Tim Pritlove",
      "avatar": "https://forschergeist.de/wp-content/cache/podlove/47/08928e3c26dcb1141d67ad75869619/tim-pritlove_150x150.jpg",
      "role": {
        "id": "1",
        "slug": "moderation",
        "title": "Moderation"
      },
      "group": {
        "id": "1",
        "slug": "onair",
        "title": "On Air"
      },
      "comment": null
    },
    {
      "id": "26",
      "name": "Franz Josef Radermacher",
      "avatar": "https://forschergeist.de/wp-content/cache/podlove/58/ef81fc4d0ccb818f819230dbf8ba98/franz-josef-radermacher_150x150.jpg",
      "role": {
        "id": "2",
        "slug": "guest",
        "title": "Gast"
      },
      "group": {
        "id": "1",
        "slug": "onair",
        "title": "On Air"
      },
      "comment": null
    },
    {
      "id": "7",
      "name": "Michael Sonnabend",
      "avatar": "https://forschergeist.de/wp-content/cache/podlove/d8/c6e28abc443e76cdd6bc2ea102d5cc/michael-sonnabend_150x150.jpg",
      "role": {
        "id": "3",
        "slug": "redaktion",
        "title": "Redaktion"
      },
      "group": {
        "id": "2",
        "slug": "support",
        "title": "Support"
      },
      "comment": null
    },
    {
      "id": "70",
      "name": "Björn Quäck",
      "avatar": "https://forschergeist.de/wp-content/cache/podlove/ff/f03356137ff995c5203bf6a09e817c/bjoern-quaeck_150x150.jpg",
      "role": {
        "id": "3",
        "slug": "redaktion",
        "title": "Redaktion"
      },
      "group": {
        "id": "2",
        "slug": "support",
        "title": "Support"
      },
      "comment": null
    }
  ],
  "transcripts": "transcripts.json"
}
```

Beispiel: [episode.json](http://podlove-player-next.surge.sh/episode.json)

### Konfigurations Metadaten

```javascript
{
  "activeTab": "chapters",
  "theme": {
    "tokens": {
      "brand": "#E64415",
      "brandDark": "#235973",
      "brandDarkest": "#1A3A4A",
      "brandLightest": "#E9F1F5",
      "shadeDark": "#807E7C",
      "shadeBase": "#807E7C",
      "contrast": "#000",
      "alt": "#fff"
    },
    "fonts": {
      "ci": {
        "family": ["SpiegelSlab4UICd", "Calibri", "Candara", "Arial", "Helvetica", "sans-serif"],
        "weight": 800
      },
      "regular": {
        "family": ["SpiegelSans4UIRegular", "Calibri", "Candara", "Arial", "Helvetica", "sans-serif"],
        "weight": 300
      },
      "bold": {
        "family": ["SpiegelSans4UIBold", "Calibri", "Candara", "Arial", "Helvetica", "sans-serif"],
        "weight": 700
      }
    }
  },
  "reference": {
    "base": "path/to/player/root",
    "config": "path/to/episode/configuration",
    "share": "path/to/share/endpoint"
  },
  "playlist": "playlist.json"
}
```

Beispiel: [config.json](http://podlove-player-next.surge.sh/config.json)

### Konfiguration Playlist

```javascript
[
  {
    "title": "FG070 Nachhaltigkeit und die Stadt",
    "config": "episodes/fg-70.json",
    "duration": "01:28:03.426"
  },
  {
    "title": "FG069 Islamische \u00c4sthetik",
    "config": "episodes/fg-69.json",
    "duration": "01:25:20.915"
  },
  {
    "title": "FG068 Risikoforschung",
    "config": "episodes/fg-68.json",
    "duration": "01:38:14.708"
  },
  {
    "title": "FG067 Datenbasierte Konfliktforschung",
    "config": "episodes/fg-67.json",
    "duration": "01:19:34.995"
  },
  {
    "title": "FG066 Klimaneutralität",
    "config": "episodes/fg-66.json",
    "duration": "01:40:36.297"
  },
  {
    "title": "FG065 Feuerökologie",
    "config": "episodes/fg-65.json",
    "duration": "02:27:10.981"
  },
  {
    "title": "FG064 Ethik und Genetik",
    "config": "episodes/fg-64.json",
    "duration": "01:47:16.900"
  },
  {
    "title": "FG063 Geothermie",
    "config": "episodes/fg-63.json",
    "duration": "01:56:55.100"
  },
  {
    "title": "FG062 Leichte Sprache",
    "config": "episodes/fg-62.json",
    "duration": "01:32:04.621"
  },
  {
    "title": "FG061 Persönlichkeitsentwicklung",
    "config": "episodes/fg-61.json",
    "duration": "00:58:26.860"
  },
  {
    "title": "FG060 Klimawandel",
    "config": "episodes/fg-60.json",
    "duration": "00:58:26.860"
  }
]
```

Beispiel: [playlist.json](http://podlove-player-next.surge.sh/playlist.json)

## Templating

* Referenzierung via `data-template` Attribut: `<div id="player" data-template="template.html"></div>`
* Tailwind zum templaten: https://tailwindcss.com/

### Template Beispie;

```html
<root>
  <div class="px-6 pt-6 flex flex-col">
    <div class="flex-col items-center mobile:flex tablet:hidden">
      <show-title class="text-sm"></show-title>
      <episode-title class="text-base mb-2"></episode-title>
      <poster class="rounded-sm w-48 shadow overflow-hidden"></poster>
      <divider class="w-full my-6"></divider>
    </div>

    <div class="tablet:flex flex-grow">
      <div class="w-64 mobile:hidden tablet:block tablet:mr-6">
        <poster class="rounded-sm shadow overflow-hidden"></poster>
      </div>
      <div class="w-full">
        <div class="hidden tablet:block">
          <show-title class="text-base"></show-title>
          <episode-title class="text-xl desktop:text-2xl"></episode-title>
          <divider class="w-full my-4"></divider>
        </div>
        <div class="flex items-center justify-between">
          <div class="block">
            <play-state on="active">
              <speed-control class="block hidden tablet:block"></speed-control>
            </play-state>
          </div>

          <div class="flex">
            <play-state on="active">
              <chapter-previous class="mx-2 block"></chapter-previous>
            </play-state>
            <play-state on="active">
              <step-backward class="mx-2 block"></step-backward>
            </play-state>

            <play-button class="mx-2 block" label="Podcast abspielen"></play-button>

            <play-state on="active">
              <step-forward class="mx-2 block"></step-forward>
            </play-state>
            <play-state on="active">
              <chapter-next class="mx-2 block"></chapter-next>
            </play-state>
          </div>

          <div class="block">
            <play-state on="active">
              <volume-control class="flex items-center hidden tablet:flex"></volume-control>
            </play-state>
          </div>
        </div>
        <div class="flex w-full">
          <progress-bar></progress-bar>
        </div>
        <div class="flex w-full -mt-2">
          <div class="w-3/12 text-left">
            <timer-current class="text-sm"></timer-current>
          </div>
          <div class="w-6/12 text-center">
            <play-state on="active">
              <current-chapter class="text-sm truncate"></current-chapter>
            </play-state>
          </div>
          <div class="w-3/12 text-right">
            <timer-duration class="text-sm"></timer-duration>
          </div>
        </div>
      </div>
    </div>
    <divider class="w-full mt-6 mb-3"></divider>
    <div class="flex">
      <div class="flex mobile:w-6/12 tablet:w-3/12 desktop:w-3/12 justify-between">
        <tab-trigger tab="chapters">
          <icon type="chapter"></icon>
        </tab-trigger>
        <tab-trigger tab="transcripts">
          <icon type="transcripts"></icon>
        </tab-trigger>
        <tab-trigger tab="files">
          <icon type="download"></icon>
        </tab-trigger>
        <tab-trigger tab="playlist">
          <icon type="playlist"></icon>
        </tab-trigger>
        <tab-trigger tab="share">
          <icon type="share"></icon>
        </tab-trigger>
      </div>
    </div>
  </div>
  <div class="w-full relative overflow-hidden">
    <tab name="chapters">
      <tab-chapters></tab-chapters>
    </tab>
    <tab name="transcripts">
      <tab-transcripts></tab-transcripts>
    </tab>
    <tab name="files">
      <tab-files></tab-files>
    </tab>
    <tab name="playlist">
      <tab-playlist></tab-playlist>
    </tab>
    <tab name="share">
      <tab-share></tab-share>
    </tab>
    <tab-overflow></tab-overflow>
  </div>

  <font
  name="SpiegelSlab4UICd"
  woff="./fonts/SpiegelSlab4UICd-ExtraBold.woff"
  woff2="./fonts/SpiegelSlab4UICd-ExtraBold.woff2"
  weight="800"
  ></font>

  <font
  name="SpiegelSans4UIRegular"
  woff="./fonts/SpiegelSans4UI-Regular.woff"
  woff2="./fonts/SpiegelSans4UI-Regular.woff2"
  weight="300"
  ></font>

  <font
  name="SpiegelSans4UIBold"
  woff="./fonts/SpiegelSans4UI-Bold.woff"
  woff2="./fonts/SpiegelSans4UI-Bold.woff2"
  weight="700"
  ></font>

  <error></error>
</root>
```

Beispiel: [template.html](http://podlove-player-next.surge.sh/template.html), [variant-l.html](http://podlove-player-next.surge.sh/templates/variant-l.html), [variant-m.html](http://podlove-player-next.surge.sh/templates/variant-m.html)

