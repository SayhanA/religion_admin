# Node Religion with Admin Panel

## Project Overview
**nodereliginwithadminpanel** is a Node.js-based web application with an admin panel to manage religious and caste-related data. The project utilizes Express.js, MongoDB, and EJS as the templating engine.

## Features
- User authentication and session management
- CRUD operations for religions and castes
- Admin panel for managing data
- Secure password hashing using bcryptjs
- Input validation using Joi
- MongoDB integration with Mongoose
- EJS templating for dynamic views

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ORM
- **Templating Engine:** EJS
- **Authentication:** Express-session, bcryptjs
- **Validation:** Joi
- **Middleware:** Body-parser, Cors

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/SayhanA/religion_admin.git
   cd religion_admin
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a **.env** file in the root directory and configure environment variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/religions_db
   SESSION_SECRET=your_secret_key
   ```

4. Start the development server:
   ```sh
   npm start
   ```

## Usage
- Open `http://localhost:3000` in your browser.
- Use the admin panel to manage religions and castes.

## Folder Structure
```
📦 religion_admin
├── 📂 config          # Configuration files (e.g., database connection)
├── 📂 controllers     # Request handlers
├── 📂 middleware      # Custom middleware functions
├── 📂 models          # Mongoose schemas
├── 📂 public          # Static files (CSS, JS, images)
├── 📂 routes          # Application routes
├── 📂 views           # EJS templates for frontend
├── app.js             # Main application file
├── package.json       # Project dependencies
├── .env.example       # Example environment file
└── README.md          # Project documentation
```

## API Routes

### Religion Routes
| Method | Endpoint                | Description |
|--------|-------------------------|-------------|
| GET    | `/admin/religions`      | Get all religions |
| POST   | `/admin/religions/add`  | Add a new religion |
| POST   | `/admin/religions/deleteAll` | Delete multiple religions |

### Caste Routes
| Method | Endpoint                | Description |
|--------|-------------------------|-------------|
| GET    | `/admin/castes`         | Get all castes |
| POST   | `/admin/castes/add`     | Add a new caste |
| POST   | `/admin/castes/deleteAll` | Delete multiple castes |

## License
This project is licensed under the **ISC License**.

## Author
- **Sayhan Ahmed Tonmoy** - [GitHub](https://github.com/SayhanA)

