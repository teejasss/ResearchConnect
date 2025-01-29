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
    // Create the base query for fetching peer reviews with JOIN on the users table
    let query = `
      SELECT 
        pr.*, 
        u.first_name AS author 
      FROM 
        peer_reviews pr
      LEFT JOIN 
        users u ON u.user_id = pr.reviewer_id
      WHERE 1=1
    `;
    const queryParams = [];

    // If thesis_id is passed, filter by thesis_id
    if (thesis_id) {
      query += ' AND pr.thesis_id = ?';
      queryParams.push(thesis_id);
    }

    // Apply filters based on other query parameters
    if (topic) {
      query += ' AND pr.keywords LIKE ?';
      queryParams.push(`%${topic}%`);
    }
    if (author) {
      query += ' AND u.first_name LIKE ?';
      queryParams.push(`%${author}%`);
    }
    if (year) {
      query += ' AND pr.year = ?';
      queryParams.push(year);
    }
    if (keywords) {
      query += ' AND pr.keywords LIKE ?';
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
