import React from 'react';

import {
  Col,
  Row,
} from 'antd';

import { TVChartContainer } from '../TradingView';
import UserInfoTable from '../UserInfoTable';
import Orderbook from '../Orderbook';
import TradesTable from '../TradesTable';
import TradeForm from '../TradeForm';
import StandaloneBalancesDisplay from '../StandaloneBalancesDisplay';

export const RenderSmall = ({ onChangeOrderRef, onPrice, onSize }) => {
  return (
    <>
      <Row style={{ height: '30vh' }}>
        <TVChartContainer />
      </Row>
      <Row
        style={{
          height: '900px',
        }}
      >
        <Col flex="auto" style={{ height: '100%', display: 'flex' }}>
          <Orderbook
            smallScreen={true}
            depth={13}
            onPrice={onPrice}
            onSize={onSize}
          />
        </Col>
        <Col flex="auto" style={{ height: '100%', display: 'flex' }}>
          <TradesTable smallScreen={true} />
        </Col>
        <Col
          flex="400px"
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <TradeForm setChangeOrderRef={onChangeOrderRef} />
          <StandaloneBalancesDisplay />
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <UserInfoTable />
        </Col>
      </Row>
    </>
  );
};
