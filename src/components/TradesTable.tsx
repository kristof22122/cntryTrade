import { Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  useMarket,
} from '../utils/markets';
import { getDecimalCount } from '../utils/utils';
import FloatingElement from './layout/FloatingElement';
import { BonfidaTrade } from '../utils/types';


const URL_SERVER = 'https://data.cntry.io/';

const Title = styled.div`
  color: rgba(255, 255, 255, 1);
`;
const SizeTitle = styled(Row)`
  padding: 20px 0 14px;
  color: #434a59;
`;

export default function PublicTrades({ smallScreen }) {
  const { baseCurrency, quoteCurrency, market, marketName } = useMarket();
  const [ tradeVisibleData, setTradeVisibleData ] = useState<null | any>(null);

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
      return null
    }

    const result = await getApi(`${URL_SERVER}history?name=${marketName}`);

    return result;
  }

  useEffect(() => {
    const tradeDataFromApi = testF();
    tradeDataFromApi.then(data => {
      const newTradeData = JSON.parse(data?.data);
      setTradeVisibleData(newTradeData.data);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketName]);

  return (
    <FloatingElement
      style={
        smallScreen
          ? { flex: 1 }
          : {
              marginTop: '10px',
              minHeight: '270px',
              maxHeight: 'calc(100vh - 700px)',
            }
      }
    >
      <Title
        style={{
          color: '#2f80ed',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '22px',
        }}
      >
        Trade History
      </Title>
      <SizeTitle>
        <Col
          span={8}
          style={{
            // width: '60px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '10px',
            lineHeight: '12px',
          }}
        >
          Price {quoteCurrency}
        </Col>
        <Col span={8} style={{
          textAlign: 'right',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '10px',
          lineHeight: '12px',
        }}>
          Size ({baseCurrency})
        </Col>
        <Col span={8} style={{
          textAlign: 'right',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '10px',
          lineHeight: '12px',
          textAlignLast: 'right',
        }}>
          Time
        </Col>
      </SizeTitle>
      {!!tradeVisibleData && (
        <div
          style={{
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '10px',
            lineHeight: '12px',
            marginRight: '-5px',
            paddingRight: '5px',
            overflowY: 'scroll',
            // maxHeight: smallScreen
            //   ? 'calc(100% - 75px)'
            //   : 'calc(100vh - 800px)',
            maxHeight: '400px',
          }}
        >
          {tradeVisibleData.map((trade: BonfidaTrade, i: number) => (
            <Row key={i} style={{ marginBottom: 4 }}>
              <Col
                span={8}
                style={{
                  color: trade.side === 'buy' ? '#41C77A' : '#F23B69',
                }}
              >
                {market?.tickSize && !isNaN(trade.price)
                  ? Number(trade.price).toFixed(
                      getDecimalCount(market.tickSize),
                    )
                  : trade.price}
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                {market?.minOrderSize && !isNaN(trade.size)
                  ? Number(trade.size).toFixed(
                      getDecimalCount(market.minOrderSize),
                    )
                  : trade.size.toFixed(4)}
              </Col>
              <Col span={8} style={{ textAlign: 'right', color: '#434a59' }}>
                {trade.time && new Date(trade.time).toLocaleTimeString('en-US', { hour12: false })}
              </Col>
            </Row>
          ))}
        </div>
      )}
    </FloatingElement>
  );
}
