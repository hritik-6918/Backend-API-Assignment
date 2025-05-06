# Activity Booking API

A RESTful API backend for an Activity Booking application built with Node.js, Express.js, and MongoDB.

## Features

- User authentication (Register/Login) with JWT
- Activity listing and management
- Booking system for activities
- Secure password hashing with bcrypt
- Input validation using express-validator
- Clean and modular code structure

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Logging**: morgan

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
└── server.js       # Entry point
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/activity-booking
JWT_SECRET=your_jwt_secret_key
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd activity-booking-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

#### Register User

- **POST** `/api/auth/register`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "securepassword"
  }
  ```

#### Login User

- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

### Activities

#### List All Activities

- **GET** `/api/activities`
- Public endpoint

#### Get Single Activity

- **GET** `/api/activities/:id`
- Public endpoint

#### Book an Activity

- **POST** `/api/activities/book/:id`
- Protected endpoint
- Requires authentication token

#### Get User's Bookings

- **GET** `/api/bookings`
- Protected endpoint
- Requires authentication token

## Authentication

The API uses JWT for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Testing

A Postman collection is included in the `/postman` directory for testing all API endpoints.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
