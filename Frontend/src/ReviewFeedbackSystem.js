import React, { useState, useEffect } from 'react';

const ReviewFeedbackSystem = ({ selectedProjectId, projectTitle }) => {
  const [feedback, setFeedback] = useState('');
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews);
  }, []);


  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log(selectedProjectId, feedback.trim());
    if (selectedProjectId && feedback.trim()) {
      const newReview = {
        projectId: selectedProjectId,
        projectTitle: projectTitle || 'Unknown Project',
        feedback: feedback,
      };
      console.log(newReview);
      // Update reviews in localStorage
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));

      // Show success message
      alert('Project review submitted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds

      // Clear feedback input
      setFeedback('');
    }
  };

  return (
    <div className="review-feedback">
      <h2>Review and Feedback System</h2>
      {successMessage && <div className="alert-success">{successMessage}</div>}
      <form onSubmit={handleReviewSubmit}>
        <div className="form-group">
          <label>Your Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            className="form-control-custom"
          />
        </div>
        <button type="submit" className="btn-custom">Submit Feedback</button>
      </form>
      <div className="reviews">
        <h3>Submitted Reviews</h3>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.projectTitle}:</strong> {review.feedback}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewFeedbackSystem;
