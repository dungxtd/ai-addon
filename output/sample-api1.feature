Feature: Get User API

  Scenario: Get User Details - Success
    Given I send a GET request to "https://api.example.com/users/123" with header "Authorization: Bearer valid_token"
    Then the response status should be 200
    And the response body should contain "id"
    And the response body should contain "name"
    And the response body should contain "email"

  Scenario: Get User Details - Bad Request (400)
    Given I send a GET request to "https://api.example.com/users/invalid_id" with header "Authorization: Bearer valid_token"
    Then the response status should be 400
    And the response body should contain "error"

  Scenario: Get User Details - Unauthorized (401)
    Given I send a GET request to "https://api.example.com/users/123"
    Then the response status should be 401
    And the response body should contain "error"

  Scenario: Get User Details - Forbidden (403)
    Given I send a GET request to "https://api.example.com/users/123" with header "Authorization: Bearer insufficient_permissions_token"
    Then the response status should be 403
    And the response body should contain "error"

Feature: Create User API

  Scenario: Create User - Success
    Given I set the request body to
    ```
{
      "name": "New User",
      "email": "newuser@example.com",
      "role": "editor"
    }
```
    When I send a POST request to "https://api.example.com/users" with header "Authorization: Bearer valid_token" and header "Content-Type: application/json"
    Then the response status should be 201
    And the response body should contain "id"
    And the response body should contain "name"
    And the response body should contain "email"
    And the response body should contain "role"

  Scenario: Create User - Bad Request (400) - Invalid Email
    Given I set the request body to
    ```
{
      "name": "New User",
      "email": "invalid_email",
      "role": "editor"
    }
```
    When I send a POST request to "https://api.example.com/users" with header "Authorization: Bearer valid_token" and header "Content-Type: application/json"
    Then the response status should be 400
    And the response body should contain "error"

  Scenario: Create User - Unauthorized (401)
    Given I set the request body to
    ```
{
      "name": "New User",
      "email": "newuser@example.com",
      "role": "editor"
    }
```
    When I send a POST request to "https://api.example.com/users" with header "Content-Type: application/json"
    Then the response status should be 401
    And the response body should contain "error"

  Scenario: Create User - Forbidden (403)
    Given I set the request body to
    ```
{
      "name": "New User",
      "email": "newuser@example.com",
      "role": "editor"
    }
```
    When I send a POST request to "https://api.example.com/users" with header "Authorization: Bearer insufficient_permissions_token" and header "Content-Type: application/json"
    Then the response status should be 403
    And the response body should contain "error"

Feature: List Products API

  Scenario: List Products - Success
    Given I send a GET request to "https://api.example.com/products"
    Then the response status should be 200
    And the response body should be an array
    And the response body should not be empty

  Scenario: List Products - Unauthorized (401) - If authentication is expected for products list
    Given I send a GET request to "https://api.example.com/products" with header "Authorization: Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "error"

  Scenario: List Products - Forbidden (403) - If certain role is needed
    Given I send a GET request to "https://api.example.com/products" with header "Authorization: Bearer insufficient_permissions_token"
    Then the response status should be 403
    And the response body should contain "error"

  Scenario: List Products - Bad Request (400) - If Query Parameter is missing or invalid.
    Given I send a GET request to "https://api.example.com/products?invalid_parameter=123"
    Then the response status should be 400
    And the response body should contain "error"