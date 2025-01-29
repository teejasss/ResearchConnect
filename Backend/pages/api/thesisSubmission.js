import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import db from '../../lib/db'; // Ensure you have a database connection file

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle file uploads
  },
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for specific origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), 'public', 'uploads'),
    keepExtensions: true,
    allowEmptyFiles: false,
  });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Extract form fields
    const { thesisTitle, authorName, email, keywords, year, author_id } = fields;
    const thesisDocument = files.uploadFile;

    // Validate required fields
    if (!thesisTitle || !authorName || !email || !keywords || !year || !author_id || !thesisDocument) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Handle the uploaded file path
    const uploadedFilePath = thesisDocument.filepath || thesisDocument[0]?.filepath;
    if (!uploadedFilePath) {
      return res.status(500).json({ error: 'File upload failed. File path is missing.' });
    }

    // Define the saved path for the uploaded document
    const fileUrl = path.join('/uploads', path.basename(uploadedFilePath));

    try {
      // Save data to the database
      const [result] = await db.query(
        'INSERT INTO theses (title, author_id, email, keywords, year, file_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          thesisTitle,
          author_id,
          email,
          keywords,
          year,
          fileUrl,
          new Date(),
        ]
      );

      // Respond with success
      res.status(200).json({
        message: 'Thesis submitted successfully',
        thesisId: result.insertId,
      });
    } catch (dbError) {
      console.error('Database Error:', dbError);
      res.status(500).json({ error: 'Failed to save thesis to the database' });
    }
  } catch (formError) {
    console.error('Formidable Error:', formError);
    res.status(500).json({ error: 'Error processing form data' });
  }
}
