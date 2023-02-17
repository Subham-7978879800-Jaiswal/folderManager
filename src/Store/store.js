import React, { useContext, useState } from "react";

const Store = React.createContext({});

const StoreProvider = ({ children }) => {
  const [apps, setApps] = useState([]);

  const updateApps = (data) => {
    setApps(data);
  };

  return (
    <Store.Provider value={{ apps, updateApps }}>{children}</Store.Provider>
  );
};

const useStoreProvider = () => {
  return useContext(Store);
};

export { StoreProvider, useStoreProvider };
