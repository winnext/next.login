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
}
