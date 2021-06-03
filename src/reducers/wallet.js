// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  currentCurrency: 'BRL',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return state;
  default:
    return state;
  }
}

export default wallet;
