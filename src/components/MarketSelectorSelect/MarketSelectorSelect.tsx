import React, { useMemo, useState, useContext } from 'react';

import MarketSelectorSelectCSS from './MarketSelectorSelect.module.css';
import { nanoid } from 'nanoid';

// import { ServerConnectorContext } from '../../context/serverConnector';

interface Markets {
  address: any;
  name: string;
  deprecated: any;
}

export const MarketSelectorSelect = (props: {
  onSetMarketAddress: (event: any) => void,
  showMarkets: Markets[],
  marketName: any;
}) => {
  const {
    onSetMarketAddress,
    showMarkets,
    marketName,
  } = props;
  const [ search, setSearch ] = useState<string | null>(null);
  const [ openDropdown, setOpenDropdown ] = useState(false);

  // const {
  //   setName,
  // } = useContext(ServerConnectorContext);

  const handleSearch = (event) => {
    const {
      value,
    } = event.target;
    setSearch(value);
  };

  const filteredMarkets = useMemo(() => {
    if (search === null) {
      return showMarkets;
    } else {
      const filterValueToLowerCase = search.toLowerCase();
      const copyShowMarkets = showMarkets.filter(market => market.name.toLowerCase().includes(filterValueToLowerCase));
      
      return copyShowMarkets;
    }
  }, [search, showMarkets]);

  return (
    <> 
      <div
        onClick={() => {
          setOpenDropdown(true);
        }}
        style={{
          display: 'flex',
          marginBottom: '5px',
          cursor: 'pointer'
        }}
      >
        <img 
          src={require(`../../assets/coins/${marketName.split('/')[0]}.svg`)}
          alt={marketName.split('/')[0]}
          style={{ width: '24px', height: '24px' }}
        />
        <img 
          src={require(`../../assets/coins/${marketName.split('/')[1]}.svg`)}
          alt={marketName.split('/')[1]}
          style={{ 
            width: '24px',
            height: '24px',
            position: 'relative',
            right: '7px',
          }}
        />
        <div
          style={{
            fontSize: '14px',
            lineHeight: '22px',
            color: '#000',
          }}
        >
          {marketName}
        </div>
      </div>
      {openDropdown && (
        <div
          className={MarketSelectorSelectCSS.marketSelectWrapper}
        >
          <div
            className={MarketSelectorSelectCSS.marketSelectLabel}
          >
            <input
              className={MarketSelectorSelectCSS.marketSelectInput}
              type='search'
              value={search || ''}
              onChange={handleSearch}
            />
            <img
              className={MarketSelectorSelectCSS.marketSelectImg}
              src="./search.svg"
              alt="search"
            />
          </div>
          <div
            className={MarketSelectorSelectCSS.marketSelect}
          >
            {filteredMarkets
            .map(({ address, name, deprecated }, i) => {
              return (
              <div
                className={MarketSelectorSelectCSS.marketSelectOption}
                onClick={() => {
                  onSetMarketAddress(address.toBase58());
                  setOpenDropdown(false);
                  setSearch(null);
                  // setName(name)
                }}
                key={nanoid()}
              >
                <img 
                  src='./Solana(SOL).png'
                  alt='Solana'
                  className={MarketSelectorSelectCSS.marketSelectBaseCoinImg}
                />
                <img
                  className={MarketSelectorSelectCSS.marketSelectQuoteCoinImg}
                  src='./USDCoin(USDC).png'
                  alt='USDCoin'
                /> 
                {name} {deprecated ? ' (Deprecated)' : null}
              </div>
            )
            })}
          </div>
        </div>
      )}
    </>
  )
}
