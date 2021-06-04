import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormExpenses from './FormExpenses';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  calculateTotal() {
    const { expensesList } = this.props;
    let total = 0;
    if (expensesList.length > 0) {
      total = expensesList.map((expense) => {
        const expenseNumber = Number(expense.value);
        total += expenseNumber;
        return total;
      });
      total = total[total.length - 1];
    }
    return total;
  }

  render() {
    const { email, currentCurrency } = this.props;

    return (
      <>
        <header>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">
            { this.calculateTotal() }
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
  expensesList: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  // total: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
};
