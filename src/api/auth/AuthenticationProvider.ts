import * as dotenv from 'dotenv';

import KeycloakAdminClient from '@keycloak/keycloak-admin-client';

dotenv.config();
export default class AuthenticationProvider {
   connection:KeycloakAdminClient

   constructor() {
     this.connection = new KeycloakAdminClient({
       realmName: process.env.KEYCLOAK_REALMNAME,
       baseUrl: process.env.KEYCLOAK_BASENAME,

     });
   }

   public async auth() {
     await this.connection.auth({
       username: 'admin@signumtte.com',
       password: 'Sgnm237..',
       grantType: 'password',
       clientId: 'admin',
     });
   }

   // List users
   public async listUsers() {
     return this.connection.users.find();
   }

   // Get single user by id
   public async getSingleUser(userId:string) {
     return this.connection.users.findOne({
       id: userId,
     });
   }

   // Count users
   public async countUsers() {
     return this.connection.users.count();
   }

   // Update user
   public async updateUser(userId:string, firstName:string, lastName:string, username:string) {
     this.connection.users.update(
       { id: userId },
       {
         firstName,
         lastName,
         username,
         emailVerified: true,
       },
     );
   }

   // Delete user
   public async deleteUser(userId:string) {
     this.connection.users.del({
       id: userId,
     });
   }

   // Create User
   public async createUser(firstName:string, username:string, lastName:string) {
     return this.connection.users.create({
       username,
       firstName,
       lastName,
       email: username,
       emailVerified: true,
       enabled: true,
     });
   }
}
