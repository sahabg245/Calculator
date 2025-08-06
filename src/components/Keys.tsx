type Elements = {
  label: string;
  onClick: () => void;
  isOperator?: boolean;
};

const Keys = ({ label, onClick, isOperator }: Elements) => {
  return (
    <button
      onClick={onClick}
      className={`font-bold flex justify-center items-center 
        duration-300 border rounded-xl p-3 text-lg hover:opacity-80
        ${isOperator ? "bg-orange-400 text-white" : "bg-white text-gray-800"}`}
    >
      {label}
    </button>
  );
};

export default Keys;
