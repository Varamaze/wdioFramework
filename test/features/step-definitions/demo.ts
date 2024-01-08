import {Given, When, Then} from "@wdio/cucumber-framework";
import logger from "../../helper/logger.js";
//import chai from "chai";

Given(/^I navigate to google$/, async function(){
   
    logger.info(`>> Starting the execution.`)
     // @ts-ignore
    await browser.url(browser.options.url)
    this.appId = await browser.getTitle();
    await browser.pause(1000)
})

When(/^I search for (.*)$/, async function(searchItem){
    let ele = await $('[name=q]')
    await ele.click()
    await ele.setValue(searchItem)
    await browser.keys("Enter")
    console.log(`>> BROWSER TITLE: ${this.appId}`)
})

Then(/^I click on the first result$/, async function(){
    let ele = await $('<h3>')
    await ele.click()
})

Then(/^I validate the URL to be (.*)$/, async function(expextedURL){
    let url = await browser.getUrl()
    //chai.expect(url).to.equal(expextedURL)
    expect(url).toBe(expextedURL)
})