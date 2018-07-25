Package.describe({
    name: 'bootstrap4',
    version: '4.1.1'
});

Package.onUse(function(api) {
    api.versionsFrom('1.6.1.1');
    api.use('jquery', 'client');

    // js - default theme
    // api.addFiles('js/bootstrap.bundle.js', 'client');
    // api.addAssets('js/bootstrap.bundle.js.map', 'client');

    // js - material design theme
    // Go to => https://github.com/FezVrasta/bootstrap-material-design/releases
    api.addFiles('js/popper.js', 'client');
    api.addFiles('js/bootstrap-material.js', 'client');


});