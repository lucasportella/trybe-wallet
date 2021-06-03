import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import fetchAPI from '../services/fetchAPI';

class FormExpenses extends React.Component {
  constructor() {
    super();
    this.state = {
      isFetched: false,
      coins: [],
      expense: {
        inputValue: 0,
        description: '',
        currency: 'USD',
        method: 'dinheiro',
        tag: 'alimentacao',
      },
    };

    this.doFetch = this.doFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.doFetch();
  }

  async doFetch() {
    const result = await fetchAPI();
    const arrayResult = Object.values(result);
    const formattedResult = arrayResult.filter((coin) => coin.codein !== 'BRLT');
    this.setState({
      coins: formattedResult,
      isFetched: true,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState((oldState) => ({
      ...oldState,
      expense: { ...oldState.expense,
        [name]: value,
      },
    }));
  }

  render() {
    const { coins, isFetched, expense } = this.state;
    if (!isFetched) {
      return <div>Carregando...</div>;
    }
    return (
      <form>
        <label htmlFor="input-despesa">
          Adicionar valor da despesa:
          <input
            data-testid="value-input"
            id="input-despesa"
            type="number"
            name="input-value"
            value={ expense.value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descricao-despesa">
          Descrição da despesa:
          <textarea
            data-testid="description-input"
            id="descricao-despesa"
            name="textarea-description"
            value={ expense.description }
          />
        </label>
        <select data-testid="currency-input" id="moeda" name="select-coins">
          {coins.map((coin, index) => (
            <option value={ coin.code } data-testid={ coin.code } key={ index }>
              {coin.code}
            </option>
          ))}
        </select>
        <select name="select-method" data-testid="method-input">
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao-de-credito">Cartão de crédito</option>
          <option value="cartao-de-debito">Cartão de débito</option>
        </select>
        <select name="select-tag" data-testid="tag-input">
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

export default FormExpenses;
