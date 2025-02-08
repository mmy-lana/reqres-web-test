# Reqres Web Test

A React-based web application for managing users, built using the [Reqres](https://reqres.in/) fake API. This project demonstrates user authentication, CRUD operations, and pagination.

**Live Demo:** [https://reqres-web-test.vercel.app/](https://reqres-web-test.vercel.app/)

---

## Features

- **User Authentication**:
  - Login with email and password.
  - Logout functionality.

- **User Management**:
  - View a list of users with pagination.
  - Create new users.
  - Update existing users.
  - Delete users.
  - View user details.

- **Responsive Design**:
  - Works seamlessly on desktop and mobile devices.

- **Notifications**:
  - Success and error notifications for user actions.

---

## Technologies Used

- **Frontend**:
  - React
  - React Router for navigation
  - Axios for API requests
  - CSS for styling

- **Deployment**:
  - Vercel for hosting

- **API**:
  - [Reqres](https://reqres.in/) (fake REST API for testing)

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/reqres-web-test.git
   ```

2. Navigate to the project directory:
   ```bash
   cd reqres-web-test
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## Deployment

This project is deployed on Vercel. To deploy your own version:

1. Fork this repository.
2. Sign up for Vercel (if you don't have an account).
3. Create a new project on Vercel and import the forked repository.
4. Follow the deployment instructions. Vercel will automatically detect the React app and deploy it.

---

## API Usage

This project uses the Reqres fake API for testing. Below are the endpoints used:

### Login:
```http
POST /api/login
```
**Request Body:**
```json
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
```

### Get Users:
```http
GET /api/users?page=1
```

### Create User:
```http
POST /api/users
```
**Request Body:**
```json
{
  "name": "morpheus",
  "job": "leader"
}
```

### Update User:
```http
PUT /api/users/:id
```
**Request Body:**
```json
{
  "name": "morpheus",
  "job": "zion resident"
}
```

### Delete User:
```http
DELETE /api/users/:id
```

---

## Folder Structure
```
reqres-web-test/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable components (e.g., UserCard, Pagination)
│   ├── pages/               # Page components (e.g., Login, Dashboard)
│   ├── services/            # API service functions
│   ├── App.js               # Main application component
│   ├── index.js             # Entry point
├── package.json             # Project dependencies
├── README.md                # Project documentation
```

---

## Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- Reqres for providing the fake API.
- Vercel for free hosting and deployment.

---

## Contact

If you have any questions or feedback, feel free to reach out:

- **Email:** your-email@example.com
- **GitHub:** [your-username](https://github.com/your-username)

