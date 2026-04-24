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



const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
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
    margin-top: 4px;
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


type ErrorType = {
    [key: string]: string;
}

function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState<ErrorType>({});

    const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = validate();
        if (!result) return;

        const data = { username, password, email, name };
        const queryString = new URLSearchParams(data).toString();
        navigate(`/result?${queryString}`);
    };

    const validate = () => {
        const newErrors: ErrorType = {};

        if (!username.trim()) newErrors.username = "아이디는 필수 입력 항목입니다.";
        if (!password.trim()) newErrors.password = "비밀번호는 필수 입력 항목입니다.";
        else if (password.length < 6) newErrors.password = "비밀번호는 6자 이상으로 입력해주세요";
        if (!name.trim()) newErrors.name = "이름은 필수 입력 항목입니다.";
        if (!email.trim()) newErrors.email = "이메일은 필수 입력 항목입니다."
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) newErrors.email = "올바른 이메일 형식으로 입력해주세요";

        setError(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    return (
        <Wrap>
            <Card onSubmit={onSubmit}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input placeholder={"아이디"} onChange={e => setUsername(e.target.value)}></Input>
                    {error.username && <ErrorText>{error.username}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input placeholder={"비밀번호"} onChange={e => setPassword(e.target.value)}></Input>
                    {error.password && <ErrorText>{error.password}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input placeholder={"이름"} onChange={e => setName(e.target.name)}></Input>
                    {error.name && <ErrorText>{error.name}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input placeholder={"이메일"} onChange={e => setEmail(e.target.value)}></Input>
                    {error.email && <ErrorText>{error.email}</ErrorText>}
                </InputGroup>
                <Button type={"submit"}>회원가입</Button>
            </Card>
        </Wrap>
    );
}
export default Home;