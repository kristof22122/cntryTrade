import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  getMarketInfos,
  getTradePageUrl,
  MarketProvider,
  useMarket,
  useMarketsList,
} from '../utils/markets';
import CustomMarketDialog from '../components/CustomMarketDialog';
// import { notify } from '../utils/notifications';
import { useHistory, useParams } from 'react-router-dom';

import { RenderNormal } from '../components/RenderNormal/RenderNormal';

// temporarily
// import { RenderSmall } from '../components/RenderSmall/RenderSmall';
// import { RenderSmaller } from '../components/RenderSmaller/RenderSmaller';
// import { DeprecatedMarketsPage } from '../components/DeprecatedMarketsPage/DeprecatedMarketsPage';

// Use following stub for quick setup without the TradingView private dependency
// function TVChartContainer() {
//   return <></>
// }

const Wrapper = styled.div`
  background-color: #fff;
  color: #2f80ed;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  .borderNone .ant-select-selector {
    border: none !important;
  }
`;

export default function TradePage() {
  const { marketAddress } = useParams();
  useEffect(() => {
    if (marketAddress) {
      localStorage.setItem('marketAddress', JSON.stringify(marketAddress));
    }
  }, [marketAddress]);
  const history = useHistory();
  function setMarketAddress(address) {
    history.push(getTradePageUrl(address));
  }

  return (
    <MarketProvider
      marketAddress={marketAddress}
      setMarketAddress={setMarketAddress}
    >
      <TradePageInner />
    </MarketProvider>
  );
}

function TradePageInner() {
  const {
    marketName,
    customMarkets,
    setCustomMarkets,
    setMarketAddress,
  } = useMarket();
  const markets = useMarketsList();
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleDeprecated,
    setHandleDeprecated
  ] = useState(false);
  const [addMarketVisible, setAddMarketVisible] = useState(false);
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dimensions,
    setDimensions
  ] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    document.title = marketName ? `${marketName} — Cntry` : 'Cntry';
  }, [marketName]);

  const changeOrderRef = useRef<
    ({ size, price }: { size?: number; price?: number }) => void
  >();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onAddCustomMarket = (customMarket) => {
    const marketInfo = getMarketInfos(customMarkets).some(
      (m) => m.address.toBase58() === customMarket.address,
    );
    if (marketInfo) {
      // notify({
      //   message: `A market with the given ID already exists`,
      //   type: 'error',
      // });
      console.log({
          message: `A market with the given ID already exists`,
          type: 'error',
        })
      return;
    }
    const newCustomMarkets = [...customMarkets, customMarket];
    setCustomMarkets(newCustomMarkets);
    setMarketAddress(customMarket.address);
  };

  const onDeleteCustomMarket = (address) => {
    const newCustomMarkets = customMarkets.filter((m) => m.address !== address);
    setCustomMarkets(newCustomMarkets);
  };

  // temporarily
  // const width = dimensions?.width;
  const componentProps = {
    onChangeOrderRef: (ref) => (changeOrderRef.current = ref),
    onPrice: useCallback(
      (price) => changeOrderRef.current && changeOrderRef.current({ price }),
      [],
    ),
    onSize: useCallback(
      (size) => changeOrderRef.current && changeOrderRef.current({ size }),
      [],
    ),
    markets,
    setHandleDeprecated,
    customMarkets,
    onDeleteCustomMarket,
  };
  const component = (() => {
    // temporarily
    // if (handleDeprecated) {
    //   return (
    //     <DeprecatedMarketsPage
    //       switchToLiveMarkets={() => setHandleDeprecated(false)}
    //     />
    //   );
    // } else if (width < 1000) {
    //   return <RenderSmaller {...componentProps} />;
    // } else if (width < 1450) {
    //   return <RenderSmall {...componentProps} />;
    // } else {
    //   return <RenderNormal {...componentProps} />;
    // }
    return (
      <RenderNormal {...componentProps} />
    )
  })();

  return (
    <>
      <CustomMarketDialog
        visible={addMarketVisible}
        onClose={() => setAddMarketVisible(false)}
        onAddCustomMarket={onAddCustomMarket}
      />
      <Wrapper>
        {component}
      </Wrapper>
    </>
  );
}
