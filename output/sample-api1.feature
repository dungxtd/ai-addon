Feature: Sample API Collection

  Scenario: Get User - Successful Request
    Given I set header "Authorization" to "Bearer valid_token"
    When I send a GET request to "https://api.example.com/users/123"
    Then the response status should be 200

  Scenario: Get User - Bad Request
    Given I set header "Authorization" to "Bearer valid_token"
    When I send a GET request to "https://api.example.com/users/invalid_id"
    Then the response status should be 400

  Scenario: Get User - Unauthorized
    Given I set header "Authorization" to ""
    When I send a GET request to "https://api.example.com/users/123"
    Then the response status should be 401

  Scenario: Get User - Forbidden
    Given I set header "Authorization" to "Bearer restricted_token"
    When I send a GET request to "https://api.example.com/users/123"
    Then the response status should be 403

  Scenario: Create User - Successful Request
    Given I set headers "Content-Type" to "application/json" and "Authorization" to "Bearer valid_token"
    And I set request body to {"name": "John Doe", "email": "john@example.com", "role": "user"}
    When I send a POST request to "https://api.example.com/users"
    Then the response status should be 200

  Scenario: Create User - Bad Request
    Given I set headers "Content-Type" to "application/json" and "Authorization" to "Bearer valid_token"
    And I set request body to {"name": "", "email": "john@example.com", "role": "user"}
    When I send a POST request to "https://api.example.com/users"
    Then the response status should be 400

  Scenario: Create User - Unauthorized
    Given I set headers "Content-Type" to "application/json" and "Authorization" to ""
    And I set request body to {"name": "John Doe", "email": "john@example.com", "role": "user"}
    When I send a POST request to "https://api.example.com/users"
    Then the response status should be 401

  Scenario: Create User - Forbidden
    Given I set headers "Content-Type" to "application/json" and "Authorization" to "Bearer restricted_token"
    And I set request body to {"name": "John Doe", "email": "john@example.com", "role": "user"}
    When I send a POST request to "https://api.example.com/users"
    Then the response status should be 403

  Scenario: List Products - Successful Request
    When I send a GET request to "https://api.example.com/products"
    Then the response status should be 200

  Scenario: List Products - Bad Request
    When I send a GET request to "https://api.example.com/products?invalid_param"
    Then the response status should be 400

  Scenario: List Products - Unauthorized
    Given I set header "Authorization" to ""
    When I send a GET request to "https://api.example.com/products"
    Then the response status should be 401

  Scenario: List Products - Forbidden
    Given I set header "Authorization" to "Bearer restricted_token"
    When I send a GET request to "https://api.example.com/products"
    Then the response status should be 403