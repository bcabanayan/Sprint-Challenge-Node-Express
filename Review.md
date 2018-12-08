# Review Questions

## What is Node.js?

Node.js is a runtime environment that enables the execution of JavaScript applications outside of a web browser.

## What is Express?

Express is a framework that runs on top of Node.js and extends its functionalty in order to make it easier to create web applications and services. 

## Mention two parts of Express that you learned about this week.

Express is very lightweight and customizable, allowing us to have more power over the functionality of our server APIs. It can also incorporate helpers that allow for easier implementation of common server functions.

## What is Middleware?

Middleware is used in order to capture and operate on request and response data. This is useful for modifying the data, but can also be used to log it, for example.

## What is a Resource?

A resource can describe different sources of information, like information about user names stored in a database that would be pulled upon a request to an API.

## What can the API return to help clients know if a request was successful?

An API can return a status code 200 to indicate a successful request.

## How can we partition our application into sub-applications?

We can use routers, which we then import into our main server file.

## What is express.json() and why do we need it?

We use express.json() to parse JSON content out of a request body.