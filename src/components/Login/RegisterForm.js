import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import useInput from '../../hooks/useInput';
import { postData } from '../../utils/http';
import { AuthContext } from '../../store/AuthProvider';
import { useHistory, Link } from 'react-router-dom';
import { doPasswordsMatch, verifyEmail } from '../../utils/validate';

const Card = styled.div`
  max-width: 400px;
  margin: auto;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #000;
  form {
    max-width: 300px;
    margin: 3rem auto;
  }
  input {
    display: block;
    font-size: 1rem;
    padding: 4px;
    width: 100%;
    margin-bottom: 10px;
  }
  input.invalid {
    border-color: tomato;
    background-color: rgb(255, 200, 190);
  }
  h2 {
    margin: 1rem auto;
  }
  button {
    background-color: #333;
    border: 1px solid #333;
    text-transform: uppercase;
    color: inherit;
    padding: 0.4rem 1rem;
    font-size: 1rem;
    color: white;
  }
  button:disabled {
    background-color: #545454;
    cursor: not-allowed;
  }
  form a {
    display: block;
    text-align: right;
    margin-bottom: 1rem;
  }
  h6 {
    background-color: #ededed;
    text-align: center;
    padding: 1rem 0;
    font-size: 1rem;
  }
`;
const Hr = styled.div`
  height: 1px;
  background-color: gray;
`;

export default function RegisterForm() {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  // console.log('authCtx', authCtx);
  const [email, setEmail] = useInput('james@auth.com');
  const [password, setPassword] = useInput('123456');
  const [passwordRepeat, setPasswordRepeat] = useInput('12345');

  const [formError, setFormError] = useState({
    email: false,
    passwordMatch: false,
    form: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // reset errors
    setFormError((state) => {
      return {
        email: false,
        passwordMatch: false,
        form: false,
      };
    });
    if (!email || !password) {
      return setFormError({
        ...formError,
        form: 'email and pass cant be blank',
      });
    }
    console.log(email, password, passwordRepeat);

    // patikrinti ar slaptazodiziai sutampa, jei ne ismesti klaida
    // parodyti klaida formoj
    // isvalyti klaidas kai slaptazodziai sutampa
    // patikrinti kad email validuma su regex arba tiesiog patikrinti kad jis turetu @ ir taska po @
    const passMatch = doPasswordsMatch(password, passwordRepeat);
    const validEmail = verifyEmail(email);
    console.log('validEmail', validEmail);
    if (!validEmail) {
      console.log('invalid email');
      setFormError((errorState) => ({
        ...errorState,
        email: 'Please check email format',
      }));
    }
    // pass match validation
    if (!passMatch) {
      console.log('not match');
      setFormError((errorState) => ({
        ...errorState,
        passwordMatch: 'pass must match',
      }));
    }
    return;
    const postToStrapiAuthReslut = await postData(
      { email, password },
      '/auth/local'
    );
    // console.log(postToStrapiAuthReslut);
    // irasyti token i context
    const userData = {
      email: postToStrapiAuthReslut.user.email,
      username: postToStrapiAuthReslut.user.username,
    };
    authCtx.login(postToStrapiAuthReslut.jwt, userData);
    // redirect
    history.replace('/blog');
  }

  useEffect(() => {
    // componentWillUmount
    return () => {
      console.log('clean up');
      setFormError(null);
    };
  }, []);

  return (
    <Card>
      <h2>Hello, welcome back</h2>
      <Hr />
      {formError.passwordMatch && <p>{formError.passwordMatch}</p>}
      {formError.email && <p>{formError.email}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className={formError.email ? 'invalid' : ''}
          value={email}
          onChange={setEmail}
          type='text'
          placeholder='Username or email'
        />
        <input
          className={formError.passwordMatch ? 'invalid' : ''}
          value={password}
          onChange={setPassword}
          type='password'
          placeholder='Password'
        />
        <input
          className={formError.passwordMatch ? 'invalid' : ''}
          value={passwordRepeat}
          onChange={setPasswordRepeat}
          type='password'
          placeholder='repeat Password'
        />

        <button type='submit'>Register</button>
      </form>
      <Hr />
      <h6>
        Have an account? <Link to='login'>Login</Link>
      </h6>
    </Card>
  );
}
