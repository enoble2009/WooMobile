// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  wordpressUrl: 'http://localhost/woomobile/',
  wordpressApiUrl: 'http://localhost/woomobile/wp-json/wp/v2/',
  woocommerceUrl: 'http://localhost:3000/',
  woocommerceKey: 'ck_7da06fc72aaf68df08a75a3d640853fc1fe891b6',
  woocommerceSecretKey: 'cs_9866e89fa80f34fd6d69f008cf8725e7d4576fc8',
  woocommerceAuthorization: timestamp => {return '&oauth_signature_method=HMAC-SHA1&oauth_timestamp='+timestamp+'&oauth_nonce=kF8B0a&oauth_version=1.0&oauth_signature=71yhyK09G6AYqi1azXIP8a1+w2A=';}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
