
export type ResultStore = {
    answer: string;
    appendValue: (val: string) => void;
    clear: () => void;
    evaluated:boolean;
    allClear: () => void;
    evaluate: () => void;
};

