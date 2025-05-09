# API Test - Get User

## Scenario: Get User Details - Success
* Call GET "https://api.example.com/users/1"
* Verify response status is 200
* Verify response body contains "id"
* Verify response body contains "name"

## Scenario: Get User Details - Bad Request (400)
* Call GET "https://api.example.com/users/invalid_id"
* Verify response status is 400
* Verify response body contains "error"

## Scenario: Get User Details - Unauthorized (401)
* Call GET "https://api.example.com/users/1"
* Set Authorization header "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "error"

## Scenario: Get User Details - Forbidden (403)
* Call GET "https://api.example.com/users/1"
* Set Authorization header "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "error"

# API Test - Create User

## Scenario: Create User - Success
* Call POST "https://api.example.com/users"
* Set headers "Content-Type: application/json" and "Authorization: Bearer valid_token"
* Set body '{"name": "John Doe", "email": "john@example.com", "role": "user"}'
* Verify response status is 200
* Verify response body contains "id"

## Scenario: Create User - Bad Request (400)
* Call POST "https://api.example.com/users"
* Set headers "Content-Type: application/json" and "Authorization: Bearer valid_token"
* Set body '{"name": "", "email": "john@example.com", "role": "user"}'  # Missing name
* Verify response status is 400
* Verify response body contains "error"

## Scenario: Create User - Unauthorized (401)
* Call POST "https://api.example.com/users"
* Set headers "Content-Type: application/json"
* Set body '{"name": "John Doe", "email": "john@example.com", "role": "user"}'
* Verify response status is 401
* Verify response body contains "error"

## Scenario: Create User - Forbidden (403)
* Call POST "https://api.example.com/users"
* Set headers "Content-Type: application/json" and "Authorization: Bearer forbidden_token"
* Set body '{"name": "John Doe", "email": "john@example.com", "role": "user"}'
* Verify response status is 403
* Verify response body contains "error"

# API Test - List Products

## Scenario: List Products - Success
* Call GET "https://api.example.com/products"
* Verify response status is 200
* Verify response body contains "products"

## Scenario: List Products - Unauthorized (401)
* Call GET "https://api.example.com/products"
* Set Authorization header "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "error"

## Scenario: List Products - Forbidden (403)
* Call GET "https://api.example.com/products"
* Set Authorization header "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "error"