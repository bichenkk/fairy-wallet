// @flow
import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToken } from '../../actions/settings';
import { getCurrencyStats } from '../../actions/currency';
import { setActiveAccount } from '../../actions/accounts';

import AccountSwitcher from '../Shared/AccountSwitcher';
import PublicKeyIcon from '../Shared/PublicKeyIcon';
import StakedStats from './StakedStats';
import Tokens from './Tokens';
import VoteStats from './VoteStats';

type Props = {
  actions: {},
  panel: string,
  accounts: {},
  loading: {}
};

class Balance extends Component<Props> {
  handleAccountSwitch = name => {
    const { actions, accounts } = this.props;
    const index = accounts.names.indexOf(name);
    actions.setActiveAccount(index);
  };

  render() {
    const { accounts, panel, loading } = this.props;

    if (accounts.balances !== null) {
      delete accounts.balances.EOS;
    }

    let details = <Tokens accounts={accounts} />;
    if (
      panel === 'system' ||
      panel === 'stake' ||
      panel === 'sellram' ||
      panel === 'buyram'
    ) {
      details = <StakedStats account={accounts.account} />;
    } else if (panel === 'vote') {
      details = <VoteStats account={accounts.account} />;
    }

    return (
      <Segment.Group className="no-border no-padding">
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column floated="left" width={4}>
                <PublicKeyIcon />
              </Grid.Column>
              <Grid.Column floated="left">
                <AccountSwitcher
                  accounts={accounts}
                  onAccountSwitch={this.handleAccountSwitch}
                  loading={loading}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>{details}</Segment>
      </Segment.Group>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  currency: state.currency
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setActiveAccount,
      addToken,
      getCurrencyStats
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
