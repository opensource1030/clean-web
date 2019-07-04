import { Step, BeforeScenario, AfterScenario } from "gauge-ts";
import { openBrowser, goto, closeBrowser } from "taiko";

export default class BaseStepDefinition {

    @BeforeScenario()
    public async specSetup() {
        await openBrowser({
            headless: false
        });
        console.log("Setup needs to done before running the Scenario");
    }

    @AfterScenario()
    public async specCleanUp() {
        await closeBrowser();
    }

    @Step("Navigate to <url>")
    public async navigateToUrl(url: string) {
        await goto(url);
    }

}
