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
    };

    this.doFetch = this.doFetch.bind(this);
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

  render() {
    const { coins, isFetched } = this.state;
    if (!isFetched) {
      return <div>Carregando...</div>;
    }
    return (
      <form>
        <label htmlFor="input-despesa">
          Adicionar valor da despesa:
          <input data-testid="value-input" id="input-despesa" />
        </label>
        <label htmlFor="descricao-despesa">
          Descrição da despesa:
          <textarea data-testid="description-input" id="descricao-despesa" />
        </label>
        <select data-testid="currency-input" id="moeda">
          {coins.map((coin, index) => (
            <option data-testid={ coin.code } key={ index }>
              {coin.code}
            </option>
          ))}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

export default FormExpenses;
