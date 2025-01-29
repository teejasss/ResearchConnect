import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCthwm311KOpoWW6oYFoVErC23oizgDYog",
  authDomain: "research-collab-9e749.firebaseapp.com",
  projectId: "research-collab-9e749",
  storageBucket: "research-collab-9e749.firebasestorage.app",
  messagingSenderId: "741557075533",
  appId: "1:741557075533:web:682e058bd04ade52d86604",
  measurementId: "G-J3M9765FQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const FileSharing = () => {
  const [file, setFile] = useState(null);
  const [filesList, setFilesList] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        console.log("File uploaded successfully:", file.name);
        setFile(null);
        fetchFiles(); // Refresh the file list after upload
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Fetch files from Firebase Storage
  const fetchFiles = async () => {
    const listRef = ref(storage, 'uploads/');
    try {
      const res = await listAll(listRef);
      const files = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        })
      );
      setFilesList(files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="file-sharing container-custom">
      <h2>File Sharing</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          required
          className="form-control-custom"
        />
        <br />
        <button type="submit" className="btn-custom">Upload</button>
      </form>
      <h3>Available Files:</h3>
      {filesList.length === 0 ? (
        <p>No files available.</p>
      ) : (
        <ul>
          {filesList.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileSharing;
