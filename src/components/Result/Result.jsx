import './Result.css';

export default function Result({ result, restart }) {
  if (!result) return null;

// استخراج القيم المخزنة داخل result
// MK : مصفوفة الانتقال مرفوعة للقوة (K - t)
// piK : متجه الاحتمالات النهائي عند الزمن K
// K  : الزمن النهائي
// t  : الزمن الابتدائي
const { MK, piK, K, t } = result;

  return (
    <div className="result-container">
      <h2 className="result-main-title">
        النتائج النهائية
      </h2>

      {/* قسم متجه الاحتمالات */}
      <div className="result-vector-section">
        <h3 className="result-section-title">
          متجه الاحتمالات π({K}):
        </h3>
        
        <div className="result-values-grid">
          {piK.map((val, i) => (
            <div key={i} className="result-value-card">
              <div className="result-value-label">π{i + 1}:</div>
              <div className="result-value-number">{val.toFixed(6)}</div>
            </div>
          ))}
        </div>
        
        <div className="result-sum-box">
          <div className="result-sum-text">
            <span className="result-sum-label">المجموع:</span>
            <span className="result-sum-value">
              {piK.reduce((a, b) => a + b, 0).toFixed(6)}
            </span>
          </div>
        </div>
      </div>

      {/* قسم المصفوفة */}
      <div className="result-matrix-section">
        <h3 className="result-matrix-title">
          المصفوفة M^{K - t}:
        </h3>
        
        <div className="result-matrix-wrapper">
          {MK.map((row, i) => (
            <div key={i} className="result-matrix-row">
              {row.map((val, j) => (
                <div key={j} className="result-matrix-cell">
                  {val.toFixed(4)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* زر إعادة التشغيل */}
      <button className="result-restart-button" onClick={restart}>
        بدء حساب جديد
      </button>
    </div>
  );
}