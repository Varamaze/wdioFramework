Feature: Check if connection exist between source and destination

    
    Scenario: Login to application and check if connection exist
        Given User navigates to Rudderstack login page
        Then User enters username, password and clicks login button
        Then User validates if home page is displayed