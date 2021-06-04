import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {
  constructor() {
    super();
    this.renderExpensesTable = this.renderExpensesTable.bind(this);
  }

  renderFullTable() {}

  renderExpensesTable() {
    const { getWalletState } = this.props;
    if (getWalletState) {
      return getWalletState.map((expense) => {
        let getCurrency = expense.exchangeRates[expense.currency];
        const getAsk = expense.exchangeRates[expense.currency];
        let ask = 'Loading...';
        let value = Number.parseFloat(expense.value);
        let rawAsk = '';
        if (getAsk) {
          ask = getAsk.ask * 100;
          rawAsk = getAsk.ask;
          ask = (Math.round(ask)) / 100;
          value *= Number.parseFloat(rawAsk);
          value = (Math.round(value * 100))/100;
        }
        if (getCurrency) {
          getCurrency = getCurrency.name;
          getCurrency = getCurrency.split('/');
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

export default connect(mapStateToProps)(Table);
