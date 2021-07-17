import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";

import Input from "../../components/Input/Input";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailAccessory = useMemo(() => {
    return email !== "" && <button>X</button>;
  }, [email !== ""]);

  const passwordAccessory = useMemo(() => {
    return password !== "" && <button>X</button>;
  }, [password !== ""]);

  const handleChangeEmail = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const handleChangePassword = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log(email, password);
    },
    [email, password]
  );

  const handleReset = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={handleChangeEmail}
        accessory={emailAccessory}
        autoFocus={true}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={handleChangePassword}
        accessory={passwordAccessory}
      />
      <button type="submit">가입하기</button>
      <button type="button" onClick={handleReset}>
        초기화
      </button>
    </form>
  );
}

export default Signup;
