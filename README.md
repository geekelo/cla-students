# CLA Learning Portal (Frontend for Students)

## Overview
The CLA Learning Portal frontend is a React-based interface designed for students to access courses, submit assignments, and track their learning progress. It provides an intuitive and user-friendly experience for seamless navigation and interaction with the learning platform.

## Features
- Student authentication and profile management
- Course browsing and enrollment
- Access to course materials and video lessons
- Assignment submission and tracking
- Live class integration
- Progress monitoring and reports
- Notifications and announcements

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm or yarn

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/cla-learning-portal-fe.git
   cd cla-learning-portal-fe
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm start  # or yarn start
   ```

## Deployment
### Docker
1. Build and run the container:
   ```sh
   docker-compose up --build
   ```

### Vercel/Netlify
1. Deploy using Vercel:
   ```sh
   vercel deploy
   ```
2. Deploy using Netlify:
   ```sh
   netlify deploy
   ```

## Environment Variables
Create a `.env` file and configure the following:
```
REACT_APP_API_BASE_URL=https://api.cla-learning.com
REACT_APP_SOCKET_URL=wss://api.cla-learning.com/socket
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

## License
This project is licensed under the MIT License.

