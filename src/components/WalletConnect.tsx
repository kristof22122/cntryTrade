import React from 'react';
import { Menu } from 'antd';
import { useWallet } from '../utils/wallet';
import LinkAddress from './LinkAddress';

import styled from 'styled-components';

const Wallet = styled.div`
  color: #000;
  width: "100%";
  font-size: 14;
  line-height: 22px;
  cursor: "pointer";
`;

export default function WalletConnect() {
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const menu = (
    <Menu>
      {connected && <LinkAddress shorten={true} address={publicKey} />}
      <Menu.Item key="3" onClick={select}>
        Change Wallet
      </Menu.Item>
    </Menu>
  );

  return (
    <Wallet
      onClick={connected ? disconnect : connect}>
      {connected ? 'Disconnect' : 'Connect wallet'}
    </Wallet>
  );
}
