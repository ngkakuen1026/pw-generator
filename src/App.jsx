import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdContentCopy, MdGTranslate, MdNightlight, MdSunny } from "react-icons/md";


function App() {
  const [passwordLength, setPasswordLength] = useState(8);

  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeAlphabets, setIncludeAlphabets] = useState(false);
  const [includeCapitalAlphabets, setIncludeCapitalAlphabets] = useState(false);
  const [includeSpecialCharacter, setIncludeSpecialCharacter] = useState(false);
  
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const [isNightTheme, setIsNightTheme] = useState(false);

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

  const toggleTheme = () => {
    setIsNightTheme(!isNightTheme);
  };

  const [currentLanguage, setCurrentLanguage] = useState("en");

  const [t, i18n] = useTranslation("global");
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "zh" : "en";
    handleLanguageChange(newLanguage);
  };
  
  return (
    <div className={`pw-app py-10 min-h-screen ${isNightTheme ? 'bg-dark-mode' : 'bg-white'}`}>
      <div className='mininav pb-10'>
        <MdSunny className={`w-10 h-10 ml-8 inline-block cursor-pointer ${isNightTheme ? 'text-white' : 'hidden'}`} onClick={toggleTheme} />
        <MdNightlight className={`w-10 h-10 ml-8 inline-block cursor-pointer ${isNightTheme ? 'hidden' : ''}`} onClick={toggleTheme} />
        <MdGTranslate className={`w-10 h-10 ml-8 inline-block cursor-pointer ${isNightTheme ? 'fill-white' : 'fill-black'}`} onClick={toggleLanguage} />
      </div>
      <h1 className={`text-4xl text-center ${isNightTheme ? 'text-white' : 'text-black'}`}>{t("body.h1")}</h1>
      <div className="pw-field text-center m-10">
        <h2 className={`text-4xl text-center ${isNightTheme ? 'text-white' : 'text-black'}`}>{t("body.h2")}</h2>
        <h2 className={`text-4xl text-center pt-5 font-bold ${isNightTheme ? 'text-white' : 'text-black'}`}>
          {generatedPassword}
          {generatedPassword ?
            <MdContentCopy className="w-10 h-10 ml-8 inline-block cursor-pointer" onClick={copyPassword} />:
            <h2 className={`text-3xl text-center font-light ${isNightTheme ? 'text-white' : 'text-black'}`}>{t("body.warningMessage")}</h2>
          }
        </h2>
        {isCopied && (
          <p className={`text-lg mt-2 italic ${isNightTheme? 'text-gray-200' : 'text-cyan-400'}`}>{t("body.copyMessage")}</p>
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
          <span className={`pl-1 text-2xl ${isNightTheme ? 'text-white' : 'text-black'}`}>0-9</span>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="mr-8 h-8 w-8"
            checked={includeAlphabets}
            onChange={handleIncludeAlphabetsChange}
          />
          <span className={`pl-1 text-2xl ${isNightTheme ? 'text-white' : 'text-black'}`}>a-z</span>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="mr-8 h-8 w-8"
            checked={includeCapitalAlphabets}
            onChange={handleIncludeCapitalAlphabetsChange}
          />
          <span className={`pl-1 text-2xl ${isNightTheme ? 'text-white' : 'text-black'}`}>A-Z</span>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="mr-8 h-8 w-8"
            checked={includeSpecialCharacter}
            onChange={handleSpecialCharacterChange}
          />
          <span className={`pl-1 text-2xl ${isNightTheme ? 'text-white' : 'text-black'}`}>{t("body.checkbox")}</span>
        </div>
      </div>

      <div className="flex justify-center pt-5">
        <span className={`text-2xl ${isNightTheme ? 'text-white' : 'text-black'}`}>{t("body.h3")} {passwordLength}</span>
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
        <button 
          className={`px-6 py-3 hover:opacity-50 rounded-lg text-xl font-semibold ${isNightTheme ? 'bg-blue-200 text-black' : 'bg-blue-500 text-white'}`}
          onClick={generatePassword}
        >
          {t("body.buttonMessage")}
        </button>
      </div>
    </div>
  );
}

export default App;