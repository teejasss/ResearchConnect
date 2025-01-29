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
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed, only GET is accepted' });
  }

  try {
    // Replace the query with fields from your `events` table
    const [results] = await db.query(`
      SELECT 
        id, 
        title, 
        start_date AS start, 
        end_date AS end, 
        description 
      FROM events 
      ORDER BY start_date DESC
    `);
      console.log()
    // Format results to match the expected structure (if needed)
    const formattedEvents = results.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      location: event.location, // Include location if relevant
      description: event.description, // Include description if relevant
    }));
    console.log(formattedEvents);

    return res.status(200).json({ events: formattedEvents });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching events', details: error.message });
  }
}
