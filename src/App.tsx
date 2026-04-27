import GlobalStyle from "./styles/GlobalStyle.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/Home.tsx";
import Result from "./routes/Result.tsx";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/result"} element={<Result/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
