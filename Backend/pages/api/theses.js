import db from '../../lib/db';  // Import your database connection
import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*',  // Adjust this if you need to restrict the allowed origins
});

// Middleware to run CORS before handling the request
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

// API handler
export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed, only GET is accepted' });
  }

  // Get query parameters (if any) from the request
  const { topic, author, year, keywords, thesis_id } = req.query;

  try {
    // Create the base query for fetching theses
    let query = 'SELECT * FROM theses WHERE 1=1';
    const queryParams = [];

    // If thesis_id is passed, filter by thesis_id
    if (thesis_id) {
      query += ' AND thesis_id = ?';
      queryParams.push(thesis_id);
    }

    // Apply filters based on other query parameters
    if (topic) {
      query += ' AND keywords LIKE ?';
      queryParams.push(`%${topic}%`);
    }
    if (author) {
      query += ' AND author LIKE ?';
      queryParams.push(`%${author}%`);
    }
    if (year) {
      query += ' AND year = ?';
      queryParams.push(year);
    }
    if (keywords) {
      query += ' AND keywords LIKE ?';
      queryParams.push(`%${keywords}%`);
    }

    // Execute the query
    const [rows] = await db.query(query, queryParams);

    // Return the filtered results
    res.status(200).json({ theses: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch theses, internal server error' });
  }
}
