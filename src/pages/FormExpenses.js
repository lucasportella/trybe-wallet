import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAPI from '../services/fetchAPI';
import { expenseSubmit, thunker } from '../actions/index';

class FormExpenses extends React.Component {
  constructor() {
    super();
    this.state = {
      isFetched: false,
      coins: [],
    };

    this.doFetch = this.doFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputDespesaDescricao = this.inputDespesaDescricao.bind(this);
    this.renderCurrencyAndMethod = this.renderCurrencyAndMethod.bind(this);
  }

  componentDidMount() {
    this.doFetch();
  }

  async doFetch() {
    const result = await fetchAPI();
    const arrayResult = Object.values(result);
    const formattedResult = arrayResult.filter((coin) => coin.codein !== 'BRLT');
    this.setState((oldState) => ({
      ...oldState,
      coins: formattedResult,
      isFetched: true,
      expense: {
        id: 0,
        value: 0,
        currency: 'USD',
        method: 'dinheiro',
        tag: 'alimentacao',
        description: '',
        exchangeRates: '',
      },
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
    const { expenseSubmitAction, thunkerAction } = this.props;
    const { expense } = this.state;
    expenseSubmitAction(expense);
    thunkerAction();
    this.setState((oldState) => ({
      ...oldState,
      expense: {
        id: expense.id + 1,
        value: 0,
        currency: 'USD',
        method: 'dinheiro',
        tag: 'alimentacao',
        description: '',
        exchangeRates: '',
      },
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
            name="value"
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

  renderCurrencyAndMethod() {
    const { coins, expense: { currency, method } } = this.state;
    return (
      <>
        <select
          data-testid="currency-input"
          id="moeda"
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
        >
          {coins.map((coin, index) => (
            <option value={ coin.code } data-testid={ coin.code } key={ index }>
              {coin.code}
            </option>
          ))}
        </select>
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </>
    );
  }

  render() {
    const { isFetched } = this.state;
    if (!isFetched) {
      return <div>Carregando...</div>;
    }
    const { expense: { tag } } = this.state;
    return (
      <form>
        { this.inputDespesaDescricao(this.state) }
        { this.renderCurrencyAndMethod(this.state) }
        <select
          value={ tag }
          name="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button onClick={ this.handleSubmit } type="button">Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expenseSubmitAction: (state) => dispatch(expenseSubmit(state)),
  thunkerAction: () => dispatch(thunker()),
});

const mapStateToProps = (state) => ({
  expensesList: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
