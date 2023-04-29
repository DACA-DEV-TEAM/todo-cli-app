# 📖 TO-DO CLI APP

⚡ A Command Line Interface (CLI) TO-DO application built with TypeScript, following Test Driven Development (TDD) practices and hexagonal architecture.

### 📚 Description

This TO-DO CLI application allows users to manage tasks effectively. Users can create tasks, view tasks by status (pending, in progress, completed), update tasks, and delete tasks. The application is designed with hexagonal architecture and uses Typescript for development.


### 📋 GitHub Actions Workflow:

[![🏠 Build](https://github.com/ITAcademy-DevTeams/todo-api/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/ITAcademy-DevTeams/todo-api/actions/workflows/build.yml)

This GitHub Actions workflow automatically builds and tests the application when code changes are pushed to the master branch or a pull request targeting the main branch is opened or synchronized.

### 📋 Prerequisites

- Node.js (version >= 14)
- npm (version >= 6)

### 📥 Installation

To get started, you first need to clone the repository:

```bash
git clone https://github.com/ITAcademy-DevTeams/todo-api.git
```

Next, install the project dependencies:

```bash
npm install
```

### 🏁 How To Start

To start the app in development mode, run the following script:
```bash
npm run dev
```


### 🚀 Production

To run the app in production mode, first build the TypeScript code into JavaScript by running:

```bash
npm run build
```

This will generate the dist directory with the compiled JavaScript files.

Then, start the app by running:

```bash
npm start
```

This will start the app and make it available.


### 🏗️ Scripts
This project comes with several predefined scripts in the package.json file:

```test```: Runs tests using Jest.

```lint```: Runs ESLint to check code quality.

```lint:fix```: Runs ESLint to fix code style issues.

```dev```: Starts the development app with ts-node-dev and allows debugging

```build```: Removes the ./dist folder and compiles the TypeScript code into JavaScript in the ./dist folder.

```start```: Starts the app in production using the compiled files in the dist/ folder.

### 📝 Dependencies


- dotenv: loads environment variables from a .env file

- mongodb: driver for MongoDB

- mysql2: MySQL client for Node.js

### 🛠️ Dev Dependencies

- @types/jest: TypeScript definitions for jest

- @types/mysql: TypeScript definitions for mysql

- eslint: linter for TypeScript

- eslint-config-codely: ESLint configuration used by CodelyTV

- eslint-plugin-hexagonal-architecture: ESLint plugin used to apply hexagonal architecture.

- mysql: MySQL driver for Node.js

- rimraf: cross-platform tool for removing files and directories

- ts-jest: TypeScript preprocessor for Jest

- ts-node-dev: TypeScript execution and development environment for Node.js

- tsc-watch: TypeScript compiler with file watching

### 🗂️ Folder structure

In this folder structure, the code is organized according to the principles of Hexagonal Architecture. 

```
   src/
   ├── App.ts
   ├── backend
   │  ├── shared
   │  │  ├── application
   │  │  │  └── UuidService.ts
   │  │  ├── domain
   │  │  └── infrastructure
   │  │    └── JsonFileUtil.ts
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
   └── cli
      ├── inquirer.start.ts
      ├── inquirerMenu.ts
      ├── inquirerTask.ts
      └── inquireUtils.ts
```
### 🤝 Contributing

Contributions are welcome! To contribute to this project:

- Fork the repository.
- Create a new branch for your feature or bugfix.
- Commit your changes to your branch.
Submit a pull request targeting the develop branch.
For bug reports and feature requests, please open an issue on the GitHub repository.

### 📃 License
This project is licensed under the MIT License. See the LICENSE file for more information.

### 🧑‍💻 Developers
- [@METAWISER](https://github.com/metawiser)
- [@xpan1c](https://github.com/xpan1c)

### 📴 [Try it on Replit](https://replit.com/@DannyX2/todo-api)
