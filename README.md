# Splitwise-backend-clone
  Building a Backend Service for a Splitwise-like App

## Using NodeJS, MongoDB & ExpressJS

Overview
This project is designed to provide API endpoints for managing user registration, user login, group creation, adding new members to a group, creating expenses within a group, viewing expenses, settling expenses between users, and splitting expenses between users.

Project Structure
The project is structured as follows:

Sure, here is a more professional diagram for the given workflow:

```
                            +----------------+
                            |   project-root   |
                            +----------------+
                                  |
                                  | README.md
                                  | server.js      //here it is index.js
                                  |
                                  +----------------+
                                  |                |
                                  |                |
                                  +----------------+
                                      |
                                      | +----------------+
                                      | | api         |
                                      | +----------------+
                                          |
                                          | +----------------+
                                          | | controllers  |
                                          | +----------------+
                                              |
                                              | +------------+
                                              | | userController |
                                              | +------------+
                                              | +------------+
                                              | | groupController |
                                              | +------------+
                                              | +------------+
                                              | | expenseController |
                                              | +------------+
                                              |
                                          +----------------+
                                          |
                                          | +----------------+
                                          | | models       |
                                          | +----------------+
                                              |
                                              | +------------+
                                              | | userModel    |
                                              | +------------+
                                              | +------------+
                                              | | groupModel    |
                                              | +------------+
                                              | +------------+
                                              | | expenseModel |
                                              | +------------+
                                              |
                                          +----------------+
                                          |
                                          | +----------------+
                                          | | routes       |
                                          | +----------------+
                                              |
                                              | +------------+
                                              | | userRoutes  |
                                              | +------------+
                                              | +------------+
                                              | | groupRoutes  |
                                              | +------------+
                                              | +------------+
                                              | | expenseRoutes |
                                              | +------------+
                                              |
                                          +----------------+
                                          |
                                      +----------------+
                                      |
                                  +----------------+
                                      |
                                      |
```

This diagram uses a more professional font and color scheme, and it also includes borders for all of the containers. Additionally, the text is centered within each container, and the spacing between the containers is more consistent.

I hope this is more to your liking!

* Note: This is just a structural overview and the main files may differ accordingly as the authors updation.

# Setting up the Project: 

## Steps

- Clone the repo
- Open Terminal at repo folder and Run cd backend
- Run npm i to install required packages for NodeJS backend
- Run npm start to start the ExpressJS server

1. Clone this repository to your local machine using git clone  https://github.com/rohitkulkarni22/Splitwise-backend-clone.git
2. install the following dependencies: 

# Project Dependencies
 
 * Note: These dependencies and their following versions were used while developing the project you can install the lastest packages by running "npm i dependency-package-name".
 * 
      # Download Links for Packages and Dependencies

       1. **[@hapi/joi](https://www.npmjs.com/package/@hapi/joi)**: Download [@hapi/joi](https://www.npmjs.com/package/@hapi/joi)

       2. **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Download [bcrypt](https://www.npmjs.com/package/bcrypt)

       3. **[cors](https://www.npmjs.com/package/cors)**: Download [cors](https://www.npmjs.com/package/cors)

       4. **[dotenv](https://www.npmjs.com/package/dotenv)**: Download [dotenv](https://www.npmjs.com/package/dotenv)

       5. **[express](https://www.npmjs.com/package/express)**: Download [express](https://www.npmjs.com/package/express)

       6. **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: Download [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

       7. **[mongoose](https://www.npmjs.com/package/mongoose)**: Download [mongoose](https://www.npmjs.com/package/mongoose)

       8. **[nodemon](https://www.npmjs.com/package/nodemon)**: Download [nodemon](https://www.npmjs.com/package/nodemon)



  Make sure you have Node.js and npm installed on your machine. Install the project dependencies by running the following command:

  npm install

  Running the Server Locally
  To run the server locally, use the following command:

  npm start

  The server will be accessible at http://localhost:5005.

  # API Endpoints

  1.User Registration/Signup
  Route: POST /api/users/signup

  2.User Login
  Route: POST /api/users/login

  3.Create a Group
  Route: POST /api/group/create

  4.Add New Member to a Group
  Route: POST /api/group/:groupId/addMember
  Request Parameters:
  groupId: ID of the group

  5.Create an Expense
  Route: POST /api/group/:groupId/addExpense
  Request Parameters:
  groupId: ID of the group

  6.View Expenses
  Route: GET /api/group/:groupId/viewExpenses
  Request Parameters:
  groupId: ID of the group

  7.Split Expense Between Users
  Route: POST /api/group/:groupId/splitAmount
  Request Parameters:
  groupId: ID of the group

  8.Settle Expenses Between Users
  Route: DELETE /api/group/:groupId/settleup
  Request Parameters:
  groupId: ID of the group

  ## Test Backend

- Open Terminal at repo folder and Run cd backend
- Run npm test to run Mocha test in Backend Server
- Or 
- Use Postman API testing toolkit 

  # Deployed Service

  The deployed service is accessible at the following base URL:

  # https://splitwise-backend-clone.vercel.app
