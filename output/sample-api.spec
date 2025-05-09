# Sample API Test Scenarios

## Get all users

* Send a GET request to "/users" with default parameters
* Verify response status is 200 and the body matches the expected user list schema

* Send a GET request to "/users" with invalid "limit" parameter
* Verify response status is 400 and error message "Invalid input"

* Send a GET request to "/users" without authentication
* Verify response status is 401 and error message "Unauthorized"

* Send a GET request to "/users" with valid user but insufficient permissions
* Verify response status is 403 and error message "Forbidden"

## Create a new user

* Send a POST request to "/users" with valid user data
* Verify response status is 201 and the body matches the new user schema

* Send a POST request to "/users" with incomplete user data
* Verify response status is 400 and error message "Invalid input"

* Send a POST request to "/users" without authentication
* Verify response status is 401 and error message "Unauthorized"

* Send a POST request to "/users" with valid user but insufficient permissions
* Verify response status is 403 and error message "Forbidden"

## Get user by ID

* Send a GET request to "/users/{userId}" with a valid userId
* Verify response status is 200 and the body matches the expected user schema

* Send a GET request to "/users/{userId}" with an invalid userId
* Verify response status is 400 and error message "Invalid ID supplied"

* Send a GET request to "/users/{userId}" without authentication
* Verify response status is 401 and error message "Unauthorized"

* Send a GET request to "/users/{userId}" with valid userId but insufficient permissions
* Verify response status is 403 and error message "Forbidden"

## Update user

* Send a PUT request to "/users/{userId}" with valid updated user data
* Verify response status is 200 and the body matches the updated user schema

* Send a PUT request to "/users/{userId}" with invalid user data
* Verify response status is 400 and error message "Invalid input"

* Send a PUT request to "/users/{userId}" without authentication
* Verify response status is 401 and error message "Unauthorized"

* Send a PUT request to "/users/{userId}" with valid data but insufficient permissions
* Verify response status is 403 and error message "Forbidden"

## Delete user

* Send a DELETE request to "/users/{userId}" with a valid userId
* Verify response status is 204 and the user is successfully deleted

* Send a DELETE request to "/users/{userId}" with an invalid userId
* Verify response status is 400 and error message "Invalid ID supplied"

* Send a DELETE request to "/users/{userId}" without authentication
* Verify response status is 401 and error message "Unauthorized"

* Send a DELETE request to "/users/{userId}" with valid userId but insufficient permissions
* Verify response status is 403 and error message "Forbidden"