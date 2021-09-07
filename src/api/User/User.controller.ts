import { User } from './User.types';

export default class UserController {
  static createUser(args:any) : User {
    return {
      id: 2,
      name: args.name,
    };
  }

  static getUsers(): [User] {
    return [{
      id: 1,
      name: 'Ömer',
    }];
  }
}
