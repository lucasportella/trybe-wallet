import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions/index';

class Table extends React.Component {
  constructor() {
    super();
    this.renderExpensesTable = this.renderExpensesTable.bind(this);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
  }

  handleDeleteExpense(id) {
    const { deleteExpenseAction } = this.props;
    deleteExpenseAction(id);
  }

  renderExpensesTable() {
    const { getWalletState } = this.props;
    if (getWalletState) {
      return getWalletState.map((expense) => {
        let getCurrency = expense.exchangeRates[expense.currency];
        const getAsk = expense.exchangeRates[expense.currency];
        let ask = '';
        let value = Number.parseFloat(expense.value);
        let rawAsk = '';
        if (getAsk) {
          ask = getAsk.ask * 100;
          rawAsk = getAsk.ask;
          ask = Math.round(ask) / 100;
          value *= Number.parseFloat(rawAsk);
          value = Math.round(value * 100) / 100;
        }
        if (getCurrency) {
          getCurrency = getCurrency.name.split('/');
          getCurrency = [getCurrency[0]]; // array destructuring
        }
        return (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{expense.value}</td>
            <td>{getCurrency}</td>
            <td>{ask}</td>
            <td>{value}</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                onClick={ () => this.handleDeleteExpense(expense.id) }
                data-testid="delete-btn"
              >
                Deletar
              </button>
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
        </thead>
        <tbody>{this.renderExpensesTable()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  getWalletState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseAction: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  deleteExpenseAction: PropTypes.func.isRequired,
  getWalletState: PropTypes.arrayOf.isRequired,
};
