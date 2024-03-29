# Paytm Clone

🚧 Work in Progress 🚧

## Overview

This project is a full-stack Paytm clone built using Node.js, Express.js, React.js, and MongoDB. It aims to replicate some of the core features of the Paytm platform, including user authentication, payment processing, and wallet management.

## Features

🔒 **Authentication**: Users can sign up, log in, and log out securely using JWT authentication.

💰 **Payment Processing**: Users can make payments, recharge wallets, and perform transactions securely.

💳 **Wallet Management**: Users can view their wallet balance, transaction history, and manage their wallet settings.

📈 **Dashboard**: Admins have access to a dashboard to monitor user activity, transactions, and system analytics.

🔍 **Search Functionality**: Users can search for transactions, merchants, and other relevant information within the application.

🌐 **Responsive Design**: The application is designed to be responsive and accessible across different devices and screen sizes.

## Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```
        git clone https://github.com/your-username/paytm-clone.git
   ```

2. Navigate to the project directory:
   ```
        cd paytm-clone
   ```

3. Install dependencies for the frontend and backend:
   ```
        cd frontend
        npm install
        cd ../backend
        npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add necessary environment variables such as MongoDB connection URI, JWT secret, etc.
Example : 
```
MONGODB_URL = "your-url"
PORT = 3000
```
5. Start the backend server:
   ```
        cd backend
        npm start
   ```

6. Start the frontend development server:
   ```
        cd frontend
        npm start
   ```

7. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

