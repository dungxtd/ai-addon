# API Test - Get all users

## Scenario: Get all users - Success
* Call GET "/users"
* Verify response status is 200
* Verify response body is an array
* Verify response body contains at least 1 element
* Verify each element in response body contains "id"
* Verify each element in response body contains "name"
* Verify each element in response body contains "email"
* Verify each element in response body contains "role"

## Scenario: Get all users with limit - Success
* Call GET "/users?limit=5"
* Verify response status is 200
* Verify response body is an array
* Verify response body has at most 5 elements

## Scenario: Get all users with offset - Success
* Call GET "/users?offset=2"
* Verify response status is 200
* Verify response body is an array

## Scenario: Get all users with limit and offset - Success
* Call GET "/users?limit=3&offset=1"
* Verify response status is 200
* Verify response body is an array
* Verify response body has at most 3 elements

## Scenario: Get all users - Unauthorized (401)
* Set Authorization header "Bearer invalid_token"
* Call GET "/users"
* Verify response status is 401
* Verify response body contains "Unauthorized"

## Scenario: Get all users - Forbidden (403)
* Set Authorization header "Bearer forbidden_token"
* Call GET "/users"
* Verify response status is 403
* Verify response body contains "Forbidden"

# API Test - Create a new user

## Scenario: Create a new user - Success
* Set request body to:
  """
  {
    "name": "New User",
    "email": "new@example.com",
    "password": "password",
    "role": "user"
  }
  """
* Call POST "/users"
* Verify response status is 201
* Verify response body contains "id"
* Verify response body contains "name": "New User"
* Verify response body contains "email": "new@example.com"
* Verify response body contains "role": "user"

## Scenario: Create a new user - Bad Request (400) - Missing name
* Set request body to:
  """
  {
    "email": "new@example.com",
    "password": "password",
    "role": "user"
  }
  """
* Call POST "/users"
* Verify response status is 400
* Verify response body contains "Invalid input"

## Scenario: Create a new user - Unauthorized (401)
* Set Authorization header "Bearer invalid_token"
* Set request body to:
  """
  {
    "name": "New User",
    "email": "new@example.com",
    "password": "password",
    "role": "user"
  }
  """
* Call POST "/users"
* Verify response status is 401
* Verify response body contains "Unauthorized"

## Scenario: Create a new user - Forbidden (403)
* Set Authorization header "Bearer forbidden_token"
* Set request body to:
  """
  {
    "name": "New User",
    "email": "new@example.com",
    "password": "password",
    "role": "user"
  }
  """
* Call POST "/users"
* Verify response status is 403
* Verify response body contains "Forbidden"

# API Test - Get user by ID

## Scenario: Get user by ID - Success
* Call GET "/users/1"
* Verify response status is 200
* Verify response body contains "id": 1
* Verify response body contains "name"
* Verify response body contains "email"
* Verify response body contains "role"

## Scenario: Get user by ID - Bad Request (400) - Invalid ID
* Call GET "/users/invalid_id"
* Verify response status is 400
* Verify response body contains "Invalid ID supplied"

## Scenario: Get user by ID - Not Found (404)
* Call GET "/users/999"
* Verify response status is 404
* Verify response body contains "User not found"

## Scenario: Get user by ID - Unauthorized (401)
* Set Authorization header "Bearer invalid_token"
* Call GET "/users/1"
* Verify response status is 401
* Verify response body contains "Unauthorized"

## Scenario: Get user by ID - Forbidden (403)
* Set Authorization header "Bearer forbidden_token"
* Call GET "/users/1"
* Verify response status is 403
* Verify response body contains "Forbidden"

# API Test - Update user

## Scenario: Update user - Success
* Set request body to:
  """
  {
    "name": "Updated User",
    "email": "updated@example.com",
    "password": "newpassword",
    "role": "admin"
  }
  """
* Call PUT "/users/1"
* Verify response status is 200
* Verify response body contains "id": 1
* Verify response body contains "name": "Updated User"
* Verify response body contains "email": "updated@example.com"
* Verify response body contains "role": "admin"

## Scenario: Update user - Bad Request (400) - Invalid input
* Set request body to:
  """
  {
    "email": "updated@example.com",
    "password": "newpassword",
    "role": "admin"
  }
  """
* Call PUT "/users/1"
* Verify response status is 400
* Verify response body contains "Invalid input"

## Scenario: Update user - Not Found (404)
* Set request body to:
  """
  {
    "name": "Updated User",
    "email": "updated@example.com",
    "password": "newpassword",
    "role": "admin"
  }
  """
* Call PUT "/users/999"
* Verify response status is 404
* Verify response body contains "User not found"

## Scenario: Update user - Unauthorized (401)
* Set Authorization header "Bearer invalid_token"
* Set request body to:
  """
  {
    "name": "Updated User",
    "email": "updated@example.com",
    "password": "newpassword",
    "role": "admin"
  }
  """
* Call PUT "/users/1"
* Verify response status is 401
* Verify response body contains "Unauthorized"

## Scenario: Update user - Forbidden (403)
* Set Authorization header "Bearer forbidden_token"
* Set request body to:
  """
  {
    "name": "Updated User",
    "email": "updated@example.com",
    "password": "newpassword",
    "role": "admin"
  }
  """
* Call PUT "/users/1"
* Verify response status is 403
* Verify response body contains "Forbidden"

# API Test - Delete user

## Scenario: Delete user - Success
* Call DELETE "/users/1"
* Verify response status is 204

## Scenario: Delete user - Bad Request (400) - Invalid ID
* Call DELETE "/users/invalid_id"
* Verify response status is 400
* Verify response body contains "Invalid ID supplied"

## Scenario: Delete user - Not Found (404)
* Call DELETE "/users/999"
* Verify response status is 404
* Verify response body contains "User not found"

## Scenario: Delete user - Unauthorized (401)
* Set Authorization header "Bearer invalid_token"
* Call DELETE "/users/1"
* Verify response status is 401
* Verify response body contains "Unauthorized"

## Scenario: Delete user - Forbidden (403)
* Set Authorization header "Bearer forbidden_token"
* Call DELETE "/users/1"
* Verify response status is 403
* Verify response body contains "Forbidden"