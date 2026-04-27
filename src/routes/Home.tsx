import styled from "styled-components";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";

export const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100dvh;
    background-color: bisque;
    padding: 20px;
`;

const Card = styled.form`
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 15px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Input = styled.input`
    padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  transition: all 0.3s;
  
  &:focus {
    border-color: #6c8ce7;
    outline: none;
  }
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

const ErrorText = styled.span`
    color: #d63031;
    font-size: 12px;
`;

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  type ErrorType = {
    [key: string]: string;
  }
  const [errors, setErrors] = useState<ErrorType>({});

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    // 초기화 막기
    e.preventDefault();

    // 유효성 테스트
    const result = validate();
    if (!result) return;

    // 백엔드에게 데이터 보내기
    const data = {username, password, name, email};
    const queryString = new URLSearchParams(data).toString();
    navigate(`result?${queryString}`);
  };

  const validate = () => {
    const newErrors: ErrorType = {};

    if (!username.trim()) newErrors.username = "아이디는 필수 입력 항목입니다.";

    if (!password.trim()) newErrors.password = "비밀번호는 필수 입력 항목입니다.";
    else if (password.length < 6) newErrors.password = "비밀번호는 6자 이상으로 입력해주세요.";

    if (!name.trim()) newErrors.name = "아이디는 필수 입력 항목입니다.";

    if (!email.trim()) newErrors.email = "이메일은 필수 입력 항목입니다.";
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) newErrors.email = "이메일 형식이 잘못 되었습니다";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

    return (
        <Wrap>
            <Card onSubmit={onSubmit}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디를 입력해주세요."}
                        onChange={e => setUsername(e.target.value)}
                    />
                    {errors.username && <ErrorText>{errors.username}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호를 입력해주세요."}
                        type={"password"}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {errors.password && <ErrorText>{errors.password}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이름을 입력해주세요."}
                        onChange={e => setName(e.target.value)}
                    />
                    {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일을 입력해주세요."}
                        type={"email"}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </InputGroup>
              <Button>회원가입</Button>
            </Card>
        </Wrap>
    );
}

export default Home;
