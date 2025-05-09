Feature: Get User API

  Scenario: Get User Details - Success
    Given I send a GET request to "https://api.example.com/users/1"
    Then the response status should be 200
    And the response body should contain "id"
    And the response body should contain "name"

  Scenario: Get User Details - Bad Request (400)
    Given I send a GET request to "https://api.example.com/users/invalid_id"
    Then the response status should be 400
    And the response body should contain "error"

  Scenario: Get User Details - Unauthorized (401)
    Given I send a GET request to "https://api.example.com/users/1" with authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "error"

  Scenario: Get User Details - Forbidden (403)
    Given I send a GET request to "https://api.example.com/users/1" with authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "error"

Feature: Create User API

  Scenario: Create User - Success
    Given I send a POST request to "https://api.example.com/users" with body:
    """
    {"name": "John Doe", "email": "john@example.com", "role": "user"}
    """
    And I set headers "Content-Type: application/json" and "Authorization: Bearer valid_token"
    Then the response status should be 200
    And the response body should contain "id"

  Scenario: Create User - Bad Request (400)
    Given I send a POST request to "https://api.example.com/users" with body:
    """
    {"name": "", "email": "john@example.com", "role": "user"}
    """
    And I set headers "Content-Type: application/json" and "Authorization: Bearer valid_token"
    Then the response status should be 400
    And the response body should contain "error"

  Scenario: Create User - Unauthorized (401)
    Given I send a POST request to "https://api.example.com/users" with body:
    """
    {"name": "John Doe", "email": "john@example.com", "role": "user"}
    """
    Then the response status should be 401
    And the response body should contain "error"

  Scenario: Create User - Forbidden (403)
    Given I send a POST request to "https://api.example.com/users" with body:
    """
    {"name": "John Doe", "email": "john@example.com", "role": "user"}
    """
    And I set headers "Content-Type: application/json" and "Authorization: Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "error"

Feature: List Products API

  Scenario: List Products - Success
    Given I send a GET request to "https://api.example.com/products"
    Then the response status should be 200
    And the response body should contain "products"

  Scenario: List Products - Unauthorized (401)
    Given I send a GET request to "https://api.example.com/products" with authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "error"

  Scenario: List Products - Forbidden (403)
    Given I send a GET request to "https://api.example.com/products" with authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "error"