# Fórum App

This is a project that combines PHP backend using the Laravel framework and React frontend, also utilizing the MySQL database. The project was developed to complete the G1learn challenge.

The entire app is containerized with Docker 🐋!

All information such as created posts, comments, and registered users will be stored in the database.

## Environment Setup

Before starting to use the project, you need to set up the development environment. Follow the steps below to configure the necessary environment. (It's really quick!)

### Installation and Usage

#### 1. Clone the project repository:

For example: `git clone git@github.com:duarte-dot/g1learn-fullstack.git`

#### 2. Configure backend environment variables:

Modify the `env.example` file in the `backend` directory to `.env`.
(The file should look like this):

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/ba3b7cea-ec74-4d9a-acdb-ad68669bfc0c" alt="Login screen" width="600">

#### 3. Install dependencies:

Run the commands:

`cd frontend && npm i && cd ..` - installs frontend dependencies

`cd backend && composer i && cd ..` - installs backend dependencies

#### 4. Start the project using docker-compose:

In the project folder, open a terminal and use the command `docker-compose up -d`

#### 5. Run migrations and seed the database:

Use the command `php artisan migrate && php artisan db:seed`

If it asks for permission, probably type "yes" in the terminal.

It will run the following two commands together, allowing us to populate our database with some fictional data:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/8dcb35c3-d276-4790-96dd-44179cfb6e95" alt="Login screen" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/ce9aec52-73c1-49c3-9c00-ac17aea6ed54" alt="Login screen" width="600">

#### 6. Access the project!

If you followed all the steps correctly, you can access the project through the route http://localhost:3000/

## Project Information

### Screenshots:

#### Login Screen:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/cbf7200a-a94d-47da-94c2-998c12e1d6e4" alt="Login screen" width="600">

#### Registration Screen:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/93c57756-7bd1-4e3e-8edb-fb50803800cc" alt="Registration screen" width="600">

#### Home:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/272b2def-e5e6-4dc4-b79b-b1426f13c56c" alt="Home" width="600">

#### Create Discussion:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/84226bd9-46e1-4d37-a051-6b83edc8c910" alt="Create discussion" width="600">

#### Users Screen:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/170e473e-e661-438d-9a81-cc4c7040dc3e" alt="Users screen" width="600">

#### Post (Discussion) Screen:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/357318c9-a23b-481a-8334-343f6fd3723a" alt="Post screen" width="600">

#### Post Comments:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/913b496a-3fb3-4a27-be54-15bd1164f3e4" alt="Post comments" width="600">

#### Editing a Comment:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/2fabdd89-8b7f-41d7-9ae4-97411cba2564" alt="Edit comment" width="600">

#### Edited Comment:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/e55ec42c-2769-44af-bd73-6cebc67ed7a2" alt="Edited comment" width="600">

#### Editing and Deleting Your Own Posts:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/a19171c5-f114-40da-8d25-5fa1e6164e17" alt="Edit post" width="600">

#### Post Edit:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/102b9953-8e52-4fd3-8ba6-80e2d385e86f" alt="Post edit" width="600">

#### Mobile Versions:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/336351f0-04e6-4049-82af-d83907b10d8a" alt="Mobile version" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/7795c294-726b-4784-932f-9934052de9a8" alt="Mobile version" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/d9f79e4d-af1c-4cf9-824d-6740bde02677" alt="Mobile version" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/49136b06-866a-403f-8aa7-865f8a4534ce" alt="Mobile version" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/062efb08-4197-4f22-92ad-9debb6c9d183" alt="Mobile version" width="600">

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/02455a82-f532-48be-a16d-62788310ff05" alt="Mobile version" width="600">

### API:

An API was created for integration with the frontend with the following Controllers:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/9e0c8f1f-09ba-44f1-812c-50b681f2245d" alt="API Controllers" width="600">

## Frontend:

The Frontend was developed in React with the following structure:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/385457da-2c5f-4b3c-8939-94583383a14d" alt="Frontend structure" width="600">
<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/1d347742-f7ab-4e00-8d85-cfee6cfdf525" alt="Frontend structure" width="600">

## Routes:

You can try to access the routes via a request application. There is also the ThunderClient extension for VSCode, but I recommend Insomnia:

#### CRUD Systems:

<img src="https://github.com/duarte-dot/g1learn-fullstack/assets/78454964/38f3df36-2646-471a-ad28-b5fc9831dc0c" alt="CRUD Systems" width="600">

## Additions

I plan to continue working on the project and adding more features. If you have any suggestions, feel free to let me know! (Or, feel free to contribute and add)

Phone / Whatsapp: (21) 9 7568-1618

Email: gabrieldvr@outlook.com

Linkedin: https://www.linkedin.com/in/gabriel-duarte-dev/

Features I'm still considering adding:
- Creating categories through the Frontend. (Already possible through routes with requests)
- Profile pictures for users
- Unit tests

