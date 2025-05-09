Feature: Get All Users API

  Scenario: Get All Users - Success
    Given I send a GET request to "/users"
    Then the response status should be 200
    And the response body should be an array
    And the response body should contain user details like "id", "name", "email", "role"

  Scenario: Get All Users - Unauthorized (401)
    Given I send a GET request to "/users" with authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "message": "Unauthorized"

  Scenario: Get All Users - Forbidden (403)
    Given I send a GET request to "/users" with authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "message": "Forbidden"

Feature: Create a New User API

  Scenario: Create New User - Success
    Given I send a POST request to "/users" with body {"name": "John Doe", "email": "john@example.com", "password": "password123", "role": "user"}
    Then the response status should be 201
    And the response body should contain "id", "name", "email", "role"

  Scenario: Create New User - Bad Request (400)
    Given I send a POST request to "/users" with body {"email": "john@example.com"}
    Then the response status should be 400
    And the response body should contain "message": "Invalid input"

  Scenario: Create New User - Unauthorized (401)
    Given I send a POST request to "/users" with body {"name": "John Doe", "email": "john@example.com", "password": "password123", "role": "user"} and authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "message": "Unauthorized"

  Scenario: Create New User - Forbidden (403)
    Given I send a POST request to "/users" with body {"name": "John Doe", "email": "john@example.com", "password": "password123", "role": "user"} and authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "message": "Forbidden"

Feature: Get User by ID API

  Scenario: Get User by ID - Success
    Given I send a GET request to "/users/1"
    Then the response status should be 200
    And the response body should contain "id", "name", "email", "role"

  Scenario: Get User by ID - Bad Request (400)
    Given I send a GET request to "/users/invalid_id"
    Then the response status should be 400
    And the response body should contain "message": "Invalid ID supplied"

  Scenario: Get User by ID - Unauthorized (401)
    Given I send a GET request to "/users/1" with authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "message": "Unauthorized"

  Scenario: Get User by ID - Forbidden (403)
    Given I send a GET request to "/users/1" with authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "message": "Forbidden"

Feature: Update User API

  Scenario: Update User - Success
    Given I send a PUT request to "/users/1" with body {"name": "John Doe Updated", "email": "john.updated@example.com", "password": "newpassword123", "role": "admin"}
    Then the response status should be 200
    And the response body should contain "id", "name", "email", "role"

  Scenario: Update User - Bad Request (400)
    Given I send a PUT request to "/users/1" with body {"email": "john.updated@example.com"}
    Then the response status should be 400
    And the response body should contain "message": "Invalid input"

  Scenario: Update User - Unauthorized (401)
    Given I send a PUT request to "/users/1" with body {"name": "John Doe Updated", "email": "john.updated@example.com", "password": "newpassword123", "role": "admin"} and authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "message": "Unauthorized"

  Scenario: Update User - Forbidden (403)
    Given I send a PUT request to "/users/1" with body {"name": "John Doe Updated", "email": "john.updated@example.com", "password": "newpassword123", "role": "admin"} and authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "message": "Forbidden"

Feature: Delete User API

  Scenario: Delete User - Success
    Given I send a DELETE request to "/users/1"
    Then the response status should be 204

  Scenario: Delete User - Bad Request (400)
    Given I send a DELETE request to "/users/invalid_id"
    Then the response status should be 400
    And the response body should contain "message": "Invalid ID supplied"

  Scenario: Delete User - Unauthorized (401)
    Given I send a DELETE request to "/users/1" with authorization "Bearer invalid_token"
    Then the response status should be 401
    And the response body should contain "message": "Unauthorized"

  Scenario: Delete User - Forbidden (403)
    Given I send a DELETE request to "/users/1" with authorization "Bearer forbidden_token"
    Then the response status should be 403
    And the response body should contain "message": "Forbidden"