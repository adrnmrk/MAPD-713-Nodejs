## mapd713-lab10

## Code of REST API from lab03 is modified to have two extra endpoints​

/register​
This endpoint will allow to register a user and generate a JWT token which can be used to access protected resources​: /protected​, DEL /users/:id​

/protected​
This is sample endpoint with authorization check to ensure only user with role=admin can access this resource​

DEL /users/:id​
This endpoint is enhanced to allow only registered users to perform delete operation​

# More details on the library used can be found here​
https://frbuceta.com/restify-jwt-community/usage​

# Info on Json Web Token​
https://jwt.io/ ​


## Example of commands using CURL

# register user
curl -X POST -H "Content-Type: application/json" --data '{ "name": "Tim Tom", "role": "admin", "password":"my-secret-pass" }' http://127.0.0.1:3000/register

# output
{"name":"Tim Tom","role":"admin","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGltIFRvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTYwMDI3OH0.w0hg6GYrvJqO2x7MBDvVbKqAXTH4Tdbs17ti3mNiPOU"}


# call /protected endpoint with the token obtained during registration
curl -v -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGltIFRvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTYwMDI3OH0.w0hg6GYrvJqO2x7MBDvVbKqAXTH4Tdbs17ti3mNiPOU" http://127.0.0.1:3000/protected
