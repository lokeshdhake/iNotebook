import React from 'react'

const About = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center my-4">About iNotebook</h1>

          <p><strong>Welcome to iNotebook</strong></p>
          <p>
            iNotebook is your modern, secure, and intuitive note-taking web application designed to help you organize, access, and manage your thoughts, tasks, and ideas anytime, anywhere.
          </p>

          <h2>Why iNotebook?</h2>
          <p>
            We understand that your notes are more than just words — they are ideas, reminders, and inspiration. iNotebook is built with the mission to make note-taking seamless, secure, and enjoyable. Whether you're a student, professional, or just someone who loves staying organized, iNotebook is tailored for you.
          </p>

          <h3>Key Features</h3>
          <ul className="feature-list">
            <li><strong>Easy-to-Use Interface</strong>: A clean and minimalistic design ensures an intuitive user experience.</li>
            <li><strong>Cloud Sync</strong>: Access your notes across devices without worrying about losing data.</li>
            <li><strong>Categorization & Tagging</strong>: Organize notes effectively with categories and tags for easy retrieval.</li>
            <li><strong>Search Functionality</strong>: Quickly find the notes you need with an advanced search.</li>
            <li><strong>Data Security</strong>: Your notes are encrypted, ensuring privacy and security at all times.</li>
            <li><strong>Dark Mode</strong>: Work comfortably in any lighting condition with our dark mode feature.</li>
          </ul>

          <h3>Our Vision</h3>
          <p>
            At iNotebook, we aim to revolutionize the way people take notes. Our focus is on building a tool that adapts to your needs while keeping simplicity and efficiency at its core.
          </p>

          <h3>Get Started</h3>
          <p>
            Ready to simplify your life and take note-taking to the next level? <a href="/signup">Sign up today</a> and experience the ease of organizing your thoughts with iNotebook.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
