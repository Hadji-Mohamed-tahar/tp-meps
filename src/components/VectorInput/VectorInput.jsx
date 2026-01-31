import { useState } from "react";
import './VectorInput.css';

export default function VectorInput({ pi, setPi, nextStep, prevStep }) {
  const [error, setError] = useState("");

 // دالة تحديث قيمة داخل متجه الاحتمالات π
const handleChange = (i, value) => {

  // إنشاء نسخة من المتجه الحالي
  const newPi = [...pi];

  // وضع القيمة الجديدة في الخانة رقم i
  newPi[i] = parseFloat(value);

  // حفظ المتجه الجديد في الحالة
  setPi(newPi);
};


// حساب مجموع عناصر المتجه π
const sum = pi.reduce((a, b) => a + b, 0);


// دالة الانتقال للمرحلة التالية بعد التحقق
const handleNext = () => {

  // التحقق أن مجموع الاحتمالات يساوي 1
  if (Math.abs(sum - 1) > 0.0001) {

    // إظهار رسالة خطأ
    setError("مجموع الاحتمالات يجب أن يكون 1");

  } else {

    // حذف رسالة الخطأ
    setError("");

    // الانتقال للواجهة التالية
    nextStep();
  }
};


  return (
    <div className="vector-input-container">
      <h2 className="vector-input-title">إدخال متجه الاحتمالات π(t)</h2>
      <p className="vector-input-description">
        أدخل احتمالات الحالات عند الزمن t. مجموع الاحتمالات يجب أن يساوي 1
      </p>
      
      <div className="vector-grid">
        {pi.map((val, i) => (
          <div key={i} className="vector-item">
            <label className="vector-label">π{i + 1}:</label>
            <input
              className="vector-input"
              type="number"
              step="0.01"
              value={val}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          </div>
        ))}
      </div>
      
      <div className="vector-sum-box">
        <div className="vector-sum-content">
          <span className="vector-sum-label">المجموع:</span>
          <span className={`vector-sum-value ${Math.abs(sum - 1) < 0.0001 ? 'vector-sum-valid' : 'vector-sum-invalid'}`}>
            {sum.toFixed(4)}
          </span>
        </div>
      </div>
      
      {error && <p className="vector-error">{error}</p>}
      
      <div className="vector-buttons">
        <button className="vector-btn vector-btn-back" onClick={prevStep}>
          رجوع
        </button>
        <button className="vector-btn vector-btn-next" onClick={handleNext}>
          التالي
        </button>
      </div>
    </div>
  );
}