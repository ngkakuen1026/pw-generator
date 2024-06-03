import { useState } from 'react';
import { MdContentCopy } from "react-icons/md";

function App() {
  const [passwordLength, setPasswordLength] = useState(8);

  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeAlphabets, setIncludeAlphabets] = useState(false);
  const [includeCapitalAlphabets, setIncludeCapitalAlphabets] = useState(false);
  const [includeSpecialCharacter, setIncludeSpecialCharacter] = useState(false);
  
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handlePasswordLengthChange = (e) => {
    setPasswordLength(e.target.value);
  };

  const handleIncludeNumbersChange = () => {
    setIncludeNumbers(!includeNumbers);
  };

  const handleIncludeAlphabetsChange = () => {
    setIncludeAlphabets(!includeAlphabets);
  };

  const handleIncludeCapitalAlphabetsChange = () => {
    setIncludeCapitalAlphabets(!includeCapitalAlphabets);
  };

  const handleSpecialCharacterChange = () => {
    setIncludeSpecialCharacter(!includeSpecialCharacter);
  };

  const generatePassword = () => {
    const numbers = "0123456789";
    const alphabets = "abcdefghijklmnopqrstuvwxyz";
    const capitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialCharacter = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
  
    let password = "";
  
    const selectedCharacterSets = [];
    if (includeNumbers) selectedCharacterSets.push(numbers);
    if (includeAlphabets) selectedCharacterSets.push(alphabets);
    if (includeCapitalAlphabets) selectedCharacterSets.push(capitalAlphabets);
    if (includeSpecialCharacter) selectedCharacterSets.push(specialCharacter);
  
    if (selectedCharacterSets.length > 0) {
      for (let i = 0; i < passwordLength; i++) {
        const randomSetIndex = Math.floor(Math.random() * selectedCharacterSets.length);
        const selectedCharacterSet = selectedCharacterSets[randomSetIndex];
        const randomIndex = Math.floor(Math.random() * selectedCharacterSet.length);
        password += selectedCharacterSet[randomIndex];
      }
    }
  
    setGeneratedPassword(password);
    setIsCopied(false);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    setIsCopied(true);
  };

  return (
    <div className="pw-app p-10">
      <h1 className="text-4xl text-center font-light">Random Password Generator</h1>

      <div className="pw-field text-center m-10">
        <h2 className="text-3xl">Password generated:</h2>
        <h2 className="text-4xl font-bold pt-5">
          {generatedPassword}
          {generatedPassword && (
            <MdContentCopy className="w-10 h-10 ml-8 inline-block cursor-pointer" onClick={copyPassword} />
          )}
        </h2>
        {isCopied && (
          <p className="text-lg text-cyan-400 mt-2">Password copied to clipboard!</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="mr-8 h-8 w-8"
            checked={includeNumbers}
            onChange={handleIncludeNumbersChange}
          />
          <span className="pl-1 text-2xl">0-9</span>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="mr-8 h-8 w-8"
            checked={includeAlphabets}
            onChange={handleIncludeAlphabetsChange}
          />
          <span className="pl-1 text-2xl">a-z</span>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="mr-8 h-8 w-8"
            checked={includeCapitalAlphabets}
            onChange={handleIncludeCapitalAlphabetsChange}
          />
          <span className="pl-1 text-2xl">A-Z</span>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="mr-8 h-8 w-8"
            checked={includeSpecialCharacter}
            onChange={handleSpecialCharacterChange}
          />
          <span className="pl-1 text-2xl">Special Character</span>
        </div>
      </div>

      <div className="flex justify-center pt-5">
        <span className="text-2xl">Password Length: {passwordLength}</span>
      </div>
      <div className="flex items-center justify-center pt-5">
        <input
          type="range"
          step="1"
          min={8}
          max={16}
          value={passwordLength}
          onChange={handlePasswordLengthChange}
          className="w-1/2"
        />
      </div>

      <div className="flex justify-center pt-8">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl font-semibold" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;