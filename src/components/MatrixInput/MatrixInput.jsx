import { useState } from "react";
import './MatrixInput.css';

export default function MatrixInput({ M, setM, nextStep, prevStep }) {
  const [error, setError] = useState("");

  
 // دالة تحديث قيمة داخل مصفوفة الانتقال M
const handleChange = (i, j, value) => {

  // إنشاء نسخة من المصفوفة الأصلية
  const newM = M.map(row => [...row]);

  // وضع القيمة الجديدة في الخانة (i , j)
  newM[i][j] = parseFloat(value);

  // حفظ المصفوفة الجديدة في الحالة
  setM(newM);
};


// دالة الانتقال للمرحلة التالية بعد التحقق من صحة المصفوفة
const handleNext = () => {

  // المرور على كل صف في المصفوفة
  for (let i = 0; i < M.length; i++) {

    // حساب مجموع عناصر الصف i
    const sum = M[i].reduce((a, b) => a + b, 0);

    // التحقق أن مجموع الصف يساوي 1
    if (Math.abs(sum - 1) > 0.0001) {

      // عرض رسالة خطأ للمستخدم
      setError(`مجموع الصف ${i + 1} يجب أن يكون 1`);

      // إيقاف الانتقال
      return;
    }
  }

  // إذا كانت كل الصفوف صحيحة نحذف رسالة الخطأ
  setError("");

  // الانتقال للواجهة التالية
  nextStep();
};

  return (
    <div className="matrix-input-container">
      <h2 className="matrix-input-title">إدخال مصفوفة الانتقال</h2>
      <p className="matrix-input-description">
        أدخل احتمالات الانتقال. مجموع كل صف يجب أن يساوي 1
      </p>
      
      <div className="matrix-wrapper">
        <div className="matrix-grid">
          {M.map((row, i) => (
            <div key={i} className="matrix-row">
              {row.map((val, j) => (
                <input
                  key={j}
                  className="matrix-cell-input"
                  type="number"
                  step="0.01"
                  value={val}
                  onChange={(e) => handleChange(i, j, e.target.value)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {error && <p className="matrix-error">{error}</p>}
      
      <div className="matrix-buttons">
        <button className="matrix-btn matrix-btn-back" onClick={prevStep}>
          رجوع
        </button>
        <button className="matrix-btn matrix-btn-next" onClick={handleNext}>
          التالي
        </button>
      </div>
    </div>
  );
}