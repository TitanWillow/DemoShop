# eCommerce Checkout Flow Simulation Project - DemoShop

This project simulates a 3-page mini eCommerce product purchase journey, including a Product Listing Page, Product Detail Page, Checkout Page, and Thank You Page.

## Tech Stack

* **Frontend:** React (with Tailwind CSS for styling)
* **Backend:** Node.js with Express.js
* **Database:** MongoDB
* **Email Simulation:** Mailtrap.io

## Project Structure (Single Repository)

This repository contains both the frontend and backend applications in separate folders:

* `/frontend/`: Contains the React application.
* `/backend/`: Contains the Node.js/Express.js application.


## Local Setup and Running Instructions

**1. Clone the Repository:**

```bash
git clone <your-repository-url>
cd <your-project-directory-name>
```

**2. Backend Setup:**

a. Navigate to the backend directory: 
```bash
cd backend
```

b. Install dependencies:

```bash
npm install
```

c. Create the environment file:

* Copy the contents of backend/.env.example into a new file named backend/.env.
* Open backend/.env and **fill in your actual details**:\* **MONGODB\_URI**: Your MongoDB connection string.
* **PORT**: The port for the backend server.
* **MAILTRAP\_HOST**: Usually sandbox.smtp.mailtrap.io.
* **MAILTRAP\_PORT**: Usually 2525.
* **MAILTRAP\_USER**: Your Mailtrap username.
* **MAILTRAP\_PASS**: Your Mailtrap password.

**3\. Frontend Setup:**

a. Navigate to the frontend directory

```bash
cd ../frontend
```

b. Install dependencies:
```bash
npm install
```

c. Create the local environment file:

* The frontend is configured to connect to the backend API at http://localhost:5001/api by default.
* If you need to change this, copy frontend/.env.example to a new file named frontend/.env.local.
* Then, modify the API base URL variable in frontend/.env:
* *REACT\_APP\_API\_BASE\_URL="http://localhost:YOUR\_BACKEND\_PORT/api"

**4\. Seed the Database:**

a. **Start your backend server first**.

b. Once the backend is running and connected to MongoDB, you need to populate it with initial product data. Send a POST request to the following backend API endpoint:http://localhost:5001/api/products/seed
* You can use a tool like Postman or Insomnia to make this POST request. No request body is needed.
* Alternatively, you can use curl in your terminal:bash curl -X POST http://localhost:5001/api/products/seed. This will populate the products collection in your MongoDB database. This typically only needs to be done once. Check the backend console for success messages.

**5\. Running the Application:**

You will need **two separate terminal windows/tabs** to run the backend and frontend concurrently.

a. **Terminal 1: Start the Backend Server**
* Navigate to the backend directory:
```bash
cd backend
```
* Run the development script (which usually uses nodemon if configured):
```bash
npm run dev
```
* The backend server should start, typically on port 5001. Look for console messages like "MongoDB Connected..." and "Server running on port 5001".

b. **Terminal 2: Start the Frontend Development Server**
* Navigate to the frontend directory:
```bash
cd frontend
```
\* Run the start script:
```bash
npm start
```
* This will usually open the application automatically in your default web browser, typically at http://localhost:3000

**6\. Using the Application:**

*   Browse products on the landing page.
    
*   Use the search bar to filter products.
    
*   View product details by clicking on a product. Note any low stock indicators.
    
*   Select variants (if available) and quantity.
    
*   Add items to the cart using "Add to Cart" or proceed directly with "Buy Now".
    
*   View and manage your cart from the cart icon in the navbar.
    
*   Proceed to checkout and fill in the form.
    
*   **Transaction Simulation (using the Card Number field):**
    
    *   Card Number ending in 1: Simulates an **Approved Transaction**.
        
    *   Card Number ending in 2: Simulates a **Declined Transaction**.
        
    *   Card Number ending in 3: Simulates a **Gateway Error**.
        
*   After submitting the checkout form, you will be redirected to a Thank You / Order Status page.
    
*   Check your Mailtrap.io inbox for simulated order confirmation or failure emails
