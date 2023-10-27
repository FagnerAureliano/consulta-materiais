export const environment = {
  production: false,
  homolog: true,
  development: false,

  version: '1.0.0',

  KEYCLOAK_URL: 'https://auth.homolog.ccarj.intraer/auth/',
  KEYCLOAK_REALM: 'FAB',
  KEYCLOAK_CLIENT_ID: 'material-apoio-api',

  SEARCH_FRONT_URL: 'https://portaldeapoio.hml.rancher.ccarj.intraer/consult-materials/#/',
  USER_API_ENDPOINT: 'https://portaldeapoio.hml.rancher.ccarj.intraer/user-service/api/v1',
  SEARCH_API_ENDPOINT: 'https://portaldeapoio.hml.rancher.ccarj.intraer/search-service/api/v1',
  STREAM_API_ENDPOINT: 'https://portaldeapoio.hml.rancher.ccarj.intraer/stream-service/api/v1',
  FAQ_API_ENDPOINT: 'https://portaldeapoio.hml.rancher.ccarj.intraer/faq-service/api/v1',
};
