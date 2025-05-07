# Get User > 
## Successful request (status 200)
* Set method to GET
* Set URL to "https://api.example.com/users/:id"
* Set header "Authorization" to "Bearer {{token}}"
* Send the request
* Ensure the response status is 200

## Bad request (status 400)
* Set method to GET
* Set URL to "https://api.example.com/users/:invalid_id"
* Set header "Authorization" to "Bearer {{token}}"
* Send the request
* Ensure the response status is 400

## Unauthorized (status 401)
* Set method to GET
* Set URL to "https://api.example.com/users/:id"
* Set header "Authorization" to "Bearer {{invalid_token}}"
* Send the request
* Ensure the response status is 401

## Forbidden (status 403)
* Set method to GET
* Set URL to "https://api.example.com/users/:forbidden_id"
* Set header "Authorization" to "Bearer {{token}}"
* Send the request
* Ensure the response status is 403
* Validate the response body

---

# Create User > 
## Successful Request
* Set the request headers "Content-Type" as "application/json" and "Authorization" as "Bearer {{token}}"
* Set the request body with "name" as "John Doe", "email" as "john@example.com", and "role" as "user"
* Send a POST request to "https://api.example.com/users"
* Ensure the response status is 200

## Bad Request
* Set the request headers "Content-Type" as "application/json" and "Authorization" as "Bearer {{token}}"
* Set an invalid request body
* Send a POST request to "https://api.example.com/users"

## Unauthorized
* Set the request headers "Content-Type" as "application/json"
* Do not set "Authorization" header or set an invalid token
* Set the request body with "name" as "John Doe", "email" as "john@example.com", and "role" as "user"
* Send a POST request to "https://api.example.com/users"

## Forbidden
* Set the request headers "Content-Type" as "application/json" and "Authorization" as "Bearer {{token}}"
* Set the request body with "name" as "John Doe", "email" as "john@example.com", and "role" as a role that the user does not have permission for
* Send a POST request to "https://api.example.com/users"
* Ensure the response status is 403

---

# List Products > 
## Successful request
* Send GET request to https://api.example.com/products
* Ensure the status code is 200

## Bad request
* Send GET request to https://api.example.com/products with invalid parameters
* Ensure the status code is 400

## Unauthorized request
* Send GET request to https://api.example.com/products without authorization
* Ensure the status code is 401

## Forbidden request
* Send GET request to https://api.example.com/products without proper permissions
* Ensure the status code is 403
* Validate the response body

---
