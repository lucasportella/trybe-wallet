// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EXPENSE_SUBMIT, CURRENT_EXCHANGE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  currentCurrency: 'BRL',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSE_SUBMIT:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case CURRENT_EXCHANGE:
    return { ...state,
      expenses: [...state.expenses].map((expense) => {
        if (expense.exchangeRates !== '') {
          return expense;
        } return { ...expense, exchangeRates: action.exchange };
      }) };
  default:
    return state;
  }
}

export default wallet;
