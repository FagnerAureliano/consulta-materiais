export const environment = {
  production: false,
  homolog: true,
  development: false,

  version: '1.0.0',

  KEYCLOAK_URL: 'https://auth.homolog.ccarj.intraer/auth/',
  KEYCLOAK_REALM: 'FAB',
  KEYCLOAK_CLIENT_ID: 'material-apoio-api',

  SEARCH_FRONT_URL: 'http://localhost:4300/consult-materials/#/',
  STREAM_API_ENDPOINT: 'http://localhost:8080/api/v1',
  SEARCH_API_ENDPOINT: 'http://localhost:8083/api/v1',
  USER_API_ENDPOINT: 'http://localhost:8082/api/v1',
};
