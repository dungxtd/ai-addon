# API Test - Get User

## Scenario: Get User Details - Success
* Call GET "https://api.example.com/users/123" with header "Authorization: Bearer valid_token"
* Verify response status code is 200
* Verify response body contains "id"
* Verify response body contains "name"
* Verify response body contains "email"

## Scenario: Get User Details - Bad Request (400)
* Call GET "https://api.example.com/users/invalid_id" with header "Authorization: Bearer valid_token"
* Verify response status code is 400
* Verify response body contains "error"

## Scenario: Get User Details - Unauthorized (401)
* Call GET "https://api.example.com/users/123"
* Verify response status code is 401
* Verify response body contains "error"

## Scenario: Get User Details - Forbidden (403)
* Call GET "https://api.example.com/users/123" with header "Authorization: Bearer insufficient_permissions_token"
* Verify response status code is 403
* Verify response body contains "error"

# API Test - Create User

## Scenario: Create User - Success
* Set request body to
```
{
  "name": "New User",
  "email": "newuser@example.com",
  "role": "editor"
}
```
* Call POST "https://api.example.com/users" with header "Authorization: Bearer valid_token" and header "Content-Type: application/json"
* Verify response status code is 201
* Verify response body contains "id"
* Verify response body contains "name"
* Verify response body contains "email"
* Verify response body contains "role"

## Scenario: Create User - Bad Request (400) - Invalid Email
* Set request body to
```
{
  "name": "New User",
  "email": "invalid_email",
  "role": "editor"
}
```
* Call POST "https://api.example.com/users" with header "Authorization: Bearer valid_token" and header "Content-Type: application/json"
* Verify response status code is 400
* Verify response body contains "error"

## Scenario: Create User - Unauthorized (401)
* Set request body to
```
{
  "name": "New User",
  "email": "newuser@example.com",
  "role": "editor"
}
```
* Call POST "https://api.example.com/users" with header "Content-Type: application/json"
* Verify response status code is 401
* Verify response body contains "error"

## Scenario: Create User - Forbidden (403)
* Set request body to
```
{
  "name": "New User",
  "email": "newuser@example.com",
  "role": "editor"
}
```
* Call POST "https://api.example.com/users" with header "Authorization: Bearer insufficient_permissions_token" and header "Content-Type: application/json"
* Verify response status code is 403
* Verify response body contains "error"

# API Test - List Products

## Scenario: List Products - Success
* Call GET "https://api.example.com/products"
* Verify response status code is 200
* Verify response body is an array
* Verify response body is not empty

## Scenario: List Products - Unauthorized (401) - If authentication is expected for products list
* Call GET "https://api.example.com/products" with header "Authorization: Bearer invalid_token"
* Verify response status code is 401
* Verify response body contains "error"

## Scenario: List Products - Forbidden (403) - If certain role is needed
* Call GET "https://api.example.com/products" with header "Authorization: Bearer insufficient_permissions_token"
* Verify response status code is 403
* Verify response body contains "error"

## Scenario: List Products - Bad Request (400) - If Query Parameter is missing or invalid.
* Call GET "https://api.example.com/products?invalid_parameter=123"
* Verify response status code is 400
* Verify response body contains "error"