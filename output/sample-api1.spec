# Sample API Collection

## Get User

* Set header "Authorization" with value "Bearer valid_token"
* Send GET request to "https://api.example.com/users/123"
* Assert response status is 200

* Set header "Authorization" with value "Bearer valid_token"
* Send GET request to "https://api.example.com/users/invalid_id"
* Assert response status is 400

* Set header "Authorization" with value ""
* Send GET request to "https://api.example.com/users/123"
* Assert response status is 401

* Set header "Authorization" with value "Bearer restricted_token"
* Send GET request to "https://api.example.com/users/123"
* Assert response status is 403

## Create User

* Set header "Content-Type" with value "application/json"
* Set header "Authorization" with value "Bearer valid_token"
* Send POST request to "https://api.example.com/users" with body {"name": "John Doe", "email": "john@example.com", "role": "user"}
* Assert response status is 200

* Set header "Content-Type" with value "application/json"
* Set header "Authorization" with value "Bearer valid_token"
* Send POST request to "https://api.example.com/users" with body {"name": "", "email": "john@example.com", "role": "user"}
* Assert response status is 400

* Set header "Content-Type" with value "application/json"
* Set header "Authorization" with value ""
* Send POST request to "https://api.example.com/users" with body {"name": "John Doe", "email": "john@example.com", "role": "user"}
* Assert response status is 401

* Set header "Content-Type" with value "application/json"
* Set header "Authorization" with value "Bearer restricted_token"
* Send POST request to "https://api.example.com/users" with body {"name": "John Doe", "email": "john@example.com", "role": "user"}
* Assert response status is 403

## List Products

* Send GET request to "https://api.example.com/products"
* Assert response status is 200

* Send GET request to "https://api.example.com/products?invalid_param"
* Assert response status is 400

* Set header "Authorization" with value ""
* Send GET request to "https://api.example.com/products"
* Assert response status is 401

* Set header "Authorization" with value "Bearer restricted_token"
* Send GET request to "https://api.example.com/products"
* Assert response status is 403