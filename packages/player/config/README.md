# Podlove Player Configuration

> Configuration Parser for Web Player

## Properties

- `version`: configuration version (number)
- `duration`: duration (in ms, defaults to 0)
- `media`: media (audio) objects (array, defaults to [])
- `playtime`: playtime (in ms, defaults to 0)
- `chapters`: list of chapters (array, defaults to [])
- `theme`: theme configuration (object)
- `transcripts`: list of transcripts (array, defaults to [])
- `reference`: reference configuration (object)
- `shareReference`: reference to share outlet (object)
- `originReference`: reference to origin (string)
- `episodeReference`: reference to episode (string)
- `configReference`: reference to config (string)
- `runtime`: runtime configuration (object)
- `language`: configured language (string)
- `platform`: configured platform (string)
- `playlist`: list of playlist entries (array)
- `files`: list of files to download (array)
- `activeTab`: configured active tab (string)
- `subscribeButton`: subscribe button configuration (object)
- `share`: share configuration (object)
- `channels`: available share channels (array, defaults to [])
- `sharePlaytime`: playtime share enable/disable (boolean)

## Example Configuration

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
  "poster": "/example.jpg",
  "duration": "01:40:36.297",
  "link": "https://forschergeist.de/podcast/fg066-klimaneutralitaet/",
  "audio": [
    {
      "url": "https:\/\/forschergeist.de\/podlove\/file\/1781\/s\/webplayer\/c\/episode\/fg066-klimaneutralitaet.m4a",
      "size": "65728876",
      "title": "MPEG-4 AAC Audio (m4a)",
      "mimeType": "audio\/mp4"
    },
    {
      "url": "https:\/\/forschergeist.de\/podlove\/file\/1783\/s\/webplayer\/c\/episode\/fg066-klimaneutralitaet.opus",
      "size": "49217134",
      "title": "Opus Audio (opus)",
      "mimeType": "audio\/opus"
    },
    {
      "url": "https:\/\/forschergeist.de\/podlove\/file\/1774\/s\/webplayer\/c\/episode\/fg066-klimaneutralitaet.oga",
      "size": "68768334",
      "title": "Ogg Vorbis Audio (oga)",
      "mimeType": "audio\/ogg"
    },
    {
      "url": "https:\/\/forschergeist.de\/podlove\/file\/1782\/s\/webplayer\/c\/episode\/fg066-klimaneutralitaet.mp3",
      "size": "85274872",
      "title": "MP3 Audio (mp3)",
      "mimeType": "audio\/mpeg"
    }
  ],
  "chapters": [
    {
        "start": "00:00:00.000",
        "title": "Intro",
        "href": "",
        "image": ""
    },
    {
        "start": "00:00:42.922",
        "title": "Begrüßung",
        "href": "",
        "image": ""
    },
    {
        "start": "00:01:57.064",
        "title": "Vorstellung",
        "href": "",
        "image": ""
    },
    ...
  ],
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
  "transcripts": [
    {
        "start": "00:01:07.701",
        "start_ms": 67701,
        "end": "00:01:15.800",
        "end_ms": 75800,
        "speaker": "1",
        "voice": "timpritlove",
        "text": "insbesondere das Thema Klimawandel kommt uns jetzt hier immer wieder neu vor die Flinte und so soll es auch sein."
    },
    {
        "start": "00:01:20.001",
        "start_ms": 80001,
        "end": "00:01:28.100",
        "end_ms": 88100,
        "speaker": "1",
        "voice": "timpritlove",
        "text": "war auch die Ausgabe Nummer 23 vom Anfang 2016, mit Franz Josef Rademacher,"
    },
    {
        "start": "00:01:52.501",
        "start_ms": 112501,
        "end": "00:01:54.400",
        "end_ms": 114400,
        "speaker": "1",
        "voice": "timpritlove",
        "text": "Herzlich willkommen, Herr Radermacher."
    },
    ...
  ],
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
        "name": "FiraSansExtraBold",
        "family": ["FiraSansExtraBold", "Calibri", "Candara", "Arial", "Helvetica", "sans-serif"],
        "weight": 800,
        "src": [
          "https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eShf6Xl7Gl3LX.woff2"
        ]
      },
      "regular": {
        "name": "FiraSansLight",
        "family": [
          "FiraSansLight",
          "Calibri",
          "Candara",
          "Arial",
          "Helvetica",
          "sans-serif"
        ],
        "weight": 300,
        "src": ["https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKreSxf6Xl7Gl3LX.woff2"]
      },
      "bold": {
        "name": "FiraSansBold",
        "family": ["FiraSansBold", "Calibri", "Candara", "Arial", "Helvetica", "sans-serif"],
        "weight": 700,
        "src": ["https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eRRf6Xl7Gl3LX.woff2"]
      }
    }
  },
  "subscribe-button": {
    "feed": "http://feeds.soundcloud.com/users/soundcloud:users:319180361/sounds.rss",
    "clients": [
      {
        "id": "apple-podcasts",
        "service": "lobo-der-debatten-podcast/id1259142707"
      }
    ]
  },
  "playlist": [
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
    }
    ...
  ],
  "share": {
    "channels": ["facebook", "twitter", "mail", "link"],
    "outlet": "/share.html",
    "sharePlaytime": true
  },
  "base": "/"
}
```
