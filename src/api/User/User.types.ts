export type User = {
    id:number,
    name: string
}
export type RootQuery = {
    getUsers: [User]
 }

export type RootMutation = {
    // eslint-disable-next-line no-unused-vars
    createUser(name: String): User
}

export type Userx = {
    id:number,
    name: string
}
