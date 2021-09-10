import GroupRepresentation from '@keycloak/keycloak-admin-client/lib/defs/groupRepresentation';
import { Group } from './Group.types';
import AuthenticationProvider from '../auth/AuthenticationProvider';

export default class GroupController {
  static async createGroup(name:JSON):Promise<String> {
    const convertion = (JSON.stringify(name));
    const myObj = JSON.parse(convertion);
    const groupName = myObj.name;
    const users = new AuthenticationProvider();
    await users.auth();
    return users.createGroup(`${groupName}`);
  }

  static async deleteGroup(inputs:JSON):Promise<String> {
    const jsonInput = (JSON.stringify(inputs));
    const myObj = JSON.parse(jsonInput);
    const { id } = myObj;
    const authentication = new AuthenticationProvider();
    await authentication.auth();
    return authentication.deleteGroup(id);
  }

  static async updateGroup(inputs:JSON):Promise<String> {
    const jsonInput = (JSON.stringify(inputs));
    const myObj = JSON.parse(jsonInput);
    const { id } = myObj;
    const { name } = myObj;
    const authentication = new AuthenticationProvider();
    await authentication.auth();
    return authentication.updateGroup(id, name);
  }

  static async getGroup(inputs:JSON):Promise<Group> {
    const jsonInput = (JSON.stringify(inputs));
    const myObj = JSON.parse(jsonInput);
    const { id } = myObj;
    const authentication = new AuthenticationProvider();
    await authentication.auth();
    // return authentication.getGroup(id);
    return authentication.getGroup(id);
  }
}
