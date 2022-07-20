import React from 'react';

import TopSixCoinsTableCSS from './TopSixCoinsTable.module.css';

export const TopSixCoinsTable = React.memo((props) => {
  const { tableRowData, handleChangeRowStars } = props;

  return (
    <table className={TopSixCoinsTableCSS.mainTable}>
      <thead>
        <tr>
          <th className={TopSixCoinsTableCSS.mainTableTh}></th>
          <th className={TopSixCoinsTableCSS.mainTableTh}>Pair</th>
          <th className={TopSixCoinsTableCSS.mainTableTh}>Price</th>
          <th className={TopSixCoinsTableCSS.mainTableTh}>Change</th>
        </tr>
      </thead>
      <tbody>
        {tableRowData.map((data) => {
          const {
            pairId,
            BaseCurrency,
            pairImg,
            pairPrice,
            pairChange,
            star,
            quoteCurrency,
          } = data;

          return (
            <tr key={pairId}>
              <td className={TopSixCoinsTableCSS.mainTableTd}>
                <label
                  className={
                    star
                      ? TopSixCoinsTableCSS.mainTableFilterStarOn
                      : TopSixCoinsTableCSS.mainTableFilterStarOff
                  }
                  htmlFor={BaseCurrency}
                >
                  <input
                    type="checkbox"
                    className={TopSixCoinsTableCSS.mainTableFilterStarCheckbox}
                    id={BaseCurrency}
                    checked={star}
                    onChange={() => {
                      handleChangeRowStars(pairId);
                    }}
                  />
                </label>
              </td>
              <td>
                <div className={TopSixCoinsTableCSS.mainTableTdPairWrapper}>
                  <img
                    className={TopSixCoinsTableCSS.mainTableImage}
                    src={require(`../../assets/coins/${pairImg}.svg`)}
                    alt={'coin'}
                  />
                  <div className={TopSixCoinsTableCSS.mainTableTdPair}>
                    <div className={TopSixCoinsTableCSS.mainTableTdPairBase}>
                      {BaseCurrency}
                    </div>
                    <div className={TopSixCoinsTableCSS.mainTableTdPairQuote}>
                      {`/ ${quoteCurrency}`}
                    </div>
                  </div>
                </div>
              </td>
              <td>{pairPrice.toFixed(2)}</td>
              {pairChange > 0 ? (
                <td
                  style={{
                    color: '#52c41a',
                  }}
                >
                  {pairChange.toFixed(4)}
                </td>
              ) : (
                <td
                  style={{
                    color: '#ff4d4f',
                  }}
                >
                  {pairChange.toFixed(4)}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
