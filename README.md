# convie

# Installation

- Git clone both repos
- npm install
- Phpmyadmin -> Create New Database
  - Priviligies -> Add user acc.
  - Create new login information
  - Import the sql file in the backend folder
- Create .env file in the root of both frontend and backend
- Go to backend .env file and add the lines below
  - host=localhost
  - user=yourusername
  - password=yourpassword
  - database=yourdatabasename
  - port=8889
  - Change user, password, database with your own your details
- Go to frontend .env file and paste REACT_APP_URL=http://localhost:5000
- Change 5000 depending on your port

# Roadmap

- Implementing a grocery service delivery(like ubereats)
- Drivers/riders can sign up and get notifications when an order is placed
- Delivery is completed when drivers deliver the groceries
