import React, { useContext } from 'react';
import './HomePage.css'; // Import the CSS file
import Footer from './Footer';
import { AuthContext } from './AuthContext'; // Import the AuthContext

const HomePage = () => {
  // Use AuthContext to get the current user
  const { getCookie } = useContext(AuthContext); // Assuming the currentUser is in AuthContext
  const currentUser = getCookie("email");
  console.log(currentUser);
  // Conditionally set the link for "Get Started" based on whether the user is logged in
  const redirectLink = currentUser ? "/profile" : "/login";

  return (
    <div>
      <div className="container-custom">
        <section className="hero-section">
          <div className="hero-text">
            <h1 className="hero-title">Research Collaboration Platform</h1>
            <p className="hero-subtitle">Connecting researchers and facilitating academic collaborations.</p>
            <a href={redirectLink} className="cta-button">Get Started</a>
          </div>
        </section>

        {/* Main Content */}
        <div className="row-custom mt-custom-3">
          {/* Overview of Features */}
          <div className="col-custom-12 card-custom">
            <h2 className="heading-custom">Overview of Platform Features</h2>
            <ul>
              <li>Connect with fellow researchers based on shared interests.</li>
              <li>Submit and track project proposals.</li>
              <li>Access funding and grant opportunities.</li>
              <li>Stay informed about academic events and conferences.</li>
            </ul>
          </div>

          {/* Latest News and Updates */}
          <div className="col-custom-12 card-custom">
            <h2 className="heading-custom">Latest News and Updates</h2>
            <ul>
              <li>Research Symposium 2024 announced for December.</li>
              <li>New funding opportunities for AI and Machine Learning research.</li>
              <li>Platform updates: Real-time chat and improved file sharing.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
