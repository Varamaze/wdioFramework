import {config as baseCOnfig} from "../wdio.conf.js"
import * as dotenv from "dotenv"

dotenv.config();
export const config = Object.assign(baseCOnfig,{
    environment: "QA",
    url: "https://app.rudderstack.com/login",
    apiBaseURL: "https://api.rudderstack.com",
    name: "Adam",
    userName: process.env.USERNAME_QA,
    password: process.env.PASSWORD_QA,
    worksapceID: process.env.WORKSPACE_ID
})