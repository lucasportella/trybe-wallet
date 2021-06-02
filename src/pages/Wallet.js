import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email, totalExpenses, currentCurrency } = this.props;
    return (
      <>
        <header>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">
            0
          </span>
          <span data-testid="header-currency-field">
            Câmbito atual:
            { currentCurrency }
          </span>
        </header>
        <div>aaa</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
  currentCurrency: state.wallet.currentCurrency,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
};
