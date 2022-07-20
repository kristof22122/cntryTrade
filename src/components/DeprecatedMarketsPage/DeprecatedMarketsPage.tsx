import React from 'react';

import {
  Col,
  Row,
} from 'antd';

import DeprecatedMarketsInstructions from '../DeprecatedMarketsInstructions';

export const DeprecatedMarketsPage = ({ switchToLiveMarkets }) => {
    return (
      <>
        <Row>
          <Col flex="auto">
            <DeprecatedMarketsInstructions
              switchToLiveMarkets={switchToLiveMarkets}
            />
          </Col>
        </Row>
      </>
    );
  };
