import Keys from "./Keys";
import { create } from "zustand";

type ResultStore = {
  answer: string;
  evaluated: boolean;
  appendValue: (val: string) => void;
  clear: () => void;
  allClear: () => void;
  evaluate: () => void;
};

const isOperator = (val: string) => ['+', '-', '*', '/', '%', '^'].includes(val);
const isDigit = (val: string) => /^[0-9.]$/.test(val);

const useResultStore = create<ResultStore>((set, get) => ({
  answer: "0",
  evaluated: false,
  appendValue: (val) => {
    const { answer, evaluated } = get();

    if (evaluated) {
      // Continue calculation if operator pressed after evaluation
      if (isOperator(val)) {
        set({ answer: answer + val, evaluated: false });
      } else {
        set({ answer: val, evaluated: false });
      }
      return;
    }

    // Prevent multiple decimal points in the current number
    if (val === '.' && answer.split(/[-+*/%^]/).pop()?.includes('.')) return;

    // Replace leading zero (except for decimals)
    if (answer === "0" && isDigit(val) && val !== '.') {
      set({ answer: val });
    }
    // Prevent multiple operators in sequence
    else if (isOperator(val) && isOperator(answer.slice(-1))) {
      set({ answer: answer.slice(0, -1) + val });
    }
    else {
      set({ answer: answer + val });
    }
  },
  clear: () => {
    const current = get().answer;
    set({ answer: current.length > 1 ? current.slice(0, -1) : "0" });
  },
  allClear: () => set({ answer: "0", evaluated: false }),
  evaluate: () => {
    try {
      let expr = get().answer.replace(/\^/g, '**');
      if (!expr) {
        set({ answer: "0", evaluated: true });
        return;
      }
      const result = new Function('return ' + expr)();
      set({ answer: result.toString(), evaluated: true });
    } catch {
      set({ answer: "Error", evaluated: true });
    }
  },
}));

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
