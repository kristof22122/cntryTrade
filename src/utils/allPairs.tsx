import React, { useState, useEffect, useMemo, useContext } from 'react';

const URL_SERVER = 'https://data.cntry.io/pairs?data=pairs';

export const PairContext = React.createContext({
  pairsData: {},
});

export const PairProvider = (props) => {
  const [ pairsData, setPairsData ] = useState<any>({});
  const {
    children,
  } = props;

  const testF = async() => {
    const getApi = async (url: string) => {
      try {
        const response = await fetch(url)
        if (response.ok) {
          const responseJson = await response.json()
          return responseJson.success
            ? responseJson.data
            : responseJson
            ? responseJson
            : null
        }
      } catch (err) {
        console.log(`Error fetching from Chart API ${url}: ${err}`)
      }
      return null;
    }

    const result = await getApi(`${URL_SERVER}`);

    return result;
  }

  useEffect(() => {
    const pairsDataFromApi = testF();
      pairsDataFromApi.then(data => {
        setPairsData(data.data.pairs);
      });
    const interval = setInterval(() => {
      pairsDataFromApi.then(data => {
        setPairsData(data.data.pairs);
      })
    }, 60000);

    return () => {
      clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    pairsData,
    setPairsData,
  };

  return (
    <PairContext.Provider value={contextValue}>
      {children}
    </PairContext.Provider>
  );
};