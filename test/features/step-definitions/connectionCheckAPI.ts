import { Given, Then } from "@wdio/cucumber-framework";
import apiHelper from "../../helper/apiHelper.js";
import endpoints from "../../../data/endpoints.json" assert { type: "json" };
import loginAuth from "../../../data/loginAuth.json" assert { type: "json" };
import fs from "fs"

Given(/^User logs in rudderstack using API and gets auth token$/, async function () {
    let payload = {
        //@ts-ignore
        email: await browser.options.userName,
        //@ts-ignore
        password: await browser.options.password
    }
    try {
        //@ts-ignore
        let resp = await apiHelper.POST(browser.options.apiBaseURL, endpoints.LOGIN, "", payload)
        if (resp.status === 200) {
            let data = resp.text
            let file_name = `${process.cwd()}/data/loginAuth.json`
            fs.writeFileSync(file_name, data)

        } else {
            throw Error(`Failed to login.`)
        }

    } catch (err) {
        err.message = `Failed to get auth token from ${endpoints.LOGIN} endpoint. ${err.message}`
        throw err
    }
})

Then(/^User sends a GET request to (.*) and validates (.*) is present$/, async function(endpoint, sourceName){
    if (!endpoint) throw Error(`Endpoint provided is not valid.`)

    try{
        //@ts-ignore
        let resp = await apiHelper.GET(browser.options.apiBaseURL, endpoints[endpoint],loginAuth.idToken,{})
        expect(resp.status).toBe(200)
        let sourceDefinitions = JSON.parse(resp.text)
        for(let i=0; i<sourceDefinitions.length;i++){
            if(sourceDefinitions[i]["name"] === sourceName){
                this.sourceId = sourceDefinitions[i]["id"]
            }
        }
    }catch(err){
        err.message = `Failed to POST to  ${endpoints[endpoint]} endpoint. ${err.message}`
        throw err
    }
})

Then(/^User sends a POST request to (.*) and a creates a source with name (.*)$/, async function(endpoint, sourceName){
    let payload = {
        name: sourceName,
        sourceDefinitionId: this.sourceId,
        //@ts-ignore
        workspaceId: await browser.options.worksapceID,
        accountId: null,
        config: {}
    }
    
    let ep = endpoints[endpoint]
    //@ts-ignore
    ep = ep.replace(/\?/, await browser.options.worksapceID)
    try {
        //@ts-ignore
        let resp = await apiHelper.POST(browser.options.apiBaseURL, ep, loginAuth.idToken, payload)
        let jsonresp = JSON.parse(resp.text)
        expect(resp.status).toBe(200)
        //@ts-ignore
        expect(jsonresp.creator.name).toBe(browser.options.name)
    } catch (err) {
        err.message = `Failed to get auth token from ${endpoints.LOGIN} endpoint. ${err.message}`
        throw err
    }
})