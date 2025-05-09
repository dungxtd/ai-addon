Feature: User API

  Scenario: Get all users - Success
    Given I send a GET request to "/users"
    Then the response status should be 200
    And the response body should be an array
    And the response body should contain at least 1 element
    And each element in the response body should contain "id"
    And each element in the response body should contain "name"
    And each element in the response body should contain "email"
    And each element in the response body should contain "role"

  Scenario: Get all users with limit - Success
    Given I send a GET request to "/users?limit=5"
    Then the response status should be 200
    And the response body should be an array
    And the response body should have at most 5 elements

  Scenario: Get all users with offset - Success
    Given I send a GET request to "/users?offset=2"
    Then the response status should be 200
    And the response body should be an array

  Scenario: Get all users with limit and offset - Success
    Given I send a GET request to "/users?limit=3&offset=1"
    Then the response status should be 200
    And the response body should be an array
    And the response body should have at most 3 elements

  Scenario: Get all users - Unauthorized (401)
    Given I set the Authorization header to "Bearer invalid_token"
    And I send a GET request to "/users"
    Then the response status should be 401
    And the response body should contain "Unauthorized"

  Scenario: Get all users - Forbidden (403)
    Given I set the Authorization header to "Bearer forbidden_token"
    And I send a GET request to "/users"
    Then the response status should be 403
    And the response body should contain "Forbidden"

  Scenario: Create a new user - Success
    Given I set the request body to:
      """
      {
        "name": "New User",
        "email": "new@example.com",
        "password": "password",
        "role": "user"
      }
      """
    When I send a POST request to "/users"
    Then the response status should be 201
    And the response body should contain "id"
    And the response body should contain "name": "New User"
    And the response body should contain "email": "new@example.com"
    And the response body should contain "role": "user"

  Scenario: Create a new user - Bad Request (400) - Missing name
    Given I set the request body to:
      """
      {
        "email": "new@example.com",
        "password": "password",
        "role": "user"
      }
      """
    When I send a POST request to "/users"
    Then the response status should be 400
    And the response body should contain "Invalid input"

  Scenario: Create a new user - Unauthorized (401)
    Given I set the Authorization header to "Bearer invalid_token"
    And I set the request body to:
      """
      {
        "name": "New User",
        "email": "new@example.com",
        "password": "password",
        "role": "user"
      }
      """
    When I send a POST request to "/users"
    Then the response status should be 401
    And the response body should contain "Unauthorized"

  Scenario: Create a new user - Forbidden (403)
    Given I set the Authorization header to "Bearer forbidden_token"
    And I set the request body to:
      """
      {
        "name": "New User",
        "email": "new@example.com",
        "password": "password",
        "role": "user"
      }
      """
    When I send a POST request to "/users"
    Then the response status should be 403
    And the response body should contain "Forbidden"

  Scenario: Get user by ID - Success
    Given I send a GET request to "/users/1"
    Then the response status should be 200
    And the response body should contain "id": 1
    And the response body should contain "name"
    And the response body should contain "email"
    And the response body should contain "role"

  Scenario: Get user by ID - Bad Request (400) - Invalid ID
    Given I send a GET request to "/users/invalid_id"
    Then the response status should be 400
    And the response body should contain "Invalid ID supplied"

  Scenario: Get user by ID - Not Found (404)
    Given I send a GET request to "/users/999"
    Then the response status should be 404
    And the response body should contain "User not found"

  Scenario: Get user by ID - Unauthorized (401)
    Given I set the Authorization header to "Bearer invalid_token"
    And I send a GET request to "/users/1"
    Then the response status should be 401
    And the response body should contain "Unauthorized"

  Scenario: Get user by ID - Forbidden (403)
    Given I set the Authorization header to "Bearer forbidden_token"
    And I send a GET request to "/users/1"
    Then the response status should be 403
    And the response body should contain "Forbidden"

  Scenario: Update user - Success
    Given I set the request body to:
      """
      {
        "name": "Updated User",
        "email": "updated@example.com",
        "password": "newpassword",
        "role": "admin"
      }
      """
    When I send a PUT request to "/users/1"
    Then the response status should be 200
    And the response body should contain "id": 1
    And the response body should contain "name": "Updated User"
    And the response body should contain "email": "updated@example.com"
    And the response body should contain "role": "admin"

  Scenario: Update user - Bad Request (400) - Invalid input
    Given I set the request body to:
      """
      {
        "email": "updated@example.com",
        "password": "newpassword",
        "role": "admin"
      }
      """
    When I send a PUT request to "/users/1"
    Then the response status should be 400
    And the response body should contain "Invalid input"

  Scenario: Update user - Not Found (404)
    Given I set the request body to:
      """
      {
        "name": "Updated User",
        "email": "updated@example.com",
        "password": "newpassword",
        "role": "admin"
      }
      """
    When I send a PUT request to "/users/999"
    Then the response status should be 404
    And the response body should contain "User not found"

  Scenario: Update user - Unauthorized (401)
    Given I set the Authorization header to "Bearer invalid_token"
    And I set the request body to:
      """
      {
        "name": "Updated User",
        "email": "updated@example.com",
        "password": "newpassword",
        "role": "admin"
      }
      """
    When I send a PUT request to "/users/1"
    Then the response status should be 401
    And the response body should contain "Unauthorized"

  Scenario: Update user - Forbidden (403)
    Given I set the Authorization header to "Bearer forbidden_token"
    And I set the request body to:
      """
      {
        "name": "Updated User",
        "email": "updated@example.com",
        "password": "newpassword",
        "role": "admin"
      }
      """
    When I send a PUT request to "/users/1"
    Then the response status should be 403
    And the response body should contain "Forbidden"

  Scenario: Delete user - Success
    Given I send a DELETE request to "/users/1"
    Then the response status should be 204

  Scenario: Delete user - Bad Request (400) - Invalid ID
    Given I send a DELETE request to "/users/invalid_id"
    Then the response status should be 400
    And the response body should contain "Invalid ID supplied"

  Scenario: Delete user - Not Found (404)
    Given I send a DELETE request to "/users/999"
    Then the response status should be 404
    And the response body should contain "User not found"

  Scenario: Delete user - Unauthorized (401)
    Given I set the Authorization header to "Bearer invalid_token"
    And I send a DELETE request to "/users/1"
    Then the response status should be 401
    And the response body should contain "Unauthorized"

  Scenario: Delete user - Forbidden (403)
    Given I set the Authorization header to "Bearer forbidden_token"
    And I send a DELETE request to "/users/1"
    Then the response status should be 403
    And the response body should contain "Forbidden"