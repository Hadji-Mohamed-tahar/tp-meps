import { useState } from "react";
import './Controls.css';

export default function Controls({ label, value, onChange, nextStep, prevStep, min = 0 }) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (value < min) {
      setError(`القيمة يجب أن تكون أكبر أو تساوي ${min}`);
    } else {
      setError("");
      nextStep();
    }
  };

  return (
    <div className="controls-container">
      <h2 className="controls-title">{label}</h2>
      <div className="controls-input-wrapper">
        <input
          className="controls-input"
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
        />
      </div>
      {error && <p className="controls-error">{error}</p>}
      <div className="controls-buttons">
        {prevStep && (
          <button className="controls-btn controls-btn-back" onClick={prevStep}>
            رجوع
          </button>
        )}
        <button className="controls-btn controls-btn-next" onClick={handleNext}>
          التالي
        </button>
      </div>
    </div>
  );
}