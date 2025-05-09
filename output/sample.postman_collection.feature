Feature: Get User

Scenario: Test Scenario

Given Scenario: Successful Request
Given I set header "Authorization" to "Bearer valid_token"
When I perform GET request to "https://api.example.com/users/123"
Then the status code should be 200
And the response body should contain "id": 123
And the response body should contain "name": "John Doe"
Given Scenario: Bad Request
Given I set header "Authorization" to "Bearer valid_token"
When I perform GET request to "https://api.example.com/users/abc"
Then the status code should be 400
And the response body should contain "error": "Invalid ID"
Given Scenario: Unauthorized
When I perform GET request to "https://api.example.com/users/123"
Then the status code should be 401
And the response body should contain "error": "Unauthorized"
Given Scenario: Forbidden
Given I set header "Authorization" to "Bearer limited_token"
When I perform GET request to "https://api.example.com/users/123"
Then the status code should be 403
And the response body should contain "error": "Forbidden"
Given

---

Feature: Create User

Scenario: Test Scenario

Given Scenario: Successful User Creation
Given I send a POST request to "https://api.example.com/users" with headers
Given | Content-Type  | application/json |
Given | Authorization | Bearer {{token}} |
And I send the following JSON body
Given {
Given "name": "John Doe",
Given "email": "john@example.com",
Given "role": "user"
Given }
Then the response status code should be 200
And the response body should contain "id"
And the response body should contain "name": "John Doe"
And the response body should contain "email": "john@example.com"
And the response body should contain "role": "user"
Given Scenario: Bad Request - Invalid Data
Given I send a POST request to "https://api.example.com/users" with headers
Given | Content-Type  | application/json |
Given | Authorization | Bearer {{token}} |
And I send the following JSON body
Given {
Given "name": "",
Given "email": "invalid-email",
Given "role": "user"
Given }
Then the response status code should be 400
And the response body should contain "error": "Invalid data"
Given Scenario: Unauthorized - Missing Token
Given I send a POST request to "https://api.example.com/users" with headers
Given | Content-Type | application/json |
And I send the following JSON body
Given {
Given "name": "John Doe",
Given "email": "john@example.com",
Given "role": "user"
Given }
Then the response status code should be 401
And the response body should contain "error": "Unauthorized"
Given Scenario: Forbidden - Insufficient Permissions
Given I send a POST request to "https://api.example.com/users" with headers
Given | Content-Type  | application/json |
Given | Authorization | Bearer {{token}} |
And I send the following JSON body
Given {
Given "name": "John Doe",
Given "email": "john@example.com",
Given "role": "user"
Given }
Then the response status code should be 403
And the response body should contain "error": "Forbidden"
Given

---

Feature: List Products

Scenario: Test Scenario

Given Scenario: Successful request
Given I send a GET request to "https://api.example.com/products"
When the request is executed
Then the response status code should be 200
And the response body should contain "product_id"
Given Scenario: Bad request
Given I send a GET request to "https://api.example.com/products"
When the request is executed
Then the response status code should be 400
And the response body should contain "error"
And the response body should contain "invalid_parameter"
Given Scenario: Unauthorized
Given I send a GET request to "https://api.example.com/products"
When the request is executed
Then the response status code should be 401
And the response body should contain "error"
And the response body should contain "unauthorized"
Given Scenario: Forbidden
Given I send a GET request to "https://api.example.com/products"
When the request is executed
Then the response status code should be 403
And the response body should contain "error"
And the response body should contain "forbidden"
Given

---
