import { User } from './User.types';
import AuthenticationProvider from '../auth/AuthenticationProvider';

export default class UserController {
  static async createUser(data: JSON): Promise<String> {
    const convertion = JSON.stringify(data);
    const myObj = JSON.parse(convertion);
    const users = new AuthenticationProvider();
    await users.auth();
    return users.createUser(myObj.firstName, myObj.username, myObj.lastName);
  }

  static async updateUser(data: JSON): Promise<String> {
    const convertion = JSON.stringify(data);
    const myObj = JSON.parse(convertion);
    const users = new AuthenticationProvider();
    await users.auth();
    return users.updateUser(
      myObj.id,
      myObj.firstName,
      myObj.lastName,
      myObj.username,
    );
  }

  static async deleteUser(data: JSON): Promise<String> {
    const convertion = JSON.stringify(data);
    const myObj = JSON.parse(convertion);
    const users = new AuthenticationProvider();
    await users.auth();
    return users.deleteUser(myObj.userId);
  }

  static async getSingleUser(data: JSON): Promise<User> {
    const convertion = JSON.stringify(data);
    const myObj = JSON.parse(convertion);
    const users = new AuthenticationProvider();
    await users.auth();
    return users.getSingleUser(myObj.userId);
  }
}
