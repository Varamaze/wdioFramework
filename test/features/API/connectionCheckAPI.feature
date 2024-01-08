Feature: Connection Check Using API

    @smoke
    Scenario Outline: Checking for connection from backend
        Given User logs in rudderstack using API and gets auth token
        Then User sends a GET request to <sources> and validates <sourceName> is present
        Then User sends a POST request to <addSources> and a creates a source with name <addSourceName>

        Examples:
            | sources            | sourceName | addSourceName | addSources |
            | SOURCES_DEFINITION | Node       | Test9         | ADD_SOURCE |