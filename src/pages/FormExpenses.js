import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    this.setState({
      coins: Object.values(result),
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
          {coins.map((coin, index) => {
            if (coin.name !== 'Dólar Americano/Real Brasileiro Turismo') {
              return (
                <option data-testid={ coin.code } key={ index }>
                  {coin.code}
                </option>);
            } return '';
          })}
        </select>
      </form>
    );
  }
}

export default FormExpenses;
