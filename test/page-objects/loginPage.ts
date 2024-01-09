import Page from "./page.js";

class LoginPage extends Page {
    constructor() {
        super()
    }

    //Page Objects
    get inputBoxUserName() { return $('//input[@id="text-input-email"]') }
    get inputBoxPassword() { return $('//input[@id="text-input-password"]') }
    get buttonLogin() { return $('//button/span[contains(text(),"Log in")]') }
    get linkSkipMFA(){ return $('//a[@href="/addmfalater"]')}
    get buttonGoToDashboard(){ return $('//span[contains(text(),"Go to dashboard")]/parent::button')}

    //Actions
    /*
        Method name: setUserName
        Description: Sets value into username text box
        Author: Varajith
    */
    async setUserName(username: string) {
        if (!username) throw Error(`Given username is not valid. ${username}`)
        try {
            username = username.trim();
            await this.sendText(await this.inputBoxUserName, username)
        } catch (err) {
            err.message = `Error while trying to enter username: ${username}, ${err.message}`
            throw err
        }
    }
    /*
        Method name: setPassword
        Description: Sets value into password text box
        Author: Varajith
    */
    async setPassword(password: string) {
        if (!password) throw Error(`Given password is not valid.`)
        try {
            await this.sendText(await this.inputBoxPassword, password)
        } catch (err) {
            err.message = `Error while trying to enter password, ${err.message}`
            throw err
        }
    }

    /*
       Method name: clickLogin
       Description: clicks the login button
       Author: Varajith
   */
    async clickLogin() {
        try {
            await this.clickAction(await this.buttonLogin)
        } catch (err) {
            err.message = `Error while trying to click login button, ${err.message}`
            throw err
        }
    }

    async skipMFA(){
        try{
            await (await this.linkSkipMFA).waitForDisplayed({timeout: 5000})
            if (await (await this.linkSkipMFA).isDisplayed()){
                await this.clickAction(await this.linkSkipMFA)
            }
        } catch(err){
            err.message = `Error while looking for skip MFA link, ${err.message}`
        }
    }

    async goToDashBoard(){
        try {
            await (await this.buttonGoToDashboard).waitForDisplayed({timeout: 5000})
            if(await (await this.buttonGoToDashboard).isDisplayed()){
                await this.clickAction(await this.buttonGoToDashboard)
            }
        }catch(err){
            err.message = `Error while looking for Go to dashboard button, ${err.message}`
        }
    }

    /*
        Method name: login
        Description: Enter userid, password and click login button
        Author: Varajith
    */
    async login(username: string, password: string) {
        try {
            await this.setUserName(username);
            await this.setPassword(password);
            await this.clickLogin();
            await this.skipMFA();
            await this.goToDashBoard();
        } catch (err) {
            err.message = `Error while trying to login, ${err.message}`
            throw err
        }
    }
}

export default new LoginPage()