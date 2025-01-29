import db from '../../lib/db';
import jwt from 'jsonwebtoken';
import Cors from 'cors';

// Initialize the CORS middleware
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
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }




  if (req.method === 'GET') {
    // Handle GET request to fetch user info
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const query = `SELECT * FROM users WHERE id = ?;`;
      const [userRows] = await db.query(query, [userId]);

      if (userRows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = userRows[0];
      res.status(200).json({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        institution: user.institution,
        bio: user.bio,
        field_of_research: user.field_of_research,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    // Handle PUT request to update user info
    try {
      // Extract user data from the request body
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const {
        first_name,
        last_name,
        bio,
        institution,
        field_of_research,
        role,
      } = req.body;

      // Validate that required fields are present
      if (!first_name || !last_name || !bio || !institution || !field_of_research || !role) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Query to update user details
      const updateQuery = `
        UPDATE users 
        SET first_name = ?, last_name = ?, bio = ?, institution = ?, field_of_research = ?, role = ?
        WHERE id = ?;
      `;

      const [result] = await db.query(updateQuery, [
        first_name,
        last_name,
        bio,
        institution,
        field_of_research,
        role,
        userId,
      ]);

      // Check if the update was successful
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found or no changes made' });
      }

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Method not allowed for any other HTTP method
    res.status(405).json({ error: 'Method not allowed' });
  }
}
