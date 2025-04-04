import React from "react";
import "../../stylesheets/about.css";

function About() {
  return (
    <>
      <div className="about-page-background" />
      <div className="about-container">
        <div className="about-content">
          <div className="about-image">
            <img src="/bible-study.jpg" alt="Person praying with Bible" />
          </div>
          <div className="about-text">
            <h1 className="about-title">About Our Program</h1>
            <p className="about-description">
              We aim to foster a supportive environment where believers can grow
              spiritually. Through interactive lectures, small group
              discussions, and mentorship opportunities.
            </p>
            <div className="highlight-text">
              <p>
                CLA provides a nurturing space for students to deepen their
                understanding of scripture, develop their leadership abilities,
                and cultivate a closer relationship with God.
              </p>
            </div>
            <p className="about-description">
              By prioritizing spiritual growth, the Academy hopes to empower its
              graduates to become servant transformational leaders who can
              positively impact their communities and the world around them.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
