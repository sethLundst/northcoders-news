import { Routes, Route } from "react-router-dom";
import { Error, Navbar } from "./components";
import {
  ParamsProvider,
  ThemeProvider,
  UserProvider,
  VotesProvider,
} from "./contexts";
import { Home, Post } from "./pages";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <VotesProvider>
          <ParamsProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:article_id" element={<Post />} />
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </ParamsProvider>
        </VotesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
