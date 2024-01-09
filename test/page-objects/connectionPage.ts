import Page from "./page.js";

class Connection extends Page{
    constructor(){
        super();
    }

    //Page Objects
    //get sourceJSQA(){return $('//span[contains(text(),"JSQA")]/parent::div')}
    sourceElement = '//span[contains(text(),"?")]/parent::div/parent::div/parent::a'


    //Page Actions
    async selectSource(sourceName:string){
        try {
            let ele = this.sourceElement.replace(/\?/,sourceName);
            let webElement = await browser.$(ele);
            await this.clickAction(await webElement);
        }catch(err){
            err.message = `Error While clicking source, ${err.message}`
            throw err;
        }
    }
}

export default new Connection();
