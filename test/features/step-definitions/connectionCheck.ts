import { Given, Then } from "@wdio/cucumber-framework";
import loginPage from "../../page-objects/loginPage.js";
import homePage from "../../page-objects/homePage.js";

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