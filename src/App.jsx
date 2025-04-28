import { useState, useCallback, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(Password);
    }
  }, [Password]);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
        <h1 className="text-3xl md:text-5xl text-orange-400 font-bold mb-8 text-center">
          Password Generator
        </h1>

        <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input 
              type="text"
              value={Password}
              className="outline-none w-full py-2 px-4 text-lg rounded-l-lg text-white bg-gray-700 font-mono"
              placeholder="Generated Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-r-lg transition-all"
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-x-2">
              <input 
                type="range"
                min={8}
                max={30}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="text-white">Length: {length}</label>
            </div>

            <div className="flex items-center gap-x-2">
              <input 
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput" className="text-white">
                Include Numbers
              </label>
            </div>

            <div className="flex items-center gap-x-2">
              <input 
                type="checkbox"
                defaultChecked={characterAllowed}
                id="characterInput"
                onChange={() => setCharacterAllowed((prev) => !prev)}
              />
              <label htmlFor="characterInput" className="text-white">
                Include Special Characters
              </label>
            </div>

            <button
              onClick={passwordgenerator}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg mt-4 transition-all"
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
// hello