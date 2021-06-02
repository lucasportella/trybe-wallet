import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    if (true) {
      document.getElementById('btn').disabled = false;
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <label htmlFor="id-email">
          Email
          <input
            data-testid="email-input"
            id="id-email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
            name="email"
          />
        </label>
        <label htmlFor="id-senha">
          Senha
          <input
            data-testid="password-input"
            id="id-senha"
            type="password"
            value={ password }
            onChange={ this.handleChange }
            name="password"
          />
        </label>
        <button type="button" disabled id="btn">Entrar</button>
      </form>
    );
  }
}

export default Login;
