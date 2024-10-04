export const schema = `
type Query {
    getUser: User
    getCpus: [CPU]
},
type User {
    id: ID
    username: String
    email: String
    age:String
    membership: String
    number:String
    password: String
}, 
type AuthPayload {
    token: String
    user: User
    errorMessage: String 
},
type CPU {
    name: String
    price: Float
    core_clock: Float
    core_count: Int
    boost_clock: Float
    tdp: Int
    graphics: String
    smt: Boolean
}
type Mutation {
    signup(username:String, email: String, age:String, membership:String, number: String,  password: String): AuthPayload
    login(email: String, password: String): AuthPayload
}
`;
