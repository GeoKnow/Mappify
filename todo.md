- refactored the tileLayer.tpl.html
  - remove the hard coded changeTileLayers and replace them with the the layers provided by the tileLayerService
  - {UI-Improvement} - add an image for each tile provider to the tileLayer.json and add those images to the modal
- config model tileLayer
  - how do we handle costume tileLayers
    - check the leaflet docs

- dataSource
  - add directive for dataSourceService <mappfiy-app-dataSourceService service="service"/>

- log (app and map)
  - add namespace to log and enabling/disabling per namespace
  - or something like this <mappify logging="true" />
