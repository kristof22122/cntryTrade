import React from 'react';

import {
  Col,
  Row,
} from 'antd';

import { TVChartContainer } from '../TradingView';
import UserInfoTable from '../UserInfoTable';
import Orderbook from '../Orderbook';
import TradesTable from '../TradesTable';
import { TopSixCoins } from '../TopSixCoins/TopSixCoins';
import TradeForm from '../TradeForm';
import StandaloneBalancesDisplay from '../StandaloneBalancesDisplay';
import { MarketSelector } from '../../components/MarketSelector/MarketSelector';

export const RenderNormal = (props) => {
    const {
      onChangeOrderRef,
      onPrice,
      onSize,
      markets,
      setHandleDeprecated,
      customMarkets,
      onDeleteCustomMarket,
    } = props;
    return (
      <Row
        style={{
          minHeight: '900px',
          flexWrap: 'nowrap',
        }}
      >
        <Col flex="auto" style={{ height: '50vh' }}>
          <Row style={{ height: '100%' }}>
            <TVChartContainer />
          </Row>
          <Row style={{ height: '70%' }}>
            <UserInfoTable />
          </Row>
        </Col>
        <Col flex={'225px'} style={{ height: '100%' }}>
          <Orderbook
            smallScreen={false}
            onPrice={onPrice}
            onSize={onSize}
          />
          <TradesTable smallScreen={false} />
        </Col>
        <Col
          flex="352px"
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Col
            style={{
              width: '100%',
              height: '104px',
              padding: '5px',
              border: '1px solid #f2f2f2',
            }}
          >
            <MarketSelector
              markets={markets}
              setHandleDeprecated={setHandleDeprecated}
              placeholder={'Select market'}
              customMarkets={customMarkets}
              onDeleteCustomMarket={onDeleteCustomMarket}
            />
          </Col>
          <TopSixCoins />
          <TradeForm setChangeOrderRef={onChangeOrderRef} />
          <StandaloneBalancesDisplay />
        </Col>
      </Row>
    );
  };
