import React, { useState, useEffect, useMemo, useContext } from 'react';

import TopSixCoinsCSS from './TopSixCoins.module.css';

import { TopSixCoinsTable } from '../TopSixCoinsTable/TopSixCoinsTable';

import {
  topSixMainCoins,
  // tableMainValuesFromApi
} from './data';

import { PairContext } from '../../utils/allPairs';

export const TopSixCoins = React.memo(() => {
  const [filters, setFilters] = useState({
    currency: 'USDT',
    favorites: false,
  });
  const { currency, favorites } = filters;

  const [tableRowData, setTableRowData] = useState([]);

  const { pairsData } = useContext(PairContext);

  const handleChangeRowStars = (selectedPairId) => {
    const copyTableRowData = tableRowData.map((data) => {
      if (data.pairId === selectedPairId) {
        return {
          ...data,
          star: !data.star,
        };
      }

      return data;
    });

    setTableRowData(copyTableRowData);
  };

  const filteredTableData = useMemo(() => {
    if (favorites) {
      return tableRowData.filter(
        (value) => value.quoteCurrency === currency && value.star === favorites,
      );
    }

    return tableRowData.filter((value) => value.quoteCurrency === currency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites, currency, handleChangeRowStars]);

  const handleClick = () => {
    const selectCoinPosition = topSixMainCoins.indexOf(currency);

    setFilters((currentFilters) => {
      return {
        ...currentFilters,
        currency:
          topSixMainCoins[
            selectCoinPosition === 5 ? 0 : selectCoinPosition + 1
          ],
      };
    });
  };

  const handleChangeSelectStar = (event) => {
    const { checked } = event.target;

    setFilters((currentFilters) => {
      return {
        ...currentFilters,
        favorites: checked,
      };
    });
  };

  const handleChangeCurrency = (event) => {
    const { value } = event.target;

    setFilters((currentFilters) => {
      return {
        ...currentFilters,
        currency: value,
      };
    });
  };

  useEffect(() => {
    let pairs = [];
    let i = 0;
    for (let pair in pairsData) {
      const pairNameArr = pair.split('/');
      const pairPrice = Number(pairsData[pair].lastPrice);
      const pairChange = Number(pairsData[pair].percentChange);
      pairs = [
        ...pairs,
        {
          pairId: i,
          name: pair,
          quoteCurrency: pairNameArr[1],
          check: false,
          BaseCurrency: pairNameArr[0],
          pairImg: pairNameArr[0],
          pairPrice,
          pairChange,
          star: false,
          deprecated: false,
        },
      ];

      i += 1;
    }

    setTableRowData(pairs);
  }, [pairsData]);

  return (
    <div className={TopSixCoinsCSS.wrapper}>
      <div className={TopSixCoinsCSS.headerWrapper}>
        <label
          className={
            favorites
              ? TopSixCoinsCSS.filterStarOn
              : TopSixCoinsCSS.filterStarOff
          }
          htmlFor="filterStarCheckbox"
        >
          <input
            type="checkbox"
            className={TopSixCoinsCSS.filterStarCheckbox}
            id="filterStarCheckbox"
            checked={favorites}
            onChange={handleChangeSelectStar}
          />
        </label>
        <div className={TopSixCoinsCSS.coinSelectBlock}>
          <div className={TopSixCoinsCSS.coinSelectWrapper}>
            {topSixMainCoins.map((coin, i) => {
              return (
                <label
                  htmlFor={coin}
                  className={
                    currency === coin
                      ? TopSixCoinsCSS.coinSelectLabelOff
                      : TopSixCoinsCSS.coinSelectLabelOn
                  }
                  key={i}
                >
                  <input
                    className={TopSixCoinsCSS.coinSelectInput}
                    type="radio"
                    name={coin}
                    id={coin}
                    value={coin}
                    checked={currency === coin}
                    onChange={handleChangeCurrency}
                  />
                  {coin}
                </label>
              );
            })}
          </div>
          <div className={TopSixCoinsCSS.coinSelectLine}></div>
        </div>
        <button className={TopSixCoinsCSS.headerButton} onClick={handleClick}>
          <img src="./arrowRight.svg" alt="arrowRight" />
        </button>
      </div>
      <div className={TopSixCoinsCSS.mainWrapper}>
        <TopSixCoinsTable
          tableRowData={filteredTableData}
          handleChangeRowStars={handleChangeRowStars}
        />
      </div>
    </div>
  );
});
