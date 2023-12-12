export const environment = {
  production: false,
  homolog: false,
  development: true,

  version: '1.0.0',

  //To use in localhost
  KEYCLOAK_URL: 'http://localhost:8190/auth',
  KEYCLOAK_REALM: 'FAB',
  KEYCLOAK_CLIENT_ID: 'material-apoio-api',

  SEARCH_FRONT_URL: 'http://localhost:4300/#/',
  USER_API_ENDPOINT: 'http://localhost:8082/user-service/api/v1',
  SEARCH_API_ENDPOINT: 'http://localhost:8083/search-service/api/v1',
  STREAM_API_ENDPOINT: 'http://localhost:8080/stream-service/api/v1',
  FAQ_API_ENDPOINT: 'http://localhost:8084/faq-service/api/v1',

  //to use in kubernet dev cluster
  // KEYCLOAK_URL: 'https://auth.homolog.ccarj.intraer/auth/',
  // KEYCLOAK_REALM: 'FAB',
  // KEYCLOAK_CLIENT_ID: 'material-apoio-api',

  // SEARCH_FRONT_URL: 'https://portaldeapoio.dev.rancher.ccarj.intraer/consult-materials/#/',
  // USER_API_ENDPOINT: 'https://portaldeapoio.dev.rancher.ccarj.intraer/user-service/api/v1',
  // SEARCH_API_ENDPOINT: 'https://portaldeapoio.dev.rancher.ccarj.intraer/search-service/api/v1',
  // STREAM_API_ENDPOINT: 'https://portaldeapoio.dev.rancher.ccarj.intraer/stream-service/api/v1',
  // FAQ_API_ENDPOINT: 'https://portaldeapoio.dev.rancher.ccarj.intraer/faq-service/api/v1',
};
