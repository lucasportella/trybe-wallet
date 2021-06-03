// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EXPENSE_SUBMIT } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  currentCurrency: 'BRL',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSE_SUBMIT:
    return { ...state, expenses: [...state.expenses, action.expense] };
  default:
    return state;
  }
}

export default wallet;
