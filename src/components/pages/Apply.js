import { useEffect, useRef } from 'react';
import '../../stylesheets/apply.css';

const SURVEY_ACTIVITY = 'inCMwsYs9';

function Apply() {
  const embedRef = useRef(null);

  useEffect(() => {
    const container = embedRef.current;
    if (!container) return undefined;

    container.innerHTML = '';

    const width = Math.min(720, Math.max(320, container.clientWidth || 412));
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://surveymars.com/js/qembed.js?activity=${SURVEY_ACTIVITY}&source=iframe&width=${width}`;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <>
      <div className="apply-page-background" />
      <div className="apply-container">
        <div className="apply-header">
          <h1 className="apply-title">Application Form</h1>
          <p className="apply-subtitle">
            Complete the form below to apply to JJRSF Christian Leadership Academy.
          </p>
        </div>
        <div className="apply-embed" ref={embedRef} />
      </div>
    </>
  );
}

export default Apply;
