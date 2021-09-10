/* eslint-disable no-unused-vars */
export type Group={
    id: String,
    name: String
}
export type RootQuery={
    getGroup(id:String): Group
}

export type RootMutation = {
    // eslint-disable-next-line no-unused-vars
    createGroup(name: String):String
    deleteGroup(id:String):String
    updateGroup(id:String, name:String):String
}
