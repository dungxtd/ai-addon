# Get User

## Test Scenario

* # Get User API Tests
* ## Successful Request
* Get user with valid ID
* Set header "Authorization" to "Bearer valid_token"
* Perform GET request to "https://api.example.com/users/123"
* Verify status code is 200
* Verify response body contains "id": 123
* Verify response body contains "name": "John Doe"
* ## Bad Request
* Get user with invalid ID
* Set header "Authorization" to "Bearer valid_token"
* Perform GET request to "https://api.example.com/users/abc"
* Verify status code is 400
* Verify response body contains "error": "Invalid ID"
* ## Unauthorized
* Get user without authorization
* Perform GET request to "https://api.example.com/users/123"
* Verify status code is 401
* Verify response body contains "error": "Unauthorized"
* ## Forbidden
* Get user with insufficient permissions
* Set header "Authorization" to "Bearer limited_token"
* Perform GET request to "https://api.example.com/users/123"
* Verify status code is 403
* Verify response body contains "error": "Forbidden"

---

# Create User

## Test Scenario

* # Create User API Tests
* ## Successful User Creation
* Send a POST request to "https://api.example.com/users" with headers "Content-Type: application/json", "Authorization: Bearer {{token}}" and body
* ```json
* {
* "name": "John Doe",
* "email": "john@example.com",
* "role": "user"
* }
*
* Verify the response status code is 200
* Verify the response body contains "id"
* Verify the response body contains "name": "John Doe"
* Verify the response body contains "email": "john@example.com"
* Verify the response body contains "role": "user"
* ## Bad Request - Invalid Data
* Send a POST request to "https://api.example.com/users" with headers "Content-Type: application/json", "Authorization: Bearer {{token}}" and body
* ```json
* {
* "name": "",
* "email": "invalid-email",
* "role": "user"
* }
*
* Verify the response status code is 400
* Verify the response body contains "error": "Invalid data"
* ## Unauthorized - Missing Token
* Send a POST request to "https://api.example.com/users" with headers "Content-Type: application/json" and body
* ```json
* {
* "name": "John Doe",
* "email": "john@example.com",
* "role": "user"
* }
*
* Verify the response status code is 401
* Verify the response body contains "error": "Unauthorized"
* ## Forbidden - Insufficient Permissions
* Send a POST request to "https://api.example.com/users" with headers "Content-Type: application/json", "Authorization: Bearer {{token}}" and body
* ```json
* {
* "name": "John Doe",
* "email": "john@example.com",
* "role": "user"
* }
*
* Verify the response status code is 403
* Verify the response body contains "error": "Forbidden"

---

# List Products

## Test Scenario

* # List Products API - Success
* Get products from "https://api.example.com/products"
* Verify status code is 200
* Verify response body contains "product_id"
* # List Products API - Bad Request
* Get products from "https://api.example.com/products"
* Verify status code is 400
* Verify response body contains "error" and "invalid_parameter"
* # List Products API - Unauthorized
* Get products from "https://api.example.com/products"
* Verify status code is 401
* Verify response body contains "error" and "unauthorized"
* # List Products API - Forbidden
* Get products from "https://api.example.com/products"
* Verify status code is 403
* Verify response body contains "error" and "forbidden"

---
