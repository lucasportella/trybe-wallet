import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {
  constructor() {
    super();
    this.renderExpensesTable = this.renderExpensesTable.bind(this);
  }

  renderExpensesTable() {
    const { getWalletState } = this.props;
    console.log(getWalletState);
    if (getWalletState) {
      return getWalletState.map((expense) =>(
        <tr key={ expense.id }>
          {expense.currency}
        </tr>));
    }
  }

  render() {
    const { getWalletState } = this.props;
    console.log(getWalletState);
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
