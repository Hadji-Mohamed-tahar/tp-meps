import { useState, useEffect } from "react";
import MatrixInput from "./components/MatrixInput/MatrixInput";
import VectorInput from "./components/VectorInput/VectorInput";
import Controls from "./components/Controls/Controls";
import Result from "./components/Result/Result";
import "./App.css";

function App() {
  const [step, setStep] = useState(1); // لتحديد الواجهة الحالية
  const [Nb, setNb] = useState(2);
  const [M, setM] = useState([
    [0, 0],
    [0, 0],
  ]);
  const [t, setT] = useState(0);
  const [pi0, setPi0] = useState([0, 0]);
  const [K, setK] = useState(0);
  const [result, setResult] = useState(null);

  // تحديث حجم المصفوفة والمتجه تلقائياً عند تغيير Nb
  useEffect(() => {
    setM(Array.from({ length: Nb }, () => Array(Nb).fill(0)));
    setPi0(Array(Nb).fill(0));
  }, [Nb]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

// دالة حساب نتائج سلسلة ماركوف
const handleCompute = () => {
  // حساب عدد الخطوات الزمنية بين t و K
  const power = K - t;
  // حساب مصفوفة الانتقال M مرفوعة للقوة (K - t)
  let MK = matrixPower(M, power);
  // حساب متجه الاحتمالات النهائي π(K)
  // π(K) = π(t) × M^(K - t)
  let piK = multiplyVectorMatrix(pi0, MK);
  // حفظ النتائج لعرضها في صفحة النتائج
  setResult({ MK, piK, K, t });
  // الانتقال إلى واجهة عرض النتائج
  nextStep();
};


  return (
    <div className="app">
      <div className="header-container">
        <h1 className="app-title">محاكي سلسلة ماركوف</h1>
        <p className="app-description">
          هذا التطبيق يسمح لك بإدخال عدد الحالات، مصفوفة الانتقال، متجه
          الاحتمالات والزمن لحساب متجه الاحتمالات النهائي π(K) باستخدام معادلة:
          <strong className="equation">π(K) = π(t) × M^(K-t)</strong>
        </p>
        <hr className="header-divider" />
      </div>

      {step === 1 && (
        <Controls
          label="عدد الحالات"
          value={Nb}
          onChange={setNb}
          nextStep={nextStep}
          min={1}
        />
      )}
      {step === 2 && (
        <MatrixInput
          M={M}
          setM={setM}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Controls
          label="الزمن t"
          value={t}
          onChange={setT}
          nextStep={nextStep}
          prevStep={prevStep}
          min={0}
        />
      )}
      {step === 4 && (
        <VectorInput
          pi={pi0}
          setPi={setPi0}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && (
        <Controls
          label="الزمن النهائي K"
          value={K}
          onChange={setK}
          nextStep={handleCompute}
          prevStep={prevStep}
          min={1}
        />
      )}
      {step === 6 && <Result result={result} restart={() => setStep(1)} />}
    </div>
  );
}
// --- دوال الحساب ---


// دالة ضرب متجه (Vector) في مصفوفة (Matrix)
// vector: [v1, v2, ...]
// matrix: [[m11, m12, ...], [m21, m22, ...], ...]
// الناتج: متجه جديد (Vector) بحجم نفس المتجه الأصلي
function multiplyVectorMatrix(vector, matrix) {
  return vector.map((_, i) =>
    // نحسب العنصر i في الناتج
    // sum = v1*m1i + v2*m2i + ... + vn*mni
    vector.reduce((sum, val, j) => sum + val * matrix[j][i], 0)
  );
}


// دالة ضرب مصفوفتين (Matrix Multiplication)
// a و b يجب أن يكونا مربعتين بنفس الحجم
function multiplyMatrices(a, b) {
  let size = a.length;

  // إنشاء مصفوفة نتيجة بحجم size × size وملؤها بصفر
  let res = Array.from({ length: size }, () => Array(size).fill(0));

  // ضرب المصفوفتين باستخدام 3 حلقات (i, j, k)
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++)
      for (let k = 0; k < size; k++)
        res[i][j] += a[i][k] * b[k][j];

  return res;
}


// دالة رفع المصفوفة لأس (matrix^n)
// matrix: مصفوفة مربعة
// n: الأس (عدد مرات الضرب)
function matrixPower(matrix, n) {
  let size = matrix.length;

  // إنشاء مصفوفة الوحدة (Identity Matrix) بحجم size
  // مثال للهوية 3×3:
  // [1,0,0]
  // [0,1,0]
  // [0,0,1]
  let result = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
  );

  // نضرب matrix بنفسها n مرة
  for (let k = 0; k < n; k++) {
    result = multiplyMatrices(result, matrix);
  }

  return result;
}


export default App;
