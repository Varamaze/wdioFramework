import {config as baseCOnfig} from "../wdio.conf.js"
export const config = Object.assign(baseCOnfig,{
    environment: "QA",
    url: "https://app.rudderstack.com/login",
    apiBaseURL: "https://api.rudderstack.com",
    name: "Adam",
    userName: "voham43334@tanlanav.com",
    password: "Adam@123Adam",
    worksapceID: "2aXVYFQalMHRU8FTeUBEhV79zll"
})