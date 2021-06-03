import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormExpenses from './FormExpenses';

class Wallet extends React.Component {

  render() {
    const { email, total, currentCurrency } = this.props;
    return (
      <>
        <header>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">
            0
          </span>
          <span data-testid="header-currency-field">
            Câmbio atual:
            { currentCurrency }
          </span>
        </header>
        <FormExpenses />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  currentCurrency: state.wallet.currentCurrency,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
};
