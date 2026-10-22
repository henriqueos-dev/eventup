# EventUp

Aplicação web desenvolvida em React para busca e visualização de eventos culturais e shows através da integração com a API pública da Ticketmaster.

Desenvolvi esta aplicação a princípio como projeto acadêmico da minha graduação em Análise e Desenvolvimento de Sistemas. Depois, refatorei o projeto para um ambiente local limpo, desacoplando componentes, aplicando gerenciamento de estado global e estruturando testes automatizados antes de publicar no GitHub.

---

## O que a aplicação faz

- **Integração com a Ticketmaster Discovery API:** Faz requisições para listar eventos reais, com tratamento visual de carregamento, tratamento de erros e fallback para eventos sem imagem cadastrada.
- **Navegação com rotas dinâmicas:** Estruturação de páginas via React Router, permitindo transitar entre o catálogo geral, a tela individual de cada evento (`/evento/:id`), página de login e perfil.
- **Gerenciamento de estado global com Context API:** Centralização da sessão do usuário e da lista de eventos favoritos, evitando repasse desnecessário de propriedades entre componentes.
- **Persistência local defensiva:** Salvamento dos dados do usuário e favoritos no `localStorage` do navegador, com tratamento de exceções para evitar travamentos caso os dados locais estejam corrompidos.
- **Recursos de experiência do usuário:** Sistema de favoritar e desfavoritar com notificação temporária para desfazer a remoção, além de links externos para compra de ingressos e busca de rota direta no Google Maps.
- **Testes unitários:** Testes automatizados com Jest e React Testing Library cobrindo renderização condicional de elementos e envio de formulários.

---

## Tecnologias utilizadas

- React 18
- React Router DOM
- Context API (gerenciamento de estado nativo)
- CSS Modules (estilização com escopo isolado)
- Jest & React Testing Library (testes unitários)
- Ticketmaster Discovery API (REST)

---

## Como executar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/henriqueos-dev/eventup.git
cd eventup
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a chave de API:
- Crie um arquivo chamado `.env` na raiz do projeto (ou copie a partir do `.env.example`):
```bash
cp .env.example .env
```
- Insira a chave da Ticketmaster no arquivo `.env`. Para demonstração e teste rápido, você pode utilizar a chave pública de testes abaixo:
```env
REACT_APP_TICKETMASTER_API_KEY=TsbZzP1jeIxV15iG5pjecwDrwoVkWU0b
```

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```
O aplicativo abrirá no navegador no endereço `http://localhost:3000`.

---

## Testes automatizados

Para executar os testes unitários da aplicação:

```bash
npm test
```