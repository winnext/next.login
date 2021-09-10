/* eslint-disable import/no-unresolved */
import { Role } from './Role.types';
import AuthenticationProvider from '../auth/AuthenticationProvider';

export default class RoleController {
  static async createRole(name:JSON):Promise<String> {
    const convertion = (JSON.stringify(name));
    const myObj = JSON.parse(convertion);
    const RoleName = myObj.name;
    const users = new AuthenticationProvider();
    await users.auth();
    return users.createRole(`${RoleName}`);
  }

  static async deleteRole(inputs:JSON):Promise<String> {
    const jsonInput = (JSON.stringify(inputs));
    const myObj = JSON.parse(jsonInput);
    const { name } = myObj;
    const authentication = new AuthenticationProvider();
    await authentication.auth();
    return authentication.deleteRole(name);
  }

  static async updateRole(inputs:JSON):Promise<String> {
    const jsonInput = (JSON.stringify(inputs));
    const myObj = JSON.parse(jsonInput);
    const { name } = myObj;
    const { updateName } = myObj;
    const authentication = new AuthenticationProvider();
    await authentication.auth();
    return authentication.updateRole(name, updateName);
  }

  static async getRole(inputs:JSON):Promise<Role> {
    const jsonInput = (JSON.stringify(inputs));
    const myObj = JSON.parse(jsonInput);
    const { name } = myObj;
    const authentication = new AuthenticationProvider();
    await authentication.auth();
    return authentication.getRole(name);
  }
}
