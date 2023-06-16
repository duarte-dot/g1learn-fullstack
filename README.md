# Desafio - G1Learn Fullstack

Este é um projeto que combina o backend em PHP utilizando o framework Laravel e o frontend em React. O projeto foi desenvolvido com o objetivo de concluir o desafio da G1learn.

## Configuração do Ambiente

Antes de começar a usar o projeto, é necessário configurar o ambiente de desenvolvimento. Siga as etapas abaixo para configurar o ambiente necessário. (É bem rapidinho)

### Instalação e uso

1. Clone o repositório do projeto:

exemplo: `git clone git@github.com:duarte-dot/g1learn-fullstack.git`

2. Inicie o projeto usando docker-compose:

na pasta do projeto, abra um terminal e utilize o comando `docker-compose up -d`

3. Configure as variáveis de ambiente do backend:

modifique o arquivo env.example pasta backend/env.example para ".env"

4. Execute as migrações e semeie o banco de dados

utilize o comando `php artisan migrate && php artisan db:seed`

5. Acesse o projeto!

se você seguiu todas as etapas corretamente, poderá acessar o projeto apartir da rota http://localhost:3000/