import styled from "styled-components";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { Title, Wrap } from "../components/Components.tsx";



const Card = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  transition: all 0.5s;

  &:focus {
    outline: none; /* input에 focus 되면 진한 까만 테두리가 생기는것.*/
    border: 1px solid #6c8ce7;
  }
`;

const ErrorText = styled.span`
  color: #d63031;
  font-size: 12px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;



const Button = styled.button`
  padding: 14px;
  background-color: #6c8ce7;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;
`;




function Home() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  type ErrorType = {
    [key: string] : string
  }

  const [errors, setErrors] = useState<ErrorType>({});

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    // 1. 초기화 막기
    e.preventDefault();

    // 2. 유효성 검사
    const result = validate();
    if (!result) return;

    // 3. 백엔드에게 데이터 전달
    const data = { username, password, name, email };
    const queryString = new URLSearchParams(data).toString();
    navigate(`/result?${queryString}`);
  };

  const validate = () => {
    const newErrors: ErrorType = {};

    if (!username.trim()) newErrors.username = "아이디는 필수 입력 항목입니다";

    if (!password.trim()) newErrors.password = "비밀번호는 필수 입력 항목입니다.";
    else if (password.length < 6) newErrors.password = "비밀번호는 6자 이상으로 입력해주세요";

    if (!name.trim()) newErrors.name = "이름은 필수 입력 항목입니다";

    if (!email.trim()) newErrors.email = "이메일은 필수 입력 항목입니다";
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) newErrors.email = "이메일의 형식에 맞게 입력해주세요";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  return (
    <Wrap>
      <Card onSubmit={onSubmit}>
        <Title>회원가입</Title>
        <InputGroup>
          <Input placeholder={"아이디를 입력해주세요"} onChange={e => setUsername(e.target.value)}/>
          {errors.username && <ErrorText>{errors.username}</ErrorText>}
        </InputGroup>
        <InputGroup>
          <Input placeholder={"비밀번호를 입력해주세요"} type={"password"} onChange={e => setPassword(e.target.value)}/>
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </InputGroup>
        <InputGroup>
          <Input placeholder={"이름을 입력해주세요"} onChange={e => setName(e.target.value)}/>
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </InputGroup>
        <InputGroup>
          <Input placeholder={"이메일을 입력해주세요"} type={"email"} onChange={e => setEmail(e.target.value)}/>
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </InputGroup>
        <Button>회원가입</Button>
      </Card>
    </Wrap>
  );
}

export default Home;