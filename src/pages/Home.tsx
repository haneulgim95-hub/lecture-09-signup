import styled from "styled-components";
import { useNavigate } from "react-router";
import { Title, Wrap } from "../components/Components.tsx";
import { useForm } from "react-hook-form";

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
};

function Home() {
    const navigate = useNavigate();

    const {
        register, // 화면에 존재하는 input과 react-hook-form을 연결하는 기능
        handleSubmit, // react-hook-form에서 기재한 유효성 검사를 포함하여 submit 처리할 때 사용하는 기능
        formState: { errors },      // errors : 유효성 검사 결과 값이 저장되는 곳
    } = useForm<FormValues>();

    // 예전에 onSubmit 속성에 집어넣었을 때에는 (event) => {}의 함수였어야 되는데,
    // react-hook-form을 사용하면서 handleSubmit() 안에 매개변수로 넣어야 되는 함수가 되었기 때문에
    // 그 모양은 (data: 리액트측폼에 맡겼던 그 타입) => {} 모양이 되어야 함
    // 즉 매개변수인 data에는 react-hook-form이 갖고 있는 값들이 객체로 들어옴
    const onSubmit = (data: FormValues) => {
        const queryString = new URLSearchParams(data).toString(); // 객체를 쿼리스트링으로 만들어서 string으로 형변환
        navigate(`/result?${queryString}`);
    };

    return (
        <Wrap>
            {/* handleSubmit() => react-hook-form에 맡긴 validate를 진행 */}
            <Card onSubmit={handleSubmit(onSubmit)}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디"}
                        {...register("username", {
                            required: "아이디는 필수 입력값 입니다.",
                        })}
                        // register()라고 하는 애를 실행하면,
                        // input 태그가 가져야 하는 속성들을 객체로 반환(return)
                        // 그렇기 때문에 중괄호를 치고 (Javascript를 쓰겠다)
                        // 스프레드 문법을 통해 풀어주는 것
                        // register(해당 input이 어떤 녀석인지 string, 그 인풋에 대한 옵션값 객체)
                    />
                    {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호"}
                        type={"password"}
                        {...register("password", {
                            required: "비밀번호는 필수 입력 값입니다.",
                            minLength: {
                                value: 6,
                                message: "비밀번호는 최소 6자 이상이어쟈 합니다.",
                            },
                        })}
                    />
                    {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이름"}
                        {...register("name", { required: "이름은 필수 입력 값입니다." })}
                    />
                    {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일"}
                        type={"email"}
                        {...register("email", {
                            required: "이메일은 필수 입력 값입니다.",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "올바른 이메일 형식이 아닙니다.",
                            },
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

// react-hook-form 사용하는 기본 순서
// 1. react-hook-form에게 맡길 타입 지정
// 2. useForm<타입>() 을 실행해서 내가 필요한 기능을 뽑아오고 (필수적인건 register, handleSubmit)
// 3. 각각 input에 가서 register를 실행해주기
// 4. form의 onSubmit 속성에 handleSubmit으로 감싼 전송 함수 넣기
// 5. 전송 함수 작성하기


