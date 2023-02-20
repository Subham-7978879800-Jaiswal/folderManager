import React, { useContext, useState } from "react";

const Store = React.createContext({});

const StoreProvider = ({ children }) => {
  const [apps, setApps] = useState([]);
  const [filterExtensions, setFilterExtensions] = useState([]);
  const [loaderOnFolderDetailLoad, setLoaderOnFolderDetailLoad] =
    useState(false);

  const updateLoaderOnFolderDetailLoad = (data) => {
    setLoaderOnFolderDetailLoad(data);
  };

  const updateApps = (data) => {
    setApps(data);
  };

  const updateFilterExtension = (data) => {
    setFilterExtensions(data);
  };

  return (
    <Store.Provider
      value={{
        apps,
        updateApps,
        loaderOnFolderDetailLoad,
        updateLoaderOnFolderDetailLoad,
        filterExtensions,
        updateFilterExtension,
      }}
    >
      {children}
    </Store.Provider>
  );
};

const useStoreProvider = () => {
  return useContext(Store);
};

export { StoreProvider, useStoreProvider };
