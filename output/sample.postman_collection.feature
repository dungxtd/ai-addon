Feature: Get User > 

Scenario: Gherkin Format:
1. Successful request (status 200)
the user id is set for the API at https://api.example.com/users/:id
the Authorization header is set with Bearer token
the GET request is sent to the API
the response status should be 200
the response body should contain user details
2. Bad request (status 400)
an invalid user id is set for the API at https://api.example.com/users/:id
the Authorization header is set with Bearer token
the GET request is sent to the API
the response status should be 400
the response body should contain an error message
3. Unauthorized (status 401)
the user id is set for the API at https://api.example.com/users/:id
the Authorization header is set with an invalid Bearer token
the GET request is sent to the API
the response status should be 401
the response body should contain an unauthorized error message
4. Forbidden (status 403)
the user id is set for the API at https://api.example.com/users/:id for a user you don't have access to
the Authorization header is set with Bearer token
the GET request is sent to the API
the response status should be 403
the response body should contain a forbidden error message
---

Feature: Create User > 

Scenario: Gherkin Format:
1. Successful request (status 200)
the request name is {{name}}
the request method is post
the request URL is https://api.example.com/users
the request headers are set
the request body is set
the request is sent
the status code is 200
the response body is as expected
2. Bad request (status 400)
the request name is {{name}}
the request method is post
the request URL is https://api.example.com/users
the request headers are set
the incorrect request body is set
the request is sent
the status code is 400
the response body is as expected
3. Unauthorized (status 401)
the request name is {{name}}
the request method is post
the request URL is https://api.example.com/users
the request headers are set without authorization
the request body is set
the request is sent
the status code is 401
the response body is as expected
4. Forbidden (status 403)
the request name is {{name}}
the request method is post
the request URL is https://api.example.com/users
the request headers are set with incorrect authorization
the request body is set
the request is sent
the status code is 403
the response body is as expected
---

Feature: List Products > 

Scenario: Gherkin Scenarios:
1. Feature: Successful request
the products API at "https://api.example.com/products"
I send a GET request to the API
the response status should be 200
the response body should contain "products" data
2. Feature: Bad request
the products API at "https://api.example.com/products"
I send a GET request to the API with invalid parameters
the response status should be 400
the response body should contain "error" message
3. Feature: Unauthorized
the products API at "https://api.example.com/products"
I send a GET request to the API without authorization
the response status should be 401
the response body should contain "Unauthorized" message
4. Feature: Forbidden
the products API at "https://api.example.com/products"
I send a GET request to the API with a forbidden user
the response status should be 403
the response body should contain "Forbidden" message
---
