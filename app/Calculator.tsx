"use client"
import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState("0");
  const [previousInput, setPreviousInput] = useState("");
  const [operation, setOperation] = useState<string | null>(null);

  const appendNumber = (number: string) => {
    if (currentInput === "0" && number !== ".") {
      setCurrentInput(number);
    } else {
      setCurrentInput((prev) => prev + number);
    }
  };

  const chooseOperation = (op: string) => {
    if (currentInput === "") return;
    if (previousInput !== "") {
      calculate();
    }
    setOperation(op);
    setPreviousInput(currentInput);
    setCurrentInput("");
  };

  const calculate = () => {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
      case "%":
        result = prev % current;
        break;
      default:
        return;
    }

    setCurrentInput(result.toString());
    setOperation(null);
    setPreviousInput("");
  };

  const clearDisplay = () => {
    setCurrentInput("0");
    setPreviousInput("");
    setOperation(null);
  };

  const deleteNumber = () => {
    setCurrentInput((prev) => (prev.slice(0, -1) || "0"));
  };

  const handleKeyboardInput = (event: KeyboardEvent) => {
    const key = event.key;
    if (!isNaN(Number(key))) {
      appendNumber(key);
    } else if (key === ".") {
      appendNumber(".");
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
      chooseOperation(key);
    } else if (key === "Enter") {
      calculate();
    } else if (key === "Backspace") {
      deleteNumber();
    } else if (key === "Escape") {
      clearDisplay();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardInput);
    return () => {
      document.removeEventListener("keydown", handleKeyboardInput);
    };
  }, [currentInput, previousInput, operation]);

  return (
    <div id="main" className="flex justify-center items-center h-[100vh] bg-white">
      <div className="bg bg-black p-5 w-[300px] rounded-[20px]">
        <div
          className="inputArea h-[70px] w-[full] bg-[#00ffff] text-right p-[10px] font-[2rem] mb-[20px] rounded-[10px] truncate"
          id="display"
        >
          {operation ? `${previousInput} ${operation} ${currentInput}` : currentInput}
        </div>
        <div className="grid-container grid grid-cols-4 gap-[10px]">
          <button
            onClick={clearDisplay}
            className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
          >
            C
          </button>
          <button
            onClick={() => chooseOperation("%")}
            className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
          >
            %
          </button>
          <button
            onClick={() => chooseOperation("/")}
            className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
          >
            /
          </button>
          <button
            onClick={deleteNumber}
            className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
          >
            DEL
          </button>

          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => appendNumber(num.toString())}
              className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => chooseOperation("*")}
            className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
          >
            *
          </button>

          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => appendNumber(num.toString())}
              className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => chooseOperation("-")}
            className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
          >
            -
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => appendNumber(num.toString())}
              className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => chooseOperation("+")}
            className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
          >
            +
          </button>

          <button
            onClick={() => appendNumber("0")}
            className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black col-span-2"
          >
            0
          </button>
          <button
            onClick={() => appendNumber(".")}
            className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none  hover:bg-[#00ffff] text-black"
          >
            .
          </button>
          <button
            onClick={calculate}
            className="h-[60px] font-[1.5rem] cursor-pointer rounded-[10px] bg-white border-none hover:bg-[#00ffff] text-black"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
