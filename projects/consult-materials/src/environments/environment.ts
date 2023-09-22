export const environment = {
  production: false,
  homolog: false,
  development: true,

  version: '1.0.0',

  KEYCLOAK_URL: 'http://localhost:8190/auth',
  KEYCLOAK_REALM: 'FAB',
  KEYCLOAK_CLIENT_ID: 'material-apoio-api',

  SEARCH_FRONT_URL: 'http://localhost:4300/consult-materials/#/',
  STREAM_API_ENDPOINT: 'http://localhost:8080/stream-service/api/v1',
  SEARCH_API_ENDPOINT: 'http://localhost:8083/api/v1',
  USER_API_ENDPOINT: 'http://localhost:8082/user-service/api/v1',
  FAQ_API_ENDPOINT: 'http://localhost:8084/faq-service'
};
