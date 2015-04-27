{
  "name": "<%= appName %>",
  "version": "0.1.0",
  "dependencies": {
    "mappify-map": "danielkeil/mappify-map#0.2.0",
    "jassa": "0.9.0-SNAPSHOT",
    "angular": "~1.3.0",
    "font-awesome": "4.3.0",
    "lodash": "~3.2"
  },
  "main": [
    "dist/mappify-map.js"
  ],
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "overrides": {
    "mappify-map": {
      "main": "mappify-map.js"
    },
    "font-awesome": {
      "main": [
        "fonts/*"
      ]
    },
    "leaflet": {
      "main": [
        "dist/leaflet-src.js",
        "dist/leaflet.css"
      ]
    },
    "leaflet-plugins": {
      "main": [
        "layer/tile/Google.js"
      ]
    },
    "jassa": {
      "main": []
    }
  },
  "resolutions": {
    "font-awesome": "4.3.0"
  }
}