Feature: Get User > 

Scenario: Successful request
Given I set headers "Authorization" with value "Bearer {{token}}"
When I send a get request to "https://api.example.com/users/:id"
Then the status code should be "200"
And the response body should contain "id"

Scenario: Bad request
Given I set headers "Authorization" with value "Bearer {{token}}"
When I send a get request to "https://api.example.com/users/"
Then the status code should be "400"

Scenario: Unauthorized
Given I set headers "Authorization" with value "Bearer wrongToken"
When I send a get request to "https://api.example.com/users/:id"
Then the status code should be "401"

Scenario: Forbidden
Given I set headers "Authorization" with value "Bearer {{token}}"
When I send a get request to "https://api.example.com/users/differentId"
Then the status code should be "403"
---

Feature: Create User > 

Scenario: Successful request
Given I have a valid "token"
When I send a POST request to "https://api.example.com/users" with the valid body
Then I expect the response status code to be 200
And The response body should contain the name "John Doe", email "john@example.com" and role "user"

Scenario: Bad request
Given I have a valid "token"
When I send a POST request to "https://api.example.com/users" with an invalid body
Then I expect the response status code to be 400

Scenario: Unauthorized
Given I do not have a valid "token"
When I send a POST request to "https://api.example.com/users" with a valid body
Then I expect the response status code to be 401

Scenario: Forbidden
Given I have an invalid or expired "token"
When I send a POST request to "https://api.example.com/users" with a valid body
Then I expect the response status code to be 403
---

Feature: List Products > 

Scenario: Successful request
Given I have set a GET request to https://api.example.com/products
When I send the request
Then the response code should be 200
And the response body should contain product data

Scenario: Bad request
Given I have set a GET request to https://api.example.com/products with an invalid parameter
When I send the request
Then the response code should be 400
And the response body should contain error message related to bad request

Scenario: Unauthorized request
Given I have set a GET request to https://api.example.com/products without authentication
When I send the request
Then the response code should be 401
And the response body should contain error message related to unauthorized access

Scenario: Forbidden request
Given I have set a GET request to https://api.example.com/products with a user who does not have access
When I send the request
Then the response code should be 403
And the response body should contain error message related to forbidden access
---
