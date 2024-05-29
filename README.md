# User Authentication System

This project implements a basic user authentication system using Node.js, Express, and MongoDB. It includes functionalities for user signup, login, and logout, with JWT-based authentication.

## Features

- User Signup
- User Login
- User Logout
- Password Hashing
- JWT-based Authentication
- Secure Cookies with `httpOnly` flag

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/mirzahanzla/Web-Crud-Authentication
    cd your-repo
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_secret_key
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

## Usage

### Signup

- **Endpoint:** `/users/signup`
- **Method:** `POST`
- **Payload:**
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```
- **Response:** Redirects to the login page.

### Login

- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Payload:**
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```
- **Response:** Sets a `token` cookie and redirects to the home page.

### Logout

- **Endpoint:** `/users/logout`
- **Method:** `GET`
- **Response:** Clears the `token` cookie and redirects to the login page.

## Project Structure

```plaintext
.
├── models
│   └── User.js
├── routes
│   └── userRoutes.js
├── controllers
│   └── authController.js
├── .env
├── app.js
├── package.json
└── README.md
