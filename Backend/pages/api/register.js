import db from '../../lib/db';
import bcrypt from 'bcrypt'; // For password hashing

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // Allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Preflight request
  }

  // Ensure only POST method is allowed
  if (req.method !== 'POST') {
    console.log("POST");
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    firstName,
    lastName,
    email,
    password,
    role,
    institution,
    fieldOfResearch,
    bio,
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if the email already exists in the database
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await db.query(
      `
      INSERT INTO users (first_name, last_name, email, password_hash, role, institution, field_of_research, bio) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        firstName,
        lastName,
        email,
        hashedPassword,
        role,
        institution || null, // Handle optional institution field
        fieldOfResearch || null, // Handle optional field of research
        bio || null, // Handle optional bio field
      ]
    );

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Database error:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
}
