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

export const RenderSmaller = ({ onChangeOrderRef, onPrice, onSize }) => {
  return (
    <>
      <Row style={{ height: '50vh' }}>
        <TVChartContainer />
      </Row>
      <Row>
        <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
          <TradeForm style={{ flex: 1 }} setChangeOrderRef={onChangeOrderRef} />
        </Col>
        <Col xs={24} sm={12}>
          <StandaloneBalancesDisplay />
        </Col>
      </Row>
      <Row
        style={{
          height: '500px',
        }}
      >
        <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
          <Orderbook smallScreen={true} onPrice={onPrice} onSize={onSize} />
        </Col>
        <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
          <TradesTable smallScreen={true} />
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
