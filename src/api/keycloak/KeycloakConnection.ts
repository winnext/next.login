import KeycloakConnect from 'keycloak-admin';

const connection = new KeycloakConnect({
  baseUrl: 'http://172.19.101.14/auth',
  realmName: 'Eskisehir',
});
connection.auth({
  username: 'admin@signumtte.com',
  password: 'Sgnm237..',
  grantType: 'password',
  clientId: 'admin',
});

export default connection;
