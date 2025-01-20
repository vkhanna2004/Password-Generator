import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef
  const passwordRef = useRef(null);

  const pwdGenerator = useCallback(() => {
    let pwd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let j = Math.floor(Math.random() * str.length + 1);
      pwd += str.charAt(j);
    }
    setPassword(pwd);
  }, [length, numberAllowed, charAllowed, setPassword]);


  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,10);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  
  useEffect(() => {
    pwdGenerator();
  }, [length, numberAllowed, charAllowed, pwdGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-3 my-8 bg-gray-300">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Password Generator</h1>

      <div className="flex items-center shadow-md rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          placeholder="Generated Password"
          className="outline-none w-full py-3 px-4 text-lg text-gray-700 bg-gray-100 rounded-l-lg"
        />

        <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-600 text-lg text-white px-4 py-3 rounded-r-lg hover:bg-blue-800 "
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col gap-y-4 text-base text-gray-700 mb-6">
        <div className="flex justify-between items-center">
          <label className="text-gray-600">Length: {length}</label>
          <input
            type="range"
            min={8}
            max={30}
            value={length}
            className="cursor-pointer w-3/5 h-2 bg-gray-300 rounded-lg"
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2 text-base">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="accent-blue-600"
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>

          <div className="flex items-center gap-x-2 text-base">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              className="accent-blue-600"
            />
            <label htmlFor="characterInput">Include Special Characters</label>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={pwdGenerator}
          className="bg-blue-600 text-white py-2 px-8 rounded-lg text-lg font-medium hover:bg-blue-500 transition-all"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
