# Clicksoft School - API com AdonisJs

## Descrição

Este foi um desafio proposto pela Clicksoft!

Uma API desenvolvida em Node.js utilizando AdonisJs para controlar a alocação de salas em escolas e universidades. A aplicação permite o cadastro, edição, exclusão e consulta de dados de alunos e professores, além do gerenciamento de salas de aula e alocação de alunos.

## Banco de Dados

Este projeto foi desenvolvido utilizando PostgreSQL. Se você preferir usar outro banco de dados, ajuste a configuração no arquivo `.env` e nas migrações conforme necessário.

## Instalação

1. Clone o repositório:
    ```sh
    git@github.com:VaccaniDev/ClickSoftSchool_API_AdonisJs_VaccaniDev.git
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Configure o arquivo `.env` com suas credenciais do banco de dados e outras configurações necessárias:
    ```sh
    .env.example .env
    ```
4. Execute as migrações do banco de dados:
    ```sh
    node ace migration:run
    ```

## Usando a API

1. Inicie o servidor:
    ```sh
    node ace serve
    ```
2. Acesse a API através de `http://localhost:3333`.

## Rotas

As rotas da aplicação estão definidas no arquivo `start/routes.ts`. Para facilitar o teste das rotas, você pode importar o arquivo JSON do Insomnia que está incluído neste repositório.

Algumas rotas dos professores precisam de token de acesso, são elas:

    * GET | `http://localhost:3333/professor` (Para pegar os dados do professor)
    * DELETE | `http://localhost:3333/professor/logout` (Para deslogar o professor)
    * PATCH | `http://localhost:3333/professor/:id` (Para atualizar os dados do professor)
    * DELETE | `http://localhost:3333/professor/1` (Para deletar a conta do professor)
    
    * POST | `http://localhost:3333//professor/sala` (Criação de sala associada ao professor)
    * GET | `http://localhost:3333//professor/sala/:salaId` (Para pegar os dados da sala referente ao professor)
    * PATCH | `http://localhost:3333/professor/sala/:salaId` (Para atualizar os dados da sala referente ao professor)
    * DELETE | `http://localhost:3333/professor/sala/:salaId` (Para deletar a sala referente ao professor)


    * POST | `http://localhost:3333/professor/sala/aluno` (Aloca o aluno na sala)
    * GET | `http://localhost:3333//professor/sala/:salaId/aluno` (Para pegar os alunos alocados na sala)
    * DELETE | `http://localhost:3333/professor/sala/:salaId/aluno/:alunoId` (Para desalocar o aluno da sala)

## Contribuição

1. Fork o repositório.
2. Crie uma nova branch: `git checkout -b minha-nova-feature`
3. Faça suas alterações e commit: `git commit -am 'Adiciona nova feature'`
4. Envie para o repositório remoto: `git push origin minha-nova-feature`
5. Abra um pull request.
