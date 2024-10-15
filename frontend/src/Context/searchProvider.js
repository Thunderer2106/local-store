
import React, { createContext, useContext, useState,useEffect } from 'react';

const TextContext = createContext();

export const TextProvider = ({ children }) => {
  const [text, setText] = useState(() => {
    const storedData = localStorage.getItem('myData');
    return storedData ? JSON.parse(storedData) : ''
  });

  const setEnteredText = (newText) => {
    setText(newText);
  };

  useEffect(() => {
    localStorage.setItem('myData', JSON.stringify(text));
  }, [text]);

  const[individual,setIndividual]=useState(()=>{
    const storedData = localStorage.getItem('myData2');
    return storedData ? JSON.parse(storedData) : ''
  });

  const setIndividualText = (newText) => {
    setIndividual(newText);
  };

  useEffect(() => {
    localStorage.setItem('myData2', JSON.stringify(individual));
  }, [individual]);

  return (
    <TextContext.Provider value={{ text, setEnteredText,individual,setIndividualText }}>
      {children}
    </TextContext.Provider>
  );
};

export const useText = () => {
  const context = useContext(TextContext);
  if (!context) {
    throw new Error('useText must be used within a TextProvider');
  }
  return context;
};
