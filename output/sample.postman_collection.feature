Feature: Get User > 

Scenario: Successful request (status 200)
Given I set method to GET
And I set URL to "https://api.example.com/users/:id"
And I set header "Authorization" to "Bearer {{token}}"
When I send the request
Then the response status should be 200

Scenario: Bad request (status 400)
Given I set method to GET
And I set URL to "https://api.example.com/users/:invalid_id"
And I set header "Authorization" to "Bearer {{token}}"
When I send the request
Then the response status should be 400

Scenario: Unauthorized (status 401)
Given I set method to GET
And I set URL to "https://api.example.com/users/:id"
And I set header "Authorization" to "Bearer {{invalid_token}}"
When I send the request
Then the response status should be 401

Scenario: Forbidden (status 403)
Given I set method to GET
And I set URL to "https://api.example.com/users/:forbidden_id"
And I set header "Authorization" to "Bearer {{token}}"
When I send the request
Then the response status should be 403
And I validate the response body
---

Feature: Create User > 

Scenario: Successful Request
Given I set the headers "Content-Type" to "application/json" and "Authorization" to "Bearer {{token}}"
And I set the body with "name" as "John Doe", "email" as "john@example.com", and "role" as "user"
When I send a POST request to "https://api.example.com/users"
Then the response status should be 200

Scenario: Bad Request
Given I set the headers "Content-Type" to "application/json" and "Authorization" to "Bearer {{token}}"
And I set an invalid body
When I send a POST request to "https://api.example.com/users"

Scenario: Unauthorized
Given I set the header "Content-Type" to "application/json"
And I do not set "Authorization" header or I set an invalid token
And I set the body with "name" as "John Doe", "email" as "john@example.com", and "role" as "user"
When I send a POST request to "https://api.example.com/users"

Scenario: Forbidden
Given I set the headers "Content-Type" to "application/json" and "Authorization" to "Bearer {{token}}"
And I set the body with "name" as "John Doe", "email" as "john@example.com", and "role" as a role that the user does not have permission for
When I send a POST request to "https://api.example.com/users"
Then the response status should be 403
---

Feature: List Products > 

Scenario: Successful request
Given I have the correct API endpoint
When I send GET request to https://api.example.com/products
Then the response status code should be 200

Scenario: Bad request
Given I have the correct API endpoint
When I send GET request to https://api.example.com/products with invalid parameters
Then the response status code should be 400

Scenario: Unauthorized request
Given I have the correct API endpoint
When I send GET request to https://api.example.com/products without authorization
Then the response status code should be 401

Scenario: Forbidden request
Given I have the correct API endpoint
When I send GET request to https://api.example.com/products without proper permissions
Then the response status code should be 403
And the response body should be validated
---
