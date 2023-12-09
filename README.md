# Solution

This solution uses a CSV file as the database and Node.js with Express.js to create the server. The MERN stack is my go-to stack for building applications. The tricky part is to compare dates carefully.

The following libraries are used for additional functionality:

- `pdfkit` for PDF generation
- `nodemailer` for sending emails

## Request

To get a response, send the following request to the endpoint `http://localhost:3000/api/statement`:

{
"startDate":"2022-12-15",
"endDate":"2022-12-17",
"email":"'mohammadpalla@yahoo.com'"
}

## Authentication

User authentication can be achieved using `passport.js`. Each route can be protected by adding its middleware. During login, a token can be sent, and while making API calls, the tokens can be compared to authenticate the user.
