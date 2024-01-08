export default class Page {
    constructor(){

    }

    async navigateTo(path: string){
        await browser.url(path)
        await browser.maximizeWindow()
    }

    async clickAction(ele: WebdriverIO.Element){
        await $(ele).waitForClickable({timeout: 5000})
        await $(ele).click();
    }

    async sendText(ele: WebdriverIO.Element, text: string){
        await $(ele).waitForDisplayed({timeout: 5000})
        await $(ele).setValue(text)
    }
}