Feature: Demo Feature

    @demo
    Scenario Outline: Demo Scenario
        Given I navigate to google
        When I search for <searchItem>
        Then I click on the first result
        Then I validate the URL to be <expectedURL>

        Examples:
            | TC_ID  | searchItem | expectedURL           |
            | TC_001 | WDIO       | https://webdriver.io// |

