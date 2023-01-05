import { createContext, useState } from 'react';

const CarsContext = createContext(0);

function CarsProvider({ children }) {
  const [numberOfCars, setNumberOfCars] = useState();
  const value = { numberOfCars, setNumberOfCars }
  
  return (
    <CarsContext.Provider value={value}>
      {children}
    </CarsContext.Provider>
  );
}

export { CarsContext, CarsProvider };