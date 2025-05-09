Feature: Sample API Testing

Scenario Outline: Get all users
  Given I am a "<UserType>"
  When I send a GET request to "/users" with "<Parameters>"
  Then I expect the response code to be "<StatusCode>"
  And the response body should "<Description>"

Examples:
  | UserType       | Parameters                | StatusCode | Description                     |
  | valid user     | default parameters        | 200        | match the expected user list    |
  | any user       | invalid "limit" parameter | 400        | show an error "Invalid input"   |
  | unauthorized   | default parameters        | 401        | show an error "Unauthorized"    |
  | unauthorized   | default parameters        | 403        | show an error "Forbidden"       |

Scenario Outline: Create a new user
  Given I am a "<UserType>"
  When I send a POST request to "/users" with "<UserData>"
  Then I expect the response code to be "<StatusCode>"
  And the response body should "<Description>"

Examples:
  | UserType       | UserData           | StatusCode | Description                     |
  | valid admin    | valid user data    | 201        | match the new user schema       |
  | any user       | incomplete data    | 400        | show an error "Invalid input"   |
  | unauthorized   | valid user data    | 401        | show an error "Unauthorized"    |
  | unauthorized   | valid user data    | 403        | show an error "Forbidden"       |

Scenario Outline: Get user by ID
  Given I am a "<UserType>"
  When I send a GET request to "/users/{userId}" with "<UserId>"
  Then I expect the response code to be "<StatusCode>"
  And the response body should "<Description>"

Examples:
  | UserType       | UserId       | StatusCode | Description                     |
  | valid user     | valid userId | 200        | match the expected user schema  |
  | any user       | invalid ID   | 400        | show an error "Invalid ID supplied" |
  | unauthorized   | valid userId | 401        | show an error "Unauthorized"    |
  | unauthorized   | valid userId | 403        | show an error "Forbidden"       |

Scenario Outline: Update user
  Given I am a "<UserType>"
  When I send a PUT request to "/users/{userId}" with "<UserData>"
  Then I expect the response code to be "<StatusCode>"
  And the response body should "<Description>"

Examples:
  | UserType       | UserData         | StatusCode | Description                     |
  | valid admin    | valid updated data | 200      | match the updated user schema   |
  | any user       | invalid data     | 400        | show an error "Invalid input"   |
  | unauthorized   | valid data       | 401        | show an error "Unauthorized"    |
  | unauthorized   | valid data       | 403        | show an error "Forbidden"       |

Scenario Outline: Delete user
  Given I am a "<UserType>"
  When I send a DELETE request to "/users/{userId}" with "<UserId>"
  Then I expect the response code to be "<StatusCode>"
  And the response body should "<Description>"

Examples:
  | UserType       | UserId       | StatusCode | Description                     |
  | valid admin    | valid userId | 204        | confirm the user is deleted     |
  | any user       | invalid ID   | 400        | show an error "Invalid ID supplied" |
  | unauthorized   | valid userId | 401        | show an error "Unauthorized"    |
  | unauthorized   | valid userId | 403        | show an error "Forbidden"       |