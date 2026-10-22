import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PaginaLogin from "../pages/PaginaLogin";

test("deve permitir digitar o nome do usuario no input", () => {
  const contextoSimulado = {
    login: jest.fn(),
  };

  render(
    <AuthContext.Provider value={contextoSimulado}>
      <BrowserRouter>
        <PaginaLogin />
      </BrowserRouter>
    </AuthContext.Provider>
  );

  const inputNome = screen.getByPlaceholderText("Digite aqui");

  fireEvent.change(inputNome, { target: { value: "Maria" } });

  expect(inputNome.value).toBe("Maria");
});

test("deve chamar a funcao de login ao submeter o formulario", () => {
  const loginMock = jest.fn();

  const contextoSimulado = {
    login: loginMock,
  };

  render(
    <AuthContext.Provider value={contextoSimulado}>
      <BrowserRouter>
        <PaginaLogin />
      </BrowserRouter>
    </AuthContext.Provider>
  );

  const inputNome = screen.getByPlaceholderText("Digite aqui");
  const botaoEntrar = screen.getByText("Entrar");

  fireEvent.change(inputNome, { target: { value: "Joao" } });
  fireEvent.click(botaoEntrar);

  expect(loginMock).toHaveBeenCalledWith("Joao");
});
