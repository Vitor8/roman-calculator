# Boas vindas ao repositório da aplicação Roman Calculator!

O objetivo foi criar uma API que simula uma calculadora de números romanos.

Os usuários precisam se cadastrar e logar e, após a autentificação JWT, os usuários mandam no body da requisição os números romanos a serem somados e subtraídos.

O enpoint retorna o valor final em algarismo romano e a operação que foi realizada.

---

## Estrutura

Organizei meu código no seguinte formato:

![Captura de tela de 2021-11-23 15-19-30](https://user-images.githubusercontent.com/24492328/143081948-19c6ee9a-aa8a-44dd-9943-de985308f5b2.png)

- No arquivo `index.js` estão os enpoints da API.
- Na pasta `roman-converter` estão as funções que utilizo para converter algarismos romanos em arábicos, e arábicos em romanos.
- Na pasta `controllers` estão as funções que controlam o output final para o usuário, de acordo com os dados recebidos.
- Na pasta `models` estão as funções responsáveis pela conexão e manipulação do bancos de dados.
- Na pasta `test` estão as funções de teste que cobrem as principais funcionalidades da API.
- Na pasta `validations` estão as funções responsáveis por validar os dados recebidos do usuário.

A autenticação é feita via `JWT`.

##  Todos os meus endpoints estão no padrão REST

- Utilizo verbos HTTP adequados para cada operação.

- URL´s agrupadas e padronizadas para cada recurso.

- Endpoints sempre retornam uma resposta, havendo sucesso nas operações ou não.

## Conexão com o Banco

**⚠️ IMPORTANTE! ⚠️**

Ao clonar o repositório, instale as dependências utilizando o `npm install`.

Para rodar o projeto na sua máquina, é necessário ter o MongoDB instalado. 

Para realizar a conexão com o banco, utilizei os seguintes parâmetros:

```javascript
require('dotenv').config();
const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'RomanCalculator';
```

## Coleção

O banco possui apenas uma coleção de usuários.

O nome da coleção de usuários é: `users`.

Os campos da coleção `users` possuem o formato:

```json
{ "email" : "erickjacquin@gmail.com", "password" : "12345678" }
```
---

## Testes

As principais funcionalidades da API são testadas **automaticamente**. Cada `endpoint` possui vários requisitos. Os testes se encontram no arquivo `calculator.test.js` na pasta `test`.

Para executar os testes localmente, digite no terminal o comando `npm test`.

---

# Requisitos do projeto

Para uma melhor organização do projeto, dividi aquilo que foi pedido em 4 requisitos.

### 1 - Criação de endpoint para o cadastro de usuários

- A rota deve ser (`/user`).

- O body da requisição precisa ter os campos obrigatórios Email e Senha.

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- O campo Email precisa ser válido e único.

### 2 - Criação de endpoint para o login de usuários

- A rota deve ser (`/login`).

- A rota deve receber os campos Email e Senha e esses campos são validados no banco de dados.

- Um token `JWT` deve ser gerado e retornado caso haja sucesso no login. No seu payload deve estar presente o id e email do usuário.

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### 3 - Criação de endpoint para operação com números romanos

- A rota deve ser (`/calculator`).

- O cálculo só poder ser feito caso o usuário esteja logado e o token `JWT` validado.

- O body da requisição deve conter dois arrays. Os números presentes em um array serão somados, e o do outro subtraídos, da esquerda para a direita. 

  ```json
  {
    "numbersToSum": ["romanNumber1", "romanNumber2", "romanNumber3", ...],
    "numbersToSub": ["romanNumber1", "romanNumber2", "romanNumber3", ...]
  }
  ```
- O retorno da requisição deve seguir o seguinte formato:

```json
{
    "numbersSum": "romanNumber1 + romanNumber2 + romanNumber3 + ... = totalRomanSum",
    "numbersSubtraction": "romanNumber1 - romanNumber2 - romanNumber3 - ... = totalRomanSub"
}
```

### 4 - Criação de teste para as principais funcionalidade da aplicação

- Para cada principal funcionalidade do projeto, criei uma série de testes utilizando o `Jest`.

- Os testes se encontram na pasta `test` no arquivo `calculator.test.js`

- Para rodar os teste, certifique-se da aplicação já estar rodando `npm start`, e digite no terminal o comando `npm test`
