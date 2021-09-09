export type Group={
    id: String,
    name: String
}
export type RootQuery={
    getGroups: String
}

export type RootMutation = {
    // eslint-disable-next-line no-unused-vars
    createGroup(name: String):String
}
