import { Link } from 'react-router-dom';
import '../../stylesheets/admissionPolicy.css';

function AdmissionPolicy() {
  return (
    <>
      <div className="admission-page-background" />
      <div className="admission-container">
        <header className="admission-header">
          <h1>JJRSF Christian Leadership Academy Admission Policy</h1>
          <p>
            Please review this policy carefully before submitting your application.
          </p>
        </header>

        <section className="admission-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to the JJRSF Christian Leadership Academy (CLA). Our mission
            is to develop Christian-driven leaders who are adaptive in bringing
            change and are influential in advancing God&apos;s Kingdom on earth.
          </p>
        </section>

        <section className="admission-section">
          <h2>2. Eligibility Criteria</h2>
          <p>
            To be eligible for admission to the Academy, applicants must meet the
            following criteria:
          </p>
          <ul>
            <li>
              <strong>Age:</strong> Applicants must be 18 years and above.
            </li>
            <li>
              <strong>Faith Commitment:</strong> Demonstrate a commitment to
              Christian faith and values.
            </li>
            <li>
              <strong>Educational Background:</strong> Hold a minimum of a
              secondary school certificate or equivalent.
            </li>
            <li>
              <strong>English Proficiency:</strong> Proficiency in English, both
              written and spoken, as all courses are conducted in English.
            </li>
            <li>
              <strong>Technical Requirements:</strong> Access to a computer and
              reliable internet connection to participate in online courses.
            </li>
          </ul>
        </section>

        <section className="admission-section">
          <h2>3. Application Process</h2>
          <p>The application process includes the following steps:</p>
          <ol>
            <li>
              <strong>Online Application Form:</strong> Complete the{' '}
              <Link to="/apply">online application form</Link> available on our
              website.
            </li>
            <li>
              <strong>Personal Statement:</strong> Submit a personal statement
              (100–250 words) detailing your faith journey, leadership
              experience, and reasons for applying to the Academy.
            </li>
            <li>
              <strong>References:</strong> Provide two references from
              individuals who can attest to your character, leadership abilities,
              and commitment to Christian values.
            </li>
            <li>
              <strong>Application Fee:</strong> Pay a non-refundable application
              fee of $10.00.
            </li>
            <li>Wait for a response from our academy.</li>
            <li>Take a placement test.</li>
            <li>
              Successful students will be contacted within a week to commence
              registration and make payment.
            </li>
          </ol>
        </section>

        <section className="admission-section">
          <h2>4. Selection Criteria</h2>
          <p>Applications will be evaluated based on the following:</p>
          <ul>
            <li>
              <strong>Faith and Character:</strong> Demonstrated commitment to
              Christian faith and ethical leadership.
            </li>
            <li>
              <strong>Academic Background:</strong> Previous educational
              achievements and readiness for academic study.
            </li>
            <li>
              <strong>Leadership Potential:</strong> Evidence of leadership
              experience and potential for growth.
            </li>
            <li>
              <strong>References:</strong> Strong endorsements from references.
            </li>
          </ul>
        </section>

        <section className="admission-section">
          <h2>5. Admission Decision</h2>
          <ul>
            <li>
              Admission decisions will be communicated via email within four
              weeks of application submission.
            </li>
            <li>
              Successful applicants will receive an offer letter with details on
              how to enrol in courses and next steps.
            </li>
          </ul>
        </section>

        <section className="admission-section">
          <h2>6. Deferral and Reapplication</h2>
          <ul>
            <li>
              Admitted students may defer their admission for up to one year with
              approval from the Admissions Office.
            </li>
            <li>
              Applicants who are not admitted may reapply in the following
              academic year, addressing any feedback provided in the initial
              decision.
            </li>
          </ul>
        </section>

        <section className="admission-section">
          <h2>7. Non-Discrimination Policy</h2>
          <p>
            The JJRSF CLA does not discriminate based on race, colour, national
            origin, sex, age, or disability. We welcome all individuals who meet
            the eligibility criteria and are committed to our mission and values.
          </p>
        </section>

        <section className="admission-section">
          <h2>8. Contact Information</h2>
          <p>
            For questions or further information about the admission process,
            please contact:
          </p>
          <ul className="admission-contact">
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:admissions@jjrsfchristianleadershipacademy.org">
                admissions@jjrsfchristianleadershipacademy.org
              </a>
            </li>
          </ul>
        </section>

        <section className="admission-section">
          <h2>9. Appendix</h2>
          <ul>
            <li>
              <strong>Application Form:</strong>{' '}
              <Link to="/apply">Online Application Form</Link>
            </li>
            <li>
              <strong>Personal Statement Guidelines:</strong> Include your faith
              journey, leadership experience, and reasons for applying
              (100–250 words).
            </li>
            <li>
              <strong>Reference Form:</strong> Provide two references who can
              speak to your character, leadership, and Christian commitment.
            </li>
          </ul>
        </section>

        <div className="admission-cta">
          <Link to="/apply" className="admission-apply-btn">
            Apply Now
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdmissionPolicy;
