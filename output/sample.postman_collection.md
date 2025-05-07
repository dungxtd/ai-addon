# Get User > 
## Gauge Format:
* 1. Successful request (status 200)
* Set user id for the API at https://api.example.com/users/:id
* Set the Authorization header with Bearer token
* Send a GET request to the API
* Verify the response status is 200
* Verify the response body contains user details
* 2. Bad request (status 400)
* Set an invalid user id for the API at https://api.example.com/users/:id
* Set the Authorization header with Bearer token
* Send a GET request to the API
* Verify the response status is 400
* Verify the response body contains an error message
* 3. Unauthorized (status 401)
* Set user id for the API at https://api.example.com/users/:id
* Set the Authorization header with an invalid Bearer token
* Send a GET request to the API
* Verify the response status is 401
* Verify the response body contains an unauthorized error message
* 4. Forbidden (status 403)
* Set user id for the API at https://api.example.com/users/:id for a user you don't have access to
* Set the Authorization header with Bearer token
* Send a GET request to the API
* Verify the response status is 403
* Verify the response body contains a forbidden error message

---

# Create User > 
## Gauge Format:
* 1. Successful request (status 200)
* Set the request name to {{name}}
* Set the request method to post
* Set the request URL to https://api.example.com/users
* Set the request headers
* Set the request body
* Send the request
* Verify the status code is 200
* Verify the response body is as expected
* 2. Bad request (status 400)
* Set the request name to {{name}}
* Set the request method to post
* Set the request URL to https://api.example.com/users
* Set the request headers
* Set the incorrect request body
* Send the request
* Verify the status code is 400
* Verify the response body is as expected
* 3. Unauthorized (status 401)
* Set the request name to {{name}}
* Set the request method to post
* Set the request URL to https://api.example.com/users
* Set the request headers without authorization
* Set the request body
* Send the request
* Verify the status code is 401
* Verify the response body is as expected
* 4. Forbidden (status 403)
* Set the request name to {{name}}
* Set the request method to post
* Set the request URL to https://api.example.com/users
* Set the request headers with incorrect authorization
* Set the request body
* Send the request
* Verify the status code is 403
* Verify the response body is as expected

---

# List Products > 
## Gauge Scenarios:
* 1. Scenario: Successful request (status 200)
* Send a GET request to "https://api.example.com/products"
* Ensure that the response status is 200
* Validate that the response body contains "products" data
* 2. Scenario: Bad request (status 400)
* Send a GET request to "https://api.example.com/products" with invalid parameters
* Ensure that the response status is 400
* Validate that the response body contains "error" message
* 3. Scenario: Unauthorized (status 401)
* Send a GET request to "https://api.example.com/products" without authorization
* Ensure that the response status is 401
* Validate that the response body contains "Unauthorized" message
* 4. Scenario: Forbidden (status 403)
* Send a GET request to "https://api.example.com/products" with a forbidden user
* Ensure that the response status is 403
* Validate that the response body contains "Forbidden" message

---
