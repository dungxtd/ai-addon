# Get User > 
## Successful request
* * Set headers "Authorization" with value "Bearer {{token}}"
* * Send get request to "https://api.example.com/users/:id"
* * Ensure status code is "200"
* * Verify response body contains "id"

## Bad request
* * Set headers "Authorization" with value "Bearer {{token}}"
* * Send get request to "https://api.example.com/users/"
* * Ensure status code is "400"

## Unauthorized
* * Set headers "Authorization" with value "Bearer wrongToken"
* * Send get request to "https://api.example.com/users/:id"
* * Ensure status code is "401"

## Forbidden
* * Set headers "Authorization" with value "Bearer {{token}}"
* * Send get request to "https://api.example.com/users/differentId"
* * Ensure status code is "403"

---

# Create User > 
## Successful request
* * Send a POST request to "https://api.example.com/users" with the body
* ```
* {
* "name": "John Doe",
* "email": "john@example.com",
* "role": "user"
* }
* ```
* and headers
* ```
* {
* "Content-Type": "application/json",
* "Authorization": "Bearer {{token}}"
* }
* ```
* * Ensure the response status is 200
* * Validate the response body contains the name "John Doe", email "john@example.com" and role "user"

## Bad request
* * Send a POST request to "https://api.example.com/users" with an invalid body
* * Ensure the response status is 400

## Unauthorized
* * Send a POST request to "https://api.example.com/users" without the Authorization header
* * Ensure the response status is 401

## Forbidden
* * Send a POST request to "https://api.example.com/users" with a valid body but with an invalid or expired token in the Authorization header
* * Ensure the response status is 403

---

# List Products > 
## Successful request
* * Send a GET request to https://api.example.com/products
* * Verify that the response status is 200
* * Verify that the response body contains product data

## Bad request
* * Send a GET request to https://api.example.com/products with an invalid parameter
* * Verify that the response status is 400
* * Verify that the response body contains error message related to bad request

## Unauthorized request
* * Send a GET request to https://api.example.com/products without authentication
* * Verify that the response status is 401
* * Verify that the response body contains error message related to unauthorized access

## Forbidden request
* * Send a GET request to https://api.example.com/products with a user who does not have access
* * Verify that the response status is 403
* * Verify that the response body contains error message related to forbidden access

---
