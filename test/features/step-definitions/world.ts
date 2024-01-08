import { setWorldConstructor } from "@wdio/cucumber-framework";

class WorldVariables {
    sourceId: string
    constructor() {
        this.sourceId = ""
    }
}
setWorldConstructor(WorldVariables)