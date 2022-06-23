import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import {
  Articles,
  ArticleView,
  Error,
  Navbar,
  ThemeProvider,
} from "./components";
import useUser, { UserProvider } from "./contexts/UserContext";
import { VotesProvider } from "./contexts/VotesContext";
import { ParamsProvider } from "./contexts/ParamsContext";
import useFetchVotes from "./hooks/useFetchVotes";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <VotesProvider>
          <ParamsProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Articles />} />
              <Route path="/articles/:article_id" element={<ArticleView />} />
              <Route path="/loading" />
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
