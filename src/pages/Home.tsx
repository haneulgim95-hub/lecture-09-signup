import styled from "styled-components";
import { useNavigate } from "react-router";
import { Title, Wrap } from "../components/Components.tsx";
import {useForm} from "react-hook-form";

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
    margin-top: 4px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

type FormValues = {
    username: string;
    password: string;
    name: string;
    email: string;
}

function Home() {
    const navigate = useNavigate();
    
    const {register, handleSubmit, formState: { errors }} = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        const queryString = new URLSearchParams(data).toString(); // 객체를 쿼리스트링으로 만들어서 string으로 형변환
        navigate(`/result?${queryString}`);
    };


    return (
        <Wrap>
            <Card onSubmit={handleSubmit(onSubmit)}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디"}
                        {...register("username", { required: "아이디는 필수 입력 항목" })}
                    />
                    {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호"}
                        type={"password"}
                        {...register("password", {
                            required: "비밀번호는 필수 입력 항목",
                            minLength: { value: 6, message: "비밀번호는 최소 6자 이상" },
                        })}
                    />
                    {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이름"}
                        {...register("name", { required: "이름은 필수 입력 항목" })}
                    />
                    {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일"}
                        type={"email"}
                        {...register("email", {
                            required: "이메일은 필수 입력 항목",
                            pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "이메일 형식에 맞지 않습니다." },
                        })}
                    />
                    {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                </InputGroup>
                <Button type={"submit"}>회원가입</Button>
            </Card>
        </Wrap>
    );
}

export default Home;
