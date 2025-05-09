```gauge
# Get User API - Successful Request

* Get user with valid token
* Validate status code is 200
* Validate response body contains user details

# Get User API - Bad Request

* Get user with invalid request
* Validate status code is 400
* Validate response body contains error message

# Get User API - Unauthorized

* Get user with invalid token
* Validate status code is 401
* Validate response body contains "Unauthorized" message

# Get User API - Forbidden

* Get user without required permissions
* Validate status code is 403
* Validate response body contains "Forbidden" message