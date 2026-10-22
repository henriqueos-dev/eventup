import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";

test("renderiza botao de login se nao ha usuario", () => {
  const contextoSimulado = {
    usuario: null,
    logout: jest.fn(),
  };

  render(
    <AuthContext.Provider value={contextoSimulado}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </AuthContext.Provider>
  );

  const botaoLogin = screen.getByText("Login");
  expect(botaoLogin).toBeInTheDocument();
});

test("renderiza saudacao e botao sair se ha usuario logado", () => {
  const usuarioMock = {
    nome: "Estudante",
    favoritos: [],
  };

  const contextoSimulado = {
    usuario: usuarioMock,
    logout: jest.fn(),
  };

  render(
    <AuthContext.Provider value={contextoSimulado}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </AuthContext.Provider>
  );

  const saudacao = screen.getByText("Olá, Estudante");
  const botaoSair = screen.getByText("Sair");
  const botaoFavoritos = screen.getByText("Favoritos");
  expect(saudacao).toBeInTheDocument();
  expect(botaoSair).toBeInTheDocument();
  expect(botaoFavoritos).toBeInTheDocument();
});
