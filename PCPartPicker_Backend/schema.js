export const schema = `
type Query {
    getUser: User
    getCpus: [CPU]
    getCaseAccessories: [caseAccessory]
    getCases: [case]
    getOS: [OS]
    getMemory: [memory]
    getMonitor: [monitor]
    getPowerSupply: [powerSupply]
    getInternalHardDrive: [internalHardDrive]
    getThermalPaste: [thermalPaste]
    getWirelessNetworkCard: [wirelessNetworkCard]
    getMotherboard: [motherboard]
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
},
type caseAccessory{
    name: String
    price: Float
    type: String
    form_factor: String
},
type case{
    name: String
    price: Float
    type: String
    color: String
    psu: Float
    side_panel: String
    external_volume: Float
    internal_35_bays: Int
},
type OS{
    name: String
    price: Float
    mode: Int
    max_memory: Int
},
type memory{
    name: String
    price: Float
    speed: [Int]
    modules: [Int]
    color: String
    first_word_latency: Float
    cas_latency: Float
},
type monitor{
    name: String
    price: Float
    screen_size: Float
    resolution: [Int]
    refresh_rate: Float
    response_time: Float
    panel_type: String
    aspect_ratio: String
},
type powerSupply{
    name:String
    price:Float
    type:String
    efficiency:String
    wattage:Int
    modular:String
    color:String
},
type internalHardDrive{
    name:String
    price:Float
    capacity:Int
    type:String
    interface:String
    cache:Int
    form_factor:String
},
type thermalPaste{
    name:String
    price:Float
    amount:Float
},
type wirelessNetworkCard{
    name:String
    price:Float
    protocol:String
    interface:String
    color:String
},
type motherboard{
    name:String
    price:Float
    socket:String
    form_factor:String
    max_memory:Int
    memory_slots:Int
    color:String
}
type Mutation {
    signup(username:String, email: String, age:String, membership:String, number: String,  password: String): AuthPayload
    login(email: String, password: String): AuthPayload
}
`;
