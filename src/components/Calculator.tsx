import Keys from "./Keys";
import { useResultStore, isOperator } from '../components/Store';

const Calculator = () => {
  const { answer, appendValue, clear, allClear, evaluate } = useResultStore();

  const keys = [
    "AC", "C", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "^", "=",
  ];

  const handleClick = (key: string) => {
    if (key === "AC") allClear();
    else if (key === "C") clear();
    else if (key === "=") evaluate();
    else appendValue(key);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-80">
        <h1 className="text-white text-2xl font-bold text-center mb-6">
          Calculator
        </h1>
        <div className="bg-white rounded-lg p-4 mb-6 text-right overflow-x-auto">
          <div className="text-3xl font-semibold text-gray-800 h-10">
            {answer || "0"}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {keys.map((item, index) => (
            <Keys
              label={item}
              key={index}
              onClick={() => handleClick(item)}
              isOperator={isOperator(item) || item === "=" || item === "%"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
