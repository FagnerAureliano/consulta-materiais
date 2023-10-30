export const environment = {
  production: true,
  homolog: false,
  development: false,

  version: '1.0.0',

  KEYCLOAK_URL: 'https://auth.ccarj.intraer/auth/',
  KEYCLOAK_REALM: 'FAB',
  KEYCLOAK_CLIENT_ID: 'material-apoio-api',

  SEARCH_FRONT_URL: 'https://portaldeapoio.rancher.ccarj.intraer/consult-materials/#/',
  USER_API_ENDPOINT: 'https://portaldeapoio.rancher.ccarj.intraer/user-service/api/v1',
  SEARCH_API_ENDPOINT: 'https://portaldeapoio.rancher.ccarj.intraer/search-service/api/v1',
  STREAM_API_ENDPOINT: 'https://portaldeapoio.rancher.ccarj.intraer/stream-service/api/v1',
  FAQ_API_ENDPOINT: 'https://portaldeapoio.rancher.ccarj.intraer/faq-service/api/v1',
};
