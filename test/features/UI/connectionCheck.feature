Feature: Check if connection exist between source and destination

    @smoke
    Scenario Outline: Login to application and check if no connection exist
        Given User navigates to Rudderstack login page
        Then User enters username, password and clicks login button
        Then User validates if home page is displayed
        When User clicks on the <sourceName> source from connections page
        Then User validate if destination exist to be false

        Examples:
            | sourceName |
            | JSQA       |

    @smoke
    Scenario Outline: Create a new connection between source and destination
        Given User clicks on the Add Destination button
        When User selects the <existingDestination> existing destination
        Then User validates if <existingDestination> is connected to source

        Examples:
            | existingDestination |
            | S3QA                |
