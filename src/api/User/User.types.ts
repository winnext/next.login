/* eslint-disable no-unused-vars */
export type User = {
  id: String;
  username: String;
  firstName: String;
  lastName: String;
};
export type RootQuery = {
  getSingleUser(userId: String): User;
};

export type RootMutation = {
  // eslint-disable-next-line no-unused-vars
  createUser(firstName: String, username: String, lastName: String): String;
  updateUser(
    id: String,
    firstName: String,
    lastName: String,
    username: String
  ): String;
  deleteUser(userId: String): String;
};
