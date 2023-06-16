# Desafio - G1Learn Fullstack

Este é um projeto que combina o backend em PHP utilizando o framework Laravel e o frontend em React, usando também o banco de dados MySQL. O projeto foi desenvolvido com o objetivo de concluir o desafio da G1learn.

Todo o app está conteinerizado com o Docker 🐋!

Todas as informações, como posts criados, comentários e usuários registrados serão guardados no banco de dados.

## Configuração do Ambiente

Antes de começar a usar o projeto, é necessário configurar o ambiente de desenvolvimento. Siga as etapas abaixo para configurar o ambiente necessário. (É bem rapidinho)

## Instalação e uso

### 1. Clone o repositório do projeto:

exemplo: `git clone git@github.com:duarte-dot/g1learn-fullstack.git`

### 2. Configure as variáveis de ambiente do backend:

modifique o arquivo env.example pasta backend/env.example para ".env"
(o arquivo deve ficar assim):

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/ba3b7cea-ec74-4d9a-acdb-ad68669bfc0c" alt="Tela de login" width="600">

### 3. Inicie o projeto usando docker-compose:

na pasta do projeto, abra um terminal e utilize o comando `docker-compose up -d`

### 4. Execute as migrações e semeie o banco de dados

utilize o comando `php artisan migrate && php artisan db:seed`
ele rodará os dois comandos à seguir, juntos, e isso nos permitirá preencher nosso banco de dados com alguns dados fictícios:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/8dcb35c3-d276-4790-96dd-44179cfb6e95" alt="Tela de login" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/ce9aec52-73c1-49c3-9c00-ac17aea6ed54" alt="Tela de login" width="600">


### 5. Acesse o projeto!

se você seguiu todas as etapas corretamente, poderá acessar o projeto apartir da rota http://localhost:3000/

## Informações sobre o projeto:

### Prints:

#### Tela de login:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/cbf7200a-a94d-47da-94c2-998c12e1d6e4" alt="Tela de login" width="600">

Tela de registro:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/93c57756-7bd1-4e3e-8edb-fb50803800cc" alt="Tela de registro" width="600">

#### Home:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/272b2def-e5e6-4dc4-b79b-b1426f13c56c" alt="Home" width="600">

#### Criar uma discussão:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/84226bd9-46e1-4d37-a051-6b83edc8c910" alt="Home" width="600">

#### Tela de usuários:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/170e473e-e661-438d-9a81-cc4c7040dc3e" alt="Home" width="600">

#### Tela de um post (discussão):

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/357318c9-a23b-481a-8334-343f6fd3723a" alt="Home" width="600">

#### Comentários de um post:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/913b496a-3fb3-4a27-be54-15bd1164f3e4" alt="Home" width="600">

#### Editando um comentário:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/2fabdd89-8b7f-41d7-9ae4-97411cba2564" alt="Home" width="600">

#### Comentário editado:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/e55ec42c-2769-44af-bd73-6cebc67ed7a2" alt="Home" width="600">

#### É possível editar e deletar seus próprios posts:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/a19171c5-f114-40da-8d25-5fa1e6164e17" alt="Home" width="600">

#### Edição do post:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/102b9953-8e52-4fd3-8ba6-80e2d385e86f" alt="Home" width="600">

#### Versões mobile:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/336351f0-04e6-4049-82af-d83907b10d8a" alt="Home" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/7795c294-726b-4784-932f-9934052de9a8" alt="Home" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/d9f79e4d-af1c-4cf9-824d-6740bde02677" alt="Home" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/49136b06-866a-403f-8aa7-865f8a4534ce" alt="Home" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/062efb08-4197-4f22-92ad-9debb6c9d183" alt="Home" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/02455a82-f532-48be-a16d-62788310ff05" alt="Home" width="600">

### Outras informações:

## Api:

Foi criada uma API para integração com o Frontend com os seguintes Controllers:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/9e0c8f1f-09ba-44f1-812c-50b681f2245d" alt="Home" width="600">

## Frontend:

O Frontend foi desenvolvido em React com a seguinte estrutura:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/385457da-2c5f-4b3c-8939-94583383a14d" alt="Home" width="600">
<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/1d347742-f7ab-4e00-8d85-cfee6cfdf525" alt="Home" width="600">

## Rotas:

Você pode tentar acessar as rotas via algum aplicativo de requisição. Há também a extensão ThunderClient do VSCode, mas eu recomendo o Insomnia:

### Sistemas de CRUD:
<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/38f3df36-2646-471a-ad28-b5fc9831dc0c" alt="Home" width="600">

## Adicionais

Pretendo continuar trabalhando no projeto e adicionando mais features. Se você tem alguma sugestão, Não deixe de me informar! (Ou, fique à vontade para contribuir e adicionar)

Celular / Whatsapp: (21) 9 7568-1618
Email: gabrieldvr@outlook.com
Linkedin: https://www.linkedin.com/in/gabriel-duarte-dev/

Features que ainda estou pensando em adicionar:
- Criação de categorias através do Front-End. (Já é possível através das rotas com requisições)
- Fotos de perfil para os usuários
- Testes unitários
