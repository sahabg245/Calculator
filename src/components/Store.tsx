import { create } from "zustand";

export type ResultStore = {
  answer: string;
  evaluated: boolean;
  appendValue: (val: string) => void;
  clear: () => void;
  allClear: () => void;
  evaluate: () => void;
};

const isOperator = (val: string) => ['+', '-', '*', '/', '%', '^'].includes(val);
const isDigit = (val: string) => /^[0-9.]$/.test(val);

export const useResultStore = create<ResultStore>((set, get) => ({
  answer: "0",
  evaluated: false,

  appendValue: (val) => {
    const { answer, evaluated } = get();

    if (evaluated) {
      if (isOperator(val)) {
        set({ answer: answer + val, evaluated: false });
      } else {
        set({ answer: val, evaluated: false });
      }
      return;
    }

    if (val === '.' && answer.split(/[-+*/%^]/).pop()?.includes('.')) return;

    if (answer === "0" && isDigit(val) && val !== '.') {
      set({ answer: val });
    }
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

export { isOperator };
