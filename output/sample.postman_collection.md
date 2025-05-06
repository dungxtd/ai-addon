# Get User > 
## Test Scenarios for API request
* No steps provided

## Scenario: Successful request (status 200)
* Set the request method to "get"
* Set the request URL to "https://api.example.com/users/:id"
* Set the Authorization header to "Bearer {{token}}"
* Send the request to the server
* Ensure the response status code is 200
* Validate response body structure and data

## Scenario: Bad request (status 400)
* Set the request method to "get"
* Set the request URL to "https://api.example.com/users/:invalid_id"
* Set the Authorization header to "Bearer {{token}}"
* Send the request to the server
* Ensure the response status code is 400
* Validate response body contains error message related to bad request

## Scenario: Unauthorized (status 401)
* Set the request method to "get"
* Set the request URL to "https://api.example.com/users/:id"
* Set the Authorization header to an invalid or expired token format "Bearer {{invalid_token}}"
* Send the request to the server
* Ensure the response status code is 401
* Validate response body contains error message related to unauthorized access

## Scenario: Forbidden (status 403)
* Set the request method to "get"
* Set the request URL to "https://api.example.com/users/:id"
* Set the Authorization header to "Bearer {{token}}" with insufficient permissions
* Send the request to the server
* Ensure the response status code is 403
* Validate response body contains error message related to forbidden access


---

# Create User > 
## Test Scenario: Successful request (status 200)
* No steps provided

## Tags: API, POST, Success
* Send a post request to "https://api.example.com/users" with headers "Content-Type: application/json, Authorization: Bearer {{token}}" and body "{\n    \"name\": \"John Doe\",\n    \"email\": \"john@example.com\",\n    \"role\": \"user\"\n}"
* Ensure the response status is "200"
* Validate that response body contains "name", "email" and "role"

## Test Scenario: Bad request (status 400)
* No steps provided

## Tags: API, POST, BadRequest
* Send a post request to "https://api.example.com/users" with headers "Content-Type: application/json, Authorization: Bearer {{token}}" and body "{\n    \"name\": \"John Doe\",\n    \"email\": \"john@example.com\",\n}"
* Ensure the response status is "400"
* Validate that response body contains error message indicating a bad request

## Test Scenario: Unauthorized (status 401)
* No steps provided

## Tags: API, POST, Unauthorized
* Send a post request to "https://api.example.com/users" with headers "Content-Type: application/json, Authorization: Bearer incorrect_token" and body "{\n    \"name\": \"John Doe\",\n    \"email\": \"john@example.com\",\n    \"role\": \"user\"\n}"
* Ensure the response status is "401"
* Validate that response body contains error message indicating authorization failure

## Test Scenario: Forbidden (status 403)
* No steps provided

## Tags: API, POST, Forbidden
* Send a post request to "https://api.example.com/users" with headers "Content-Type: application/json, Authorization: Bearer {{token}}" and body "{\n    \"name\": \"John Doe\",\n    \"email\": \"john@example.com\",\n    \"role\": \"admin\"\n}"
* Ensure the response status is "403"
* Validate that response body contains error message indicating forbidden action


---

# List Products > 
## Test Scenarios for API endpoint
* No steps provided

## Scenario: Successful request (status 200)
* Send a GET request to "https://api.example.com/products"
* Ensure the response status is "200"
* Validate that the response body contains the expected product details

## Scenario: Bad request (status 400)
* Send a GET request to "https://api.example.com/products" with an invalid parameter
* Ensure the response status is "400"
* Validate that the response body contains a message indicating that the request was bad or malformed

## Scenario: Unauthorized (status 401)
* Send a GET request to "https://api.example.com/products" without any auth token or with an invalid auth token
* Ensure the response status is "401"
* Validate that the response body contains a message indicating that the user is unauthorized

## Scenario: Forbidden (status 403)
* Send a GET request to "https://api.example.com/products" with an auth token that does not have permission to access the endpoint
* Ensure the response status is "403"
* Validate that the response body contains a message indicating that the client does not have permission to access the resource

