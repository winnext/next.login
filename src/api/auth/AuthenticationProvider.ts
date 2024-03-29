/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-catch */
import * as dotenv from 'dotenv';

import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { User } from '../User/User.types';

import { Group } from '../Group/Group.types';
import { Role } from '../Role/Role.types';

dotenv.config();
export default class AuthenticationProvider {
  connection: KeycloakAdminClient;

  constructor() {
    this.connection = new KeycloakAdminClient({
      realmName: process.env.KEYCLOAK_REALMNAME,
      baseUrl: process.env.KEYCLOAK_BASENAME,
    });
  }

  public async auth(): Promise<void> {
    await this.connection.auth({
      username: process.env.KEYCLOAK_USERNAME,
      password: process.env.KEYCLOAK_PASSWORD,
      grantType: 'password',
      clientId: String(process.env.KEYCLOAK_CLIENTID),
    });
  }

  // List users
  public async listUsers(): Promise<UserRepresentation[]> {
    const users = this.connection.users.find();
    return users;
    // return this.connection.users.find();
  }

  // Get single user by id
  public async getSingleUser(userId: string): Promise<User> {
    let keycloakUserResponse;
    try {
      keycloakUserResponse = await this.connection.users.findOne({
        id: userId,
      });
      return {
        id: String(keycloakUserResponse.id),
        username: String(keycloakUserResponse.username),
        firstName: String(keycloakUserResponse.firstName),
        lastName: String(keycloakUserResponse.lastName),
      };
    } catch (error) {
      throw error;
    }
  }

  // Count users
  public async countUsers(): Promise<number> {
    return this.connection.users.count();
  }

  // Update user
  public async updateUser(
    userId: string,
    firstName: string,
    lastName: string,
    username: string,
  ): Promise<String> {
    try {
      await this.connection.users.update(
        { id: userId },
        {
          firstName,
          lastName,
          username,
          emailVerified: true,
        },
      );
      return userId;
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  public async deleteUser(userId: string): Promise<String> {
    try {
      await this.connection.users.del({
        id: userId,
      });
      return userId;
    } catch (error) {
      throw error;
    }
  }

  // Create User
  public async createUser(
    firstName: string,
    username: string,
    lastName: string,
  ): Promise<String> {
    let keycloakUserResponse;
    try {
      keycloakUserResponse = await this.connection.users.create({
        username,
        firstName,
        lastName,
        email: username,
        emailVerified: true,
        enabled: true,
      });
      return keycloakUserResponse.id;
    } catch (error) {
      throw error;
    }
  }

  // Create Group
  public async createGroup(name:string):Promise<String> {
    try {
      const keycloakResponse = await this.connection.groups.create({
        name,
      });
      return keycloakResponse.id;
    } catch (err) {
      throw err;
    }
  }

  // Delete Group
  public async deleteGroup(id:string) :Promise<String> {
    try {
      await this.connection.groups.del(
        { id },
      );
      return id;
    } catch (err) {
      throw err;
    }
  }

  // Update Group
  public async updateGroup(id:string, name:string):Promise<String> {
    try {
      await this.connection.groups.update(
        { id },
        { name },
      );
      return id;
    } catch (err) {
      throw err;
    }
  }

  // Get group
  public async getGroup(id:string):Promise<Group> {
    // eslint-disable-next-line no-unreachable

    try {
      const keycloakResponse = await this.connection.groups.findOne(
        { id },
      );

      return {
        id: String(keycloakResponse.id),
        name: String(keycloakResponse.name),
      };
    } catch (err) {
      throw err;
    }
  }

  // Create Role
  public async createRole(name:string):Promise<String> {
    try {
      const keycloakResponse = await this.connection.roles.create({
        name,
      });
      return keycloakResponse.roleName;
    } catch (err) {
      throw err;
    }
  }

  // Delete Role
  public async deleteRole(name:string) :Promise<String> {
    try {
      await this.connection.roles.delByName(
        { name },
      );
      return name;
    } catch (err) {
      throw err;
    }
  }

  // Update Role
  public async updateRole(name:string, updateName:string):Promise<String> {
    try {
      await this.connection.roles.updateByName(
        { name },
        { name: updateName },
      );
      return updateName;
    } catch (err) {
      throw err;
    }
  }

  // Get Role
  public async getRole(name:string):Promise<Role> {
    // eslint-disable-next-line no-unreachable

    try {
      const keycloakResponse = await this.connection.roles.findOneByName(
        { name },
      );

      return {
        id: String(keycloakResponse.id),
        name: String(keycloakResponse.name),
      };
    } catch (err) {
      throw err;
    }
  }
}
