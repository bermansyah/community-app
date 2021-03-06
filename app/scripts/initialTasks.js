(function(mifosX) {
  var defineHeaders = function(
    $httpProvider,
    $translateProvider,
    ResourceFactoryProvider,
    HttpServiceProvider,
    TENANT,
    CONTENT_TYPE,
    HOST,
    API_URL_OVERRIDE
  ) {

    // Fix API URL?
    if (API_URL_OVERRIDE  === 'true') {
        ResourceFactoryProvider.setBaseUrl(HOST);
        HttpServiceProvider.addRequestInterceptor('demoUrl', function(config) {
            return _.extend(config, {url: HOST + config.url });
        });

        $httpProvider.defaults.headers.common['X-Mifos-Platform-TenantId'] = TENANT;

     } else {
          // For multi tenant hosting
          var hostname = window.location.hostname;

          console.log('hostname---'+hostname);
          domains = hostname.split('.');
          console.log('domains---'+domains);
          if(domains[0] == "demo") {
                  $httpProvider.defaults.headers.common['X-Mifos-Platform-TenantId'] = TENANT;
                  console.log("demo server",domains[0]);
          } else {
                  $httpProvider.defaults.headers.common['X-Mifos-Platform-TenantId'] = domains[0];
                  console.log("other than demo server", domains[0]);
          }
     }

    // Enable CORS! (see e.g. http://enable-cors.org/)
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    //Set headers
    $httpProvider.defaults.headers.common['Content-Type'] = CONTENT_TYPE;

    // Configure i18n and preffer language
    //$translateProvider.translations('en', translationsEN);
    //$translateProvider.translations('de', translationsDE);

    $translateProvider.useStaticFilesLoader({
          prefix: 'global-translations/locale-',
          suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  };

  mifosX.ng.application.config(defineHeaders).run(function($log) {
    $log.info("Initial tasks are done!");
  });
}(mifosX || {}));
