import React from 'react';

class Login extends React.Component {
  componentDidUpdate() {
    if (true) {
      document.getElementById('btn').disabled = false;
    }
  }

  render() {
    return (
      <form>
        <label htmlFor="id-email">
          Email
          <input data-testid="email-input" id="id-email" type="email" />
        </label>
        <label htmlFor="id-senha">
          Senha
          <input data-testid="password-input" id="id-senha" type="password" />
        </label>
        <button type="button" disabled id="btn">Entrar</button>
      </form>
    );
  }
}

export default Login;
