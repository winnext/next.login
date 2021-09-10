/* eslint-disable no-useless-catch */
import * as dotenv from "dotenv";

import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import UserRepresentation from "@keycloak/keycloak-admin-client/lib/defs/userRepresentation";
import { User } from "../User/User.types";

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
      username: "admin@signumtte.com",
      password: "Sgnm237..",
      grantType: "password",
      clientId: "admin",
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
    username: string
  ): Promise<String> {
    try {
      await this.connection.users.update(
        { id: userId },
        {
          firstName,
          lastName,
          username,
          emailVerified: true,
        }
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
    lastName: string
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
  public async createGroup(name: string): Promise<String> {
    const p = await this.connection.groups.create({
      name,
    });
    return p.id;
  }
}
