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

  const [formIsValid, setFormIsValid] = useState(null);

  const isFormFilled = email.trim() !== '' && password.trim() !== '';
  const emailIsValid = verifyEmail(email);
  const passMatch = doPasswordsMatch(password, passwordRepeat);

  useEffect(() => {
    if (isFormFilled && emailIsValid && passMatch) {
      return setFormIsValid(true);
    }
    setFormIsValid(false);
  }, [isFormFilled, emailIsValid, passMatch]);

  // const [formError, setFormError] = useState({
  //   email: false,
  //   passwordMatch: false,
  //   form: false,
  // });

  async function handleSubmit(e) {
    e.preventDefault();
    // reset errors

    console.log(email, password, passwordRepeat);
    if (!formIsValid) return;
    console.log('we shoud not see this if form is not valid');
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
      setFormIsValid(null);
    };
  }, []);

  return (
    <Card>
      <h2>Hello, welcome back</h2>
      <Hr />
      {!isFormFilled && <p>Please fill all fields</p>}
      {!emailIsValid && <p>Please check your email</p>}
      {!passMatch && <p>Passwords do not match</p>}
      <form onSubmit={handleSubmit}>
        <input
          className={!emailIsValid ? 'invalid' : ''}
          value={email}
          onChange={setEmail}
          type='text'
          placeholder='Username or email'
        />
        <input
          className={!isFormFilled ? 'invalid' : ''}
          value={password}
          onChange={setPassword}
          type='password'
          placeholder='Password'
        />
        <input
          className={!passMatch ? 'invalid' : ''}
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
