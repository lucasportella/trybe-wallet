import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAPI from '../services/fetchAPI';
import { expenseSubmit } from '../actions/index';

class FormExpenses extends React.Component {
  constructor() {
    super();
    this.state = {
      isFetched: false,
      coins: [],
      expense: {
        id: 0,
        inputValue: 0,
        description: '',
        currency: 'USD',
        method: 'dinheiro',
        tag: 'alimentacao',
        exchangeRates: {},
      },
    };

    this.doFetch = this.doFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputDespesaDescricao = this.inputDespesaDescricao.bind(this);
  }

  componentDidMount() {
    this.doFetch().then(() => console.log(this.state));
  }

  async doFetch() {
    const result = await fetchAPI();
    const arrayResult = Object.values(result);
    const formattedResult = arrayResult.filter((coin) => coin.codein !== 'BRLT');
    this.setState((oldState) => ({
      ...oldState,
      coins: formattedResult,
      isFetched: true,
    }));
  }

  handleChange({ target: { name, value } }) {
    this.setState((oldState) => ({
      ...oldState,
      expense: { ...oldState.expense,
        [name]: value,
      },
    }));
  }

  handleSubmit() {
    const { expenseSubmitAction } = this.props;
    const { expense } = this.state;
    expenseSubmitAction(expense);
    this.setState((oldState) => ({
      ...oldState, expense: { ...oldState.expense, id: expense.id + 1 },
    }));
  }

  inputDespesaDescricao(state) {
    const { expense } = state;
    return (
      <>
        <label htmlFor="input-despesa">
          Adicionar valor da despesa:
          <input
            data-testid="value-input"
            id="input-despesa"
            type="number"
            name="inputValue"
            value={ expense.value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descricao-despesa">
          Descrição da despesa:
          <textarea
            data-testid="description-input"
            id="descricao-despesa"
            name="description"
            value={ expense.description }
            onChange={ this.handleChange }
          />
        </label>
      </>
    );
  }

  render() {
    const { coins, isFetched } = this.state;
    if (!isFetched) {
      return <div>Carregando...</div>;
    }
    return (
      <form>
        { this.inputDespesaDescricao(this.state) }
        <select
          data-testid="currency-input"
          id="moeda"
          name="currency"
          onChange={ this.handleChange }
        >
          {coins.map((coin, index) => (
            <option value={ coin.code } data-testid={ coin.code } key={ index }>
              {coin.code}
            </option>
          ))}
        </select>
        <select name="method" data-testid="method-input" onChange={ this.handleChange }>
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao-de-credito">Cartão de crédito</option>
          <option value="cartao-de-debito">Cartão de débito</option>
        </select>
        <select name="tag" data-testid="tag-input" onChange={ this.handleChange }>
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
        <button onClick={ this.handleSubmit } type="button">Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expenseSubmitAction: (state) => dispatch(expenseSubmit(state)),
});

const mapStateToProps = (state) => ({
  expensesList: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
