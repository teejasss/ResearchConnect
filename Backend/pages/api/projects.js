// pages/api/projects.js
import db from '../../lib/db'; 
import Cors from 'cors';

// Initialize CORS middleware
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

  if (req.method === 'GET') {
    try {
      const query = 'SELECT id, title, status FROM projects'; // Query to fetch project data
      const [results] = await db.query(query); // Execute the query

      res.status(200).json(results); // Send the results as JSON
    } catch (error) {
      console.error('Error fetching project data:', error);
      res.status(500).json({ error: 'Failed to fetch project data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
