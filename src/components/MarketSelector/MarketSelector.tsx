import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Col,
  Row,
} from 'antd';
  import styled from 'styled-components';
import {
  useMarket,
} from '../../utils/markets';
import { MarketSelectorSelect } from '../../components/MarketSelectorSelect/MarketSelectorSelect';
import { PairContext } from '../../utils/allPairs';

interface Markets {
  address: any;
  name: string;
  deprecated: any;
}

const MarketSelectorWrapper = styled.div `
  display: flex;
  flex-direction: column;
`;

const MarketSelectorLastPrice = styled.div`
  font-size: 10px;
  line-height: 12px;
  text-align: right;
  color: #828282;
`;

const MarketSelectorSelectBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColForMarketSelector = styled(Col)`
  width: 50%;
`;

const MarketSelectorChangeValues = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
`;

const MarketSelectorSelectWrapper = styled.div`
  position: relative;
`;

export const MarketSelector = ({
  markets,
  placeholder,
  setHandleDeprecated,
  customMarkets,
  onDeleteCustomMarket,
}) => {
  const { setMarketAddress, marketName } = useMarket();

  const extractBase = (a) => a.split('/')[0];
  const extractQuote = (a) => a.split('/')[1];

  const onSetMarketAddress = (marketAddress) => {
    setHandleDeprecated(false);
    setMarketAddress(marketAddress);
  };

  const [ showMarkets, setShowMarkets ] = useState<Markets[]>([]);

  const {
    pairsData,
  } = useContext(PairContext);

  const pairData = useMemo(() => {
    if (marketName !== undefined) {
      return pairsData[marketName];
    }

    return null;    
  }, [pairsData, marketName]);

  const sortedMarkets = () => {
    const copyMarkets = markets
    .sort((a, b) =>
          extractQuote(a.name) === 'USDT' && extractQuote(b.name) !== 'USDT'
            ? -1
            : extractQuote(a.name) !== 'USDT' &&
              extractQuote(b.name) === 'USDT'
            ? 1
            : 0,
        )
        .sort((a, b) =>
          extractBase(a.name) < extractBase(b.name)
            ? -1
            : extractBase(a.name) > extractBase(b.name)
            ? 1
            : 0,
        );
    setShowMarkets(copyMarkets);
  };

  useEffect(() => {
    sortedMarkets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MarketSelectorWrapper>
      <MarketSelectorLastPrice>
        Last price
      </MarketSelectorLastPrice>
      <MarketSelectorSelectBlock>
        <MarketSelectorSelectWrapper>
          <MarketSelectorSelect
            onSetMarketAddress={onSetMarketAddress}
            showMarkets={showMarkets}
            marketName={marketName}
          />
        </MarketSelectorSelectWrapper>
        <div
          style={{
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '22px',
            textAlign: 'right',
            color: '#000',
          }}
        >
          {pairData && `$${pairData.lastPrice.toFixed(2)}`}
        </div>
      </MarketSelectorSelectBlock>
      <Row
        style={{
          marginTop: '10px',
          fontSize: '10px',
          lineHeight: '12px',
          color: '#828282',
          textAlign: 'right',
        }}
      >
          <ColForMarketSelector>
            24h Change
          </ColForMarketSelector>
          <ColForMarketSelector>
            24h High / Low
          </ColForMarketSelector>
      </Row>
      <Row>
        <ColForMarketSelector>
          <MarketSelectorChangeValues>
            <div
              style={{
                marginRight: '8px',
              }}
            >
              {pairData && `$${pairData.amountChange.toFixed(2)}`}
            </div>
            {pairData && (
              pairData.percentChange > 0
              ? (
                <div
                  style={{
                    color: '#52c41a',
                  }}
                >
                  {`${pairData.percentChange.toFixed(2)}%`}
                </div>
              )
              : (
                <div
                  style={{
                    color: '#ff4d4f',
                  }}
                >
                  {`${pairData.percentChange.toFixed(2)}%`}
                </div>
              )
            )}
          </MarketSelectorChangeValues>
        </ColForMarketSelector>
        <ColForMarketSelector>
          <MarketSelectorChangeValues>
            <div
              style={{
                marginRight: '8px',
                color: '#52c41a',
              }}
            >
              {pairData && `$${pairData.high.toFixed(2)}`}
            </div>
            <div
              style={{
                marginRight: '8px',
                color: '#ff4d4f',
              }}
            >
              {pairData && `$${pairData.low.toFixed(2)}`}
            </div>
          </MarketSelectorChangeValues>
        </ColForMarketSelector>
      </Row>
    </MarketSelectorWrapper>
  );
}
