import React from 'react';
import '../../stylesheets/about.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-image">
          <img src="/bible-study.jpg" alt="Person praying with Bible" />
        </div>
        <div className="about-text">
          <h1 className="about-title">About Our Program</h1>
          <p className="about-description">
            Christian Leadership Academy (CLA) is an academy committed to providing high-quality, faith-based training to students worldwide. The academy&apos;s mission is to equip believers with the necessary knowledge and skills to become effective leaders in their respective spheres of influence. CLA&apos;s curriculum is designed to integrate biblical principles and teachings, empowering students to navigate the challenges of the modern world while maintaining a strong foundation in their Christian faith.
          </p>
          <div className="highlight-text">
            <p>In the first year of running this program, all our courses will be free for all students. This initiative is driven by a desire to make Christian leadership training accessible to a wider audience, regardless of their financial background. By removing financial barriers, CLA aims to create an inclusive environment where individuals from diverse backgrounds can come together, learn, and grow in their spiritual journey.</p>
          </div>
          <p className="about-description">
            We aim to foster a supportive environment where believers can grow spiritually. Through interactive lectures, small group discussions, and mentorship opportunities, CLA provides a nurturing space for students to deepen their understanding of Scripture, develop their leadership abilities, and cultivate a closer relationship with God. By prioritizing spiritual growth, the academy hopes to empower its graduates to become transformative leaders who can positively impact their communities and the world around them.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About; 