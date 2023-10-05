export const environment = {
  production: false,
  homolog: false,
  development: true,

  version: '1.0.0',

  KEYCLOAK_URL: 'http://localhost:8190/auth',
  KEYCLOAK_REALM: 'FAB',
  KEYCLOAK_CLIENT_ID: 'material-apoio-api',

  FAQ_API_ENDPOINT: 'http://localhost:8084/faq-service/api/v1',
  SEARCH_FRONT_URL: 'http://localhost:4300/consult-materials/#/',
  USER_API_ENDPOINT: 'http://localhost:8082/user-service/api/v1',
  SEARCH_API_ENDPOINT: 'http://localhost:8083/search-service/api/v1',
  STREAM_API_ENDPOINT: 'http://localhost:8080/stream-service/api/v1',
};
