import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FormExpenses extends React.Component {
  render() {
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
        <label htmlFor="moeda">
          Moeda:
          <input data-testid="currency-input" id="moeda" />
        </label>
      </form>
    );
  }
}

export default FormExpenses;
