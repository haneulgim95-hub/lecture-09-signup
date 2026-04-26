import GlobalStyle from "./styled/GlobalStyle.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import Result from "./pages/Result.tsx";

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/result"} element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
