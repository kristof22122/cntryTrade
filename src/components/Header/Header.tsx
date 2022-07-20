import './Header.css';

import WalletConnect from '../WalletConnect';
import {
  // ENDPOINTS,
  useConnectionConfig,
} from '../../utils/connection';

import {
  Select,
} from 'antd';

import {
  makeStyles,
} from "@material-ui/core";
import React from 'react';

const useStyles = makeStyles((theme) => ({
  header__wallet_icon: {
    marginRight: "4px",
    marginBottom: "2px",
  },
  header__swap_button: {
    width: "100%",
    borderRadius: theme.spacing(2),
    fontSize: 14,
    lineHeight: "22px",
    cursor: "pointer",
  },
}));

export const Header = () => {
  const styles = useStyles();
  const {
    endpoint,
    // endpointInfo,
    setEndpoint,
    availableEndpoints,
    // setCustomEndpoints,
  } = useConnectionConfig();

  return (
    <section
      className="header"
    >
      <img src="logo.svg" alt="logo" />
      <div className="header__menu wrapper">
        <a
          href="https://cntry.io/"
          className="header__menu_punct link"
          target="_blank"
          rel="noopener noreferrer"
        >
          home
        </a>
        <a
          href="https://swap.cntry.io/"
          className="header__menu_punct link"
          target="_blank"
          rel="noopener noreferrer"
        >
          swap
        </a>
        <a
          href="#/"
          className="header__menu_punct link header__menu_punct-active"
          target="_blank"
          rel="noreferrer"
        >
          trade
        </a>
      </div>
      <div className="header__wallet wrapper">
        <Select
          onSelect={setEndpoint}
          value={endpoint}
          style={{ marginRight: 8, width: '150px' }}
        >
          {availableEndpoints.map(({ name, endpoint }) => (
            <Select.Option value={endpoint} key={endpoint}>
              {name}
            </Select.Option>
          ))}
        </Select>
        <img
          className={styles.header__wallet_icon}
          src="wallet.svg"
          alt="wallet"
        />
        <WalletConnect />
      </div>
    </section>
  )
};
 