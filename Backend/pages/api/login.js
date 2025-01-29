import db from '../../lib/db';
import bcrypt from 'bcrypt'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating tokens
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

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Validate the input
  if (!email || !password) {
    return res.status(400).json({ status: 'error', error: 'Email and password are required' });
  }

  try {
    // Query the database for the user with the given email
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    // If no user is found, return error
    if (rows.length === 0) {
      return res.status(401).json({ status: 'error', error: 'Invalid email or password' });
    }

    const user = rows[0];
    
    // Check if the password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ status: 'error', error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.user_type }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '24h' } // Token expiration time
    );
    console.log(user)
    // Return a successful response with the token and user data
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      first_name: user.first_name,
      last_name: user.last_name,
      user_id: user.id,
      role: user.user_type,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
}
