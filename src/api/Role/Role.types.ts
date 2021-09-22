/* eslint-disable no-unused-vars */
export type Role={
    id: String,
    name: String
}
export type RootQuery={
    getRole(name:String): Role
}
export type RootMutation ={
    createRole(name: String): String
    deleteRole(name:String):String
    updateRole(name:String, updateName:String):String
}
