import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HelpSupportPage = () => {
  const [faqVisible, setFaqVisible] = useState(true);
  const [guidesVisible, setGuidesVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const faqs = [
    { question: "How do I create an account?", answer: "To create an account, click on the 'Sign Up' button on the top right." },
    { question: "How do I reset my password?", answer: "Click on 'Forgot Password' and follow the instructions sent to your email." },
    { question: "How can I update my profile information?", answer: "Go to 'Profile Settings' under your account and make the necessary changes." },
    { question: "How do I delete my account?", answer: "Please contact our support team through the contact form for account deletion requests." },
    { question: "How can I collaborate with others on the platform?", answer: "Use the 'Collaborate' option on project pages or reach out to users via the messaging feature." },
    { question: "What file formats are supported for uploads?", answer: "Supported formats include PDF, DOCX, and XLSX. Other formats may not upload successfully." },
    { question: "How do I submit a research proposal?", answer: "Visit the 'Submit Proposal' page, fill in the required fields, and upload relevant documents." },
    { question: "What should I do if I encounter a technical issue?", answer: "Try refreshing the page. If the issue persists, please reach out to our support team with details." },
    { question: "How can I access the latest research articles?", answer: "Use the 'Research Library' section and apply filters to find the most recent publications." },
    { question: "Is my data secure on this platform?", answer: "Yes, we prioritize security by using encryption and secure authentication methods to protect your data." },
  ];

  const guides = [
    { title: "Getting Started Guide", link: "#/getting-started" },
    { title: "Profile Setup Tutorial", link: "#/profile-setup" },
    { title: "Collaboration Tools Guide", link: "#/collaboration-tools" },
    { title: "Uploading and Managing Documents", link: "#/document-management" },
    { title: "Submitting Research Proposals", link: "#/submit-proposal" },
    { title: "Navigating the Research Library", link: "#/research-library" },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="help-support-page container-custom">
      <h1>Help & Support</h1>
      
      {/* FAQ Section */}
      <div className="faq-section">
        <h2 onClick={() => setFaqVisible(!faqVisible)}>
          Frequently Asked Questions
          <i className={`fas ${faqVisible ? 'fa-chevron-up' : 'fa-chevron-down'} ml-2`}></i>
        </h2>
        {faqVisible && (
          <ul>
            {faqs.map((faq, index) => (
              <li key={index}>
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User Guides Section */}
      <div className="guides-section">
        <h2 onClick={() => setGuidesVisible(!guidesVisible)}>
          User Guides & Tutorials
          <i className={`fas ${guidesVisible ? 'fa-chevron-up' : 'fa-chevron-down'} ml-2`}></i>
        </h2>
        {guidesVisible && (
          <ul>
            {guides.map((guide, index) => (
              <li key={index}>
                <a href={guide.link}>{guide.title}</a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Contact Form Section */}
      <div className="contact-form-section card">
        <h2 onClick={() => setContactVisible(!contactVisible)}>
          Contact Support
          <i className={`fas ${contactVisible ? 'fa-chevron-up' : 'fa-chevron-down'} ml-2`}></i>
        </h2>
        {contactVisible && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <br></br>
              <input
                type="text"
                name="name"
                className='form-input'
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <br></br>
              <input
                type="email"
                name="email"
                className='form-input'
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Message</label>
              <br></br>
              <textarea
                name="message"
                className='form-input'
                value={formData.message}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit" className='submit-button'>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HelpSupportPage;
