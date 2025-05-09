# API Test - Get All Users

## Scenario: Get All Users - Success
* Call GET "/users"
* Verify response status is 200
* Verify response body is an array
* Verify response body contains user details like "id", "name", "email", "role"

## Scenario: Get All Users - Unauthorized (401)
* Call GET "/users"
* Set Authorization header "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "message": "Unauthorized"

## Scenario: Get All Users - Forbidden (403)
* Call GET "/users"
* Set Authorization header "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "message": "Forbidden"

# API Test - Create a New User

## Scenario: Create New User - Success
* Call POST "/users" with body {"name": "John Doe", "email": "john@example.com", "password": "password123", "role": "user"}
* Verify response status is 201
* Verify response body contains "id", "name", "email", "role"

## Scenario: Create New User - Bad Request (400)
* Call POST "/users" with body {"email": "john@example.com"}
* Verify response status is 400
* Verify response body contains "message": "Invalid input"

## Scenario: Create New User - Unauthorized (401)
* Call POST "/users" with body {"name": "John Doe", "email": "john@example.com", "password": "password123", "role": "user"}
* Set Authorization header "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "message": "Unauthorized"

## Scenario: Create New User - Forbidden (403)
* Call POST "/users" with body {"name": "John Doe", "email": "john@example.com", "password": "password123", "role": "user"}
* Set Authorization header "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "message": "Forbidden"

# API Test - Get User by ID

## Scenario: Get User by ID - Success
* Call GET "/users/1"
* Verify response status is 200
* Verify response body contains "id", "name", "email", "role"

## Scenario: Get User by ID - Bad Request (400)
* Call GET "/users/invalid_id"
* Verify response status is 400
* Verify response body contains "message": "Invalid ID supplied"

## Scenario: Get User by ID - Unauthorized (401)
* Call GET "/users/1"
* Set Authorization header "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "message": "Unauthorized"

## Scenario: Get User by ID - Forbidden (403)
* Call GET "/users/1"
* Set Authorization header "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "message": "Forbidden"

# API Test - Update User

## Scenario: Update User - Success
* Call PUT "/users/1" with body {"name": "John Doe Updated", "email": "john.updated@example.com", "password": "newpassword123", "role": "admin"}
* Verify response status is 200
* Verify response body contains "id", "name", "email", "role"

## Scenario: Update User - Bad Request (400)
* Call PUT "/users/1" with body {"email": "john.updated@example.com"}
* Verify response status is 400
* Verify response body contains "message": "Invalid input"

## Scenario: Update User - Unauthorized (401)
* Call PUT "/users/1" with body {"name": "John Doe Updated", "email": "john.updated@example.com", "password": "newpassword123", "role": "admin"}
* Set Authorization header "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "message": "Unauthorized"

## Scenario: Update User - Forbidden (403)
* Call PUT "/users/1" with body {"name": "John Doe Updated", "email": "john.updated@example.com", "password": "newpassword123", "role": "admin"}
* Set Authorization header "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "message": "Forbidden"

# API Test - Delete User

## Scenario: Delete User - Success
* Call DELETE "/users/1"
* Verify response status is 204

## Scenario: Delete User - Bad Request (400)
* Call DELETE "/users/invalid_id"
* Verify response status is 400
* Verify response body contains "message": "Invalid ID supplied"

## Scenario: Delete User - Unauthorized (401)
* Call DELETE "/users/1"
* Set Authorization header "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "message": "Unauthorized"

## Scenario: Delete User - Forbidden (403)
* Call DELETE "/users/1"
* Set Authorization header "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "message": "Forbidden"