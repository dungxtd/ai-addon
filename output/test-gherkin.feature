Feature: Get User API

  Scenario: Successful Request
    Given I have a valid token
    When I send a GET request to "/users"
    Then the response status code should be 200
    And the response body should contain user details

  Scenario: Bad Request
    Given I have an invalid request
    When I send a GET request to "/users"
    Then the response status code should be 400
    And the response body should contain an error message

  Scenario: Unauthorized
    Given I have an invalid token
    When I send a GET request to "/users"
    Then the response status code should be 401
    And the response body should contain "Unauthorized" message

  Scenario: Forbidden
    Given I do not have required permissions
    When I send a GET request to "/users"
    Then the response status code should be 403
    And the response body should contain "Forbidden" message
```