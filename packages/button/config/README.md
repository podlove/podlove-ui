# Podlove Subscribe Button Configuration

> Configuration Parser for Subscribe Button

## Properties

- `feed`: RSS Feed (string)
- `clients`: List of clients with id and optional service (array)
- `theme`: Configured theme (object)
- `language`: Configured runtime language (string)

## Example Configuration

```
{
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
    "feed": "http://feeds.soundcloud.com/users/soundcloud:users:319180361/sounds.rss",
    "clients": [
      {
        "id": "apple-podcasts",
        "service": "lobo-der-debatten-podcast/id1259142707"
      }
    ],
    "runtime": {
      "language": "de"
    }
  }
}
```
