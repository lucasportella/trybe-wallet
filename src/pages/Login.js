import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginSubmit } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const { isDisabled } = this.state;
    if (isDisabled) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const { email, password } = this.state;
    const minimalPasswordLength = 6;
    if (password.length >= minimalPasswordLength && email.match(/^[^\s@]+@[^\s@]+$/)) {
      this.setState({
        isDisabled: false,
      });
    }
    // regex veio daqui: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password, isDisabled } = this.state;
    const { loginSubmitAction } = this.props;
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
        <button
          type="button"
          disabled={ isDisabled }
          id="btn"
          onClick={ () => loginSubmitAction(email) }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginSubmitAction: (email) => dispatch(loginSubmit(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  loginSubmitAction: PropTypes.func.isRequired,
};
