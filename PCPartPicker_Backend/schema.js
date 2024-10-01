export const schema = `
type Query {
    getUser: User
},
type User {
    id: ID
    firstname: String
    lastname: String
    email: String
    age:String
    gender: String
    membership: String
    number:String
    password: String
}, 
type AuthPayload {
    token: String
    user: User
    errorMessage: String 
},
type Mutation {
    signup(firstname: String, lastname: String, email: String, age:String, gender:String, membership:String, number: String,  password: String): AuthPayload
    login(email: String, password: String): AuthPayload
}
`;