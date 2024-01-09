import Page from "./page.js";

class Sources extends Page{
    constructor(){
        super();
    }

    //Page Objects
    get buttonAddDestination(){return $('//span[contains(text(),"Add Destination")]')}
    get tabOverview(){return $('//div[contains(text(),"Overview")]')}
    get textDestination(){return $('//*[id="members-table"]//table/tbody//tr')}
    get textUseExistingDestination(){ return $('//span[contains(text(),"Use Existing Destination")]')}
    selectExistingDestination = '//div[contains(text(),"?")]//..//..//..//td[1]'
    get btnContinue() {return $('//span[contains(text(),"Continue")]')}
    textCheckDestinationEnabled = '//div[contains(text(),"?")]//..//..//..//td//div[contains(text(),"Enabled")]'


    //Page Actions
    async checkForDestinationConnection(){
        try{
            await (await this.tabOverview).waitForDisplayed({timeout: 5000});
            await this.clickAction(await this.tabOverview)
            if (await (await this.textDestination).isDisplayed()){
                return true
            }else {
                return false
            }
        }catch(err){
            err.message = `Error while trying to validate destination connections,${err.message}`
        }
    }

    async clickAddExistingDestination(){
        try {
            await this.clickAction(await this.buttonAddDestination)
            await this.clickAction(await this.textUseExistingDestination)
        }catch(err){
            err.message = `Error while trying to click add destination button,${err.message}`
        }
    }

    async selectExstingDestination(exisingDestination: string){
        try {
            let elementPath = this.selectExistingDestination.replace(/\?/, exisingDestination);
            let wdioElement = await browser.$(elementPath);

            await this.clickAction(await wdioElement);
            await this.clickAction(await this.btnContinue);
            await this.clickAction(await this.btnContinue);
        } catch (err) {
            err.message = `Error while trying to add existing destination,${err.message}`
        }

    }

    async checkDestinationIsEnabled(exisingDestination: string){
        try {
            let elementPath = this.textCheckDestinationEnabled.replace(/\?/, exisingDestination);
            let wdioElement = await browser.$(elementPath);

            await wdioElement.waitForDisplayed({timeout: 10000});
            if(await wdioElement.isDisplayed()){
                return true
            }else{
                return false
            }
        } catch (err) {
            err.message = `Error while trying to connect existing destination,${err.message}`
        }
    }
}

export default new Sources();