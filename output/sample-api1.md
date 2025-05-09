# API Test - Get User

## Scenario: Get User Details - Success
* Call GET "https://api.example.com/users/1"
* Set Header "Authorization" to "Bearer valid_token"
* Verify response status is 200
* Verify response body contains "id"
* Verify response body contains "name"
* Verify response body contains "email"

## Scenario: Get User Details - Bad Request (400) - Invalid User ID
* Call GET "https://api.example.com/users/invalid_id"
* Set Header "Authorization" to "Bearer valid_token"
* Verify response status is 400
* Verify response body contains "error"
* Verify response body contains "Invalid User ID format"

## Scenario: Get User Details - Unauthorized (401) - Missing Token
* Call GET "https://api.example.com/users/1"
* Verify response status is 401
* Verify response body contains "error"
* Verify response body contains "Unauthorized"

## Scenario: Get User Details - Unauthorized (401) - Invalid Token
* Call GET "https://api.example.com/users/1"
* Set Header "Authorization" to "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "error"
* Verify response body contains "Invalid Token"

## Scenario: Get User Details - Forbidden (403)
* Call GET "https://api.example.com/users/1"
* Set Header "Authorization" to "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "error"
* Verify response body contains "Forbidden"

# API Test - Create User

## Scenario: Create User - Success
* Call POST "https://api.example.com/users" with body
    """
    {
        "name": "New User",
        "email": "newuser@example.com",
        "role": "editor"
    }
    """
* Set Header "Content-Type" to "application/json"
* Set Header "Authorization" to "Bearer valid_token"
* Verify response status is 200
* Verify response body contains "id"
* Verify response body contains "name"
* Verify response body contains "email"
* Verify response body contains "role"

## Scenario: Create User - Bad Request (400) - Missing Email
* Call POST "https://api.example.com/users" with body
    """
    {
        "name": "New User",
        "role": "editor"
    }
    """
* Set Header "Content-Type" to "application/json"
* Set Header "Authorization" to "Bearer valid_token"
* Verify response status is 400
* Verify response body contains "error"
* Verify response body contains "Email is required"

## Scenario: Create User - Bad Request (400) - Invalid Email
* Call POST "https://api.example.com/users" with body
    """
    {
        "name": "New User",
        "email": "invalid-email",
        "role": "editor"
    }
    """
* Set Header "Content-Type" to "application/json"
* Set Header "Authorization" to "Bearer valid_token"
* Verify response status is 400
* Verify response body contains "error"
* Verify response body contains "Invalid email format"

## Scenario: Create User - Unauthorized (401) - Missing Token
* Call POST "https://api.example.com/users" with body
    """
    {
        "name": "New User",
        "email": "newuser@example.com",
        "role": "editor"
    }
    """
* Set Header "Content-Type" to "application/json"
* Verify response status is 401
* Verify response body contains "error"
* Verify response body contains "Unauthorized"

## Scenario: Create User - Unauthorized (401) - Invalid Token
* Call POST "https://api.example.com/users" with body
    """
    {
        "name": "New User",
        "email": "newuser@example.com",
        "role": "editor"
    }
    """
* Set Header "Content-Type" to "application/json"
* Set Header "Authorization" to "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "error"
* Verify response body contains "Invalid Token"

## Scenario: Create User - Forbidden (403)
* Call POST "https://api.example.com/users" with body
    """
    {
        "name": "New User",
        "email": "newuser@example.com",
        "role": "editor"
    }
    """
* Set Header "Content-Type" to "application/json"
* Set Header "Authorization" to "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "error"
* Verify response body contains "Forbidden"

# API Test - List Products

## Scenario: List Products - Success
* Call GET "https://api.example.com/products"
* Verify response status is 200
* Verify response body contains "products"
* Verify response body is an array

## Scenario: List Products - Unauthorized (401) - Missing Token
* Call GET "https://api.example.com/products"
* Set Header "Authorization" to "Bearer invalid_token"
* Verify response status is 401
* Verify response body contains "error"
* Verify response body contains "Unauthorized"

## Scenario: List Products - Forbidden (403)
* Call GET "https://api.example.com/products"
* Set Header "Authorization" to "Bearer forbidden_token"
* Verify response status is 403
* Verify response body contains "error"
* Verify response body contains "Forbidden"