import { useState } from "react";
import { authService } from "firebaseInstance";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 회원가입
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // 로그인
        data = signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          required
          onChange={onChange}
          className="authInput"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          required
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "로그인하기" : "계정만들기"}
      </span>
    </>
  );
}

export default AuthForm;
