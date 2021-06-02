import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="id-email">
          Email
          <input data-testid="email-input" id="id-email" type="email" />
        </label>
        <label data-testid="password-input" htmlFor="id-senha">
          Senha
          <input />
        </label>
        <button type="button">Entrar</button>
      </form>
    );
  }
}

export default Login;
