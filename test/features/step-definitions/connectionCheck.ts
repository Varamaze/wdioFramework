import { Given,When, Then } from "@wdio/cucumber-framework";
import loginPage from "../../page-objects/loginPage.js";
import homePage from "../../page-objects/homePage.js";
import connectionPage from "../../page-objects/connectionPage.js";
import sourcesPage from "../../page-objects/sourcesPage.js";

Given(/^User navigates to Rudderstack login page$/, async function () {
    //@ts-ignore
    await browser.url(browser.options.url)
})

Then(/^User enters username, password and clicks login button$/, async function () {
    try {
        //@ts-ignore
        await loginPage.login(browser.options.userName, browser.options.password)
    } catch (err) {
        err.message = `Failed to login. ${err.message}`
    }
})

Then(/^User validates if home page is displayed$/, async function(){
    try{
        await homePage.validateHomePageLogo()
    }catch(err){
        err.message = `Unable to validate home page logo. ${err.message}`
        throw err
    }
})

When(/^User clicks on the (.*) source from connections page$/, async function(sourceName){
    try{
        await connectionPage.selectSource(sourceName)
    }catch(err){
        err.message = `Unable to select the given source ${sourceName}. ${err.message}`
        throw err
    }   
})

Then(/^User validate if destination exist to be false$/, async function(){
    try {
       let status = await sourcesPage.checkForDestinationConnection();
       console.log(`Actual Connection Status: ${status}`);
       expect(status).toBe(false);
    }catch(err){
        err.message = `Error while validating connections. ${err.message}`
        throw err
    }
})

Given(/^User clicks on the Add Destination button$/, async function(){
    try {
        await sourcesPage.clickAddExistingDestination();
    }catch(err){
        err.message = `Error while clicking add existing destination. ${err.message}`
        throw err
    }
})

Then(/^User selects the (.*) existing destination$/, async function(destinationName){
    try{
        await sourcesPage.selectExstingDestination(destinationName);
    }catch(err){
        err.message = `Error while trying to select the existing destination. ${err.message}`
        throw err
    }
})

Then(/^User validates if (.*) is connected to source$/,async function(destinationName){
    try{
        let flag = await sourcesPage.checkDestinationIsEnabled(destinationName)
        expect(flag).toBe(true);
    }catch(err){
        err.message = `Error while trying to validate connection between source and destination. ${err.message}`
        throw err
    }
})