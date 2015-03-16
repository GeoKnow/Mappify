<!doctype html>
<html class="no-js" ng-app="<%= appName %>">
<head>
    <meta charset="utf-8">
    <title><%= appName %></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <style>
        #map {
            width: 100%;
            height: 100vh;
            position: absolute;
        }

        body {
            margin: 0;
        }
    </style>


    <%= googleMaps %>
    <script src="//maps.google.com/maps/api/js?v=3&sensor=false"></script>

    <!-- inject:vendor:css -->
    <!-- endinject -->
    <!-- inject:css -->
    <!-- endinject -->

</head>
<body>

<div ng-controller="AppCtrl as main">
    <%= mappify %>
</div>



<!-- inject:vendor:js -->
<!-- endinject -->
<!-- ref:js js/jassa.min.js -->
<script src="bower_components/jassa/jassa.min.js"></script>
<!-- endref -->
<!-- inject:js -->
<!-- endinject -->
<script>
    // global jassa object
    var jassa = new Jassa(Promise, function() {
        var jqXHR = $.ajax.apply(this, arguments);
        
        return Promise.resolve(jqXHR)
            .cancellable()
            .catch(Promise.TimeoutError, Promise.CancellationError, function(e) {
                jqXHR.abort();
                throw e;
            });;
    });
</script>
</body>
</html>
