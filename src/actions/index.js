export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const loginSubmit = (email) => ({ type: LOGIN_SUBMIT, email });

export const WALLET_CHANGE = 'WALLET_CHANGE';
export const walletChange = () => ({ type: WALLET_CHANGE });

export const EXPENSE_SUBMIT = 'EXPENSE_SUBMIT';
export const expenseSubmit = (expense) => ({
  type: EXPENSE_SUBMIT,
  expense,
});
