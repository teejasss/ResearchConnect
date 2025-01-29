import db from '../../lib/db';
import bcrypt from 'bcrypt'; // For password hashing
import jwt from 'jsonwebtoken'; 
import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
    origin: '*', // Allow all origins, you can specify specific origins as well
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  });
  
  // Helper function to run middleware
  function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  }
  

export default async function handler(req, res) {
    await runMiddleware(req, res, cors);

    if (req.method === 'POST') {
      try {
        // Extract the token from the Authorization header
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'Authorization token missing or invalid' });
        }
  
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
  
        // Validate the token (optional: implement your own token validation logic)
        // Example: const isValidToken = validateToken(token);
        // if (!isValidToken) {
        //   return res.status(401).json({ message: 'Invalid token' });
        // }
  
        // Parse the body to extract the project details
        const { title, description } = req.body;
  
        if (!title || !description) {
          return res.status(400).json({ message: 'Title and description are required' });
        }
  
        // Example logic: Save the project to your database
        // Replace this with your actual database integration logic
        // const newProject = {
        //   id: Math.random().toString(36).substr(2, 9), // Example: Generate a random ID
        //   title,
        //   description,
        //   createdAt: new Date(),
        // };
  
        // Mock database save (replace with actual DB logic)
 // Adjust the path to your database configuration

        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 1);

        const query = `
        INSERT INTO projects (title, description, start_date, end_date, status, created_by)
        VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [
        title, 
        description, 
        startDate.toISOString().slice(0, 19).replace('T', ' '), 
        endDate.toISOString().slice(0, 19).replace('T', ' '), 
        'ongoing',  
        userId      // Replace with the actual user ID from the token
        ];

        const [rows] = await db.query(query, values);
        console.log(rows);
        
        return res.status(201).json({ message: 'Project submitted successfully' });
        

        // console.log('Project saved:', newProject);

      } catch (error) {
        console.error('Error processing project submission:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Handle unsupported methods
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  }
  