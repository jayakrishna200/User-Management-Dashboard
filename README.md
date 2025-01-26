# User Management System

A React-based user management system that allows you to perform CRUD operations on user data.

## Features

- Display users in a responsive table
- Add new users
- Edit existing users
- Delete users
- Pagination
- Form validation
- Responsive design for all device sizes
- Error handling
- Loading states

## Project Structure

```
src/
├── components/
│   ├── ErrorBoundary/
│   │   ├── index.js
│   │   └── index.css
│   ├── UserList/
│   │   ├── index.js
│   │   └── index.css
│   └── UserForm/
│       ├── index.js
│       └── index.css
├── App.js
├── App.css
├── index.js
└── index.css
```

## Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Technical Details

- Built with React.js (Class Components)
- Uses react-icons for icons
- Implements responsive design using CSS media queries
- Uses JSONPlaceholder API for mock data
- Form validation for required fields and email format

## Challenges Faced

1. **API Integration**: Handled transformation of JSONPlaceholder data to match our schema
2. **State Management**: Implemented proper state updates for CRUD operations
3. **Form Validation**: Added client-side validation for better user experience
4. **Responsive Design**: Ensured consistent layout across different device sizes

## Potential Improvements

1. Add search and filter functionality
2. Implement sorting for table columns
3. Add user authentication
4. Add more form validation rules
5. Implement real-time updates
6. Add unit tests
7. Add loading states for better UX