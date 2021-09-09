import * as dotenv from 'dotenv';

import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';

dotenv.config();
export default class AuthenticationProvider {
   connection:KeycloakAdminClient

   constructor() {
     this.connection = new KeycloakAdminClient({
       realmName: process.env.KEYCLOAK_REALMNAME,
       baseUrl: process.env.KEYCLOAK_BASENAME,

     });
   }

   public async auth():Promise<void> {
     await this.connection.auth({
       username: 'admin@signumtte.com',
       password: 'Sgnm237..',
       grantType: 'password',
       clientId: 'admin',
     });
   }

   // List users
   public async listUsers():Promise<UserRepresentation[]> {
     const users = this.connection.users.find();
     return users;
     // return this.connection.users.find();
   }

   // Get single user by id
   public async getSingleUser(userId:string):Promise<UserRepresentation> {
     return this.connection.users.findOne({
       id: userId,
     });
   }

   // Count users
   public async countUsers():Promise<number> {
     return this.connection.users.count();
   }

   // Update user
   public async updateUser(userId:string, firstName:string, lastName:string, username:string): Promise<void> {
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
   public async deleteUser(userId:string):Promise<void> {
     this.connection.users.del({
       id: userId,
     });
   }

   // Create User
   public async createUser(firstName:string, username:string, lastName:string): Promise<{id:string}> {
     return this.connection.users.create({
       username,
       firstName,
       lastName,
       email: username,
       emailVerified: true,
       enabled: true,
     });
   }

   // Create Group
   public async createGroup(name:string):Promise<String> {
     const p = await this.connection.groups.create({
       name,
     });
     return p.id;
   }
}