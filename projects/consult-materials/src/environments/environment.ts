// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  homolog: false,
  development: true,

  version: '1.0.0',

  KEYCLOAK_URL: 'http://localhost:8190/auth',
  KEYCLOAK_REALM: 'FAB',
  KEYCLOAK_CLIENT_ID: 'sisplaer',

  SEARCH_FRONT_URL: 'http://localhost:4300/consult-materials/#/',
  // API_ENDPOINT:'http://localhost:8090/api/v1',
  API_ENDPOINT: 'https://localhost:8443/api/v1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
