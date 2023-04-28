# 🦋 TO-DO CLI APP

⚡ Start your Node.js project with Typescript using Test Driven Development (TDD) practices.

### 📋 GitHub Actions Workflow:

[![🏠 Build](https://github.com/ITAcademy-DevTeams/todo-api/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/ITAcademy-DevTeams/todo-api/actions/workflows/build.yml)

This GitHub Actions workflow automatically builds and tests the application when code changes are pushed to the master branch or a pull request targeting the main branch is opened or synchronized.

### 📥 Installation

To get started with this template, you first need to clone the repository:

```bash
git clone https://github.com/ITAcademy-DevTeams/todo-api.git
```

Then, install the project dependencies:

```bash
npm install
```

### 🏁 How To Start

To start the server in development mode, run the following script:
```bash
npm run dev
```


### 🚀 Production

To run the server in production mode, first build the TypeScript code into JavaScript by running:

```bash
npm run build
```

This will generate the dist directory with the compiled JavaScript files.

Then, start the server by running:

```bash
npm start
```

This will start the server and make it available.


### 🏗️ Scripts
This project comes with several predefined scripts in the package.json file:

```test```: Runs tests using Jest.

```lint```: Runs ESLint to check code quality.

```lint:fix```: Runs ESLint to fix code style issues.

```dev```: Starts the development server with ts-node-dev and allows debugging

```build```: Removes the ./dist folder and compiles the TypeScript code into JavaScript in the ./dist folder.

```start```: Starts the server in production using the compiled files in the dist/ folder.

### 📝 Dependencies


- dotenv: loads environment variables from a .env file

- mongodb: driver for MongoDB

- mysql2: MySQL client for Node.js

### 🛠️ Dev Dependencies

- @types/jest: TypeScript definitions for jest

- @types/mysql: TypeScript definitions for mysql

- eslint: linter for TypeScript

- eslint-config-codely: ESLint configuration used by CodelyTV

- mysql: MySQL driver for Node.js

- rimraf: cross-platform tool for removing files and directories

- ts-jest: TypeScript preprocessor for Jest

- ts-node-dev: TypeScript execution and development environment for Node.js

- tsc-watch: TypeScript compiler with file watching

### 🗂️ Folder structure

In this folder structure, the code is organized according to the principles of Hexagonal Architecture. 

```
 src
  ├── App.ts
  ├── backend
  │  ├── task
  │  │  ├── application
  │  │  │  └── TaskService.ts
  │  │  ├── domain
  │  │  │  ├── Task.ts
  │  │  │  ├── TaskRepository.ts
  │  │  │  └── TaskStatus.ts
  │  │  └── infrastructure
  │  │    ├── JsonTaskRepository.ts
  │  │    ├── TaskController.ts
  │  │    └── taskDb.json
  │  └── user
  │    ├── application
  │    │  ├── BcryptService.ts
  │    │  └── UserService.ts
  │    ├── domain
  │    │  ├── User.ts
  │    │  └── UserRepository.ts
  │    └── infrastructure
  │      ├── JsonUserRepository.ts
  │      ├── UserController.ts
  │      └── userDb.json
  ├── cli
  │  ├── inquirer.start.ts
  │  ├── inquirerMenu.ts
  │  ├── inquirerTask.ts
  │  └── inquireUtils.ts
  └── shared
    ├── application
    │  └── UuidService.ts
    ├── domain
    └── infrastructure
      └── JsonFileUtil.ts
```



