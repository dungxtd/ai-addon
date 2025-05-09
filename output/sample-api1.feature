Feature: Get User API

  Scenario: Get User Details - Success
    Given I send a GET request to "https://api.example.com/users/1" with authorization "Bearer valid_token"
    Then the response status should be 200
    And the response body should contain "id"
    And the response body should contain "name"
    And the response body should contain "email"

  Scenario: Get User Details - Bad Request (400) - Invalid User ID
    Given I send a GET request to "https://api.example.com/users/invalid_id" with authorization "Bearer valid_token"
    Then the response status should be 400
    And the response body should contain "error"
    And the response body should contain "Invalid User ID format"

  Scenario: Get User Details - Unauthorized (401) - Missing Token
    Given I send a GET request to "https://api.example.com/users/1"
    Then the response status should be 401
    And the response body should contain "error"
    And the response body should contain "Unauthorized"

  Scenario: Get User Details - Unauthorized (401) - Invalid Token
    Given I send a GET request to "https://api.example.com/users/1" with authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "error"
    And the response body should contain "Invalid Token"

  Scenario: Get User Details - Forbidden (403)
    Given I send a GET request to "https://api.example.com/users/1" with authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "error"
    And the response body should contain "Forbidden"

Feature: Create User API

  Scenario: Create User - Success
    Given I send a POST request to "https://api.example.com/users" with body
      """
      {
        "name": "New User",
        "email": "newuser@example.com",
        "role": "editor"
      }
      """
    And I set header "Content-Type" to "application/json"
    And I send the request with authorization "Bearer valid_token"
    Then the response status should be 200
    And the response body should contain "id"
    And the response body should contain "name"
    And the response body should contain "email"
    And the response body should contain "role"

  Scenario: Create User - Bad Request (400) - Missing Email
    Given I send a POST request to "https://api.example.com/users" with body
      """
      {
        "name": "New User",
        "role": "editor"
      }
      """
    And I set header "Content-Type" to "application/json"
    And I send the request with authorization "Bearer valid_token"
    Then the response status should be 400
    And the response body should contain "error"
    And the response body should contain "Email is required"

  Scenario: Create User - Bad Request (400) - Invalid Email
    Given I send a POST request to "https://api.example.com/users" with body
      """
      {
        "name": "New User",
        "email": "invalid-email",
        "role": "editor"
      }
      """
    And I set header "Content-Type" to "application/json"
    And I send the request with authorization "Bearer valid_token"
    Then the response status should be 400
    And the response body should contain "error"
    And the response body should contain "Invalid email format"

  Scenario: Create User - Unauthorized (401) - Missing Token
    Given I send a POST request to "https://api.example.com/users" with body
      """
      {
        "name": "New User",
        "email": "newuser@example.com",
        "role": "editor"
      }
      """
    And I set header "Content-Type" to "application/json"
    Then the response status should be 401
    And the response body should contain "error"
    And the response body should contain "Unauthorized"

  Scenario: Create User - Unauthorized (401) - Invalid Token
    Given I send a POST request to "https://api.example.com/users" with body
      """
      {
        "name": "New User",
        "email": "newuser@example.com",
        "role": "editor"
      }
      """
    And I set header "Content-Type" to "application/json"
    And I send the request with authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "error"
    And the response body should contain "Invalid Token"

  Scenario: Create User - Forbidden (403)
    Given I send a POST request to "https://api.example.com/users" with body
      """
      {
        "name": "New User",
        "email": "newuser@example.com",
        "role": "editor"
      }
      """
    And I set header "Content-Type" to "application/json"
    And I send the request with authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "error"
    And the response body should contain "Forbidden"

Feature: List Products API

  Scenario: List Products - Success
    Given I send a GET request to "https://api.example.com/products"
    Then the response status should be 200
    And the response body should contain "products"
    And the response body should be an array

  Scenario: List Products - Unauthorized (401) - Invalid Token
    Given I send a GET request to "https://api.example.com/products" with authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "error"
    And the response body should contain "Unauthorized"

  Scenario: List Products - Forbidden (403)
    Given I send a GET request to "https://api.example.com/products" with authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "error"
    And the response body should contain "Forbidden"