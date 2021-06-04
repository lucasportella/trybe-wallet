import fetchAPI from '../services/fetchAPI';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const loginSubmit = (email) => ({ type: LOGIN_SUBMIT, email });

export const WALLET_CHANGE = 'WALLET_CHANGE';
export const walletChange = () => ({ type: WALLET_CHANGE });

export const EXPENSE_SUBMIT = 'EXPENSE_SUBMIT';
export const expenseSubmit = (expense) => ({
  type: EXPENSE_SUBMIT,
  expense,
});

export const CURRENT_EXCHANGE = 'CURRENT_EXCHANGE';
export const getCurrentExchange = (exchange) => ({
  type: CURRENT_EXCHANGE,
  exchange,
});

export const thunker = () => async (dispatch) => {
  try {
    const coins = await fetchAPI();
    return dispatch(getCurrentExchange(coins));
  } catch (error) {
    console.log(error);
  }
};
