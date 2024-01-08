import Page from "./page.js";

class HomePage extends Page{

    constructor(){
        super()
    }

    //Home Page Objects
    get logoHomePage(){return $('//div[contains(@class,"header_logo")]')}

    //Action
    async validateHomePageLogo(){
        try {
            await this.logoHomePage.waitForDisplayed({timeout: 10000});
        }catch (err){
            err.message = `Unable to validate home page logo. ${err.message}`
        }
        
    }
}

export default new HomePage()