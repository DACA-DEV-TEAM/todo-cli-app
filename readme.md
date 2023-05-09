# 📖 TO-DO CLI APP

⚡ A Command Line Interface (CLI) TO-DO application built with TypeScript, following Test Driven Development (TDD) practices and hexagonal architecture.

### 📚 Description

This TO-DO CLI application allows users to manage tasks effectively. Users can create tasks, view tasks by status (pending, in progress, completed), update tasks, and delete tasks. The application is designed with hexagonal architecture and uses Typescript for development.

### 🕹 [Demo on Replit](https://replit.com/@METAWISER/todo-cli-app?v=1)

Try out the TO-DO CLI app in a live demo on Replit, an online platform to test and run code.

### 📋 GitHub Actions Workflow:

[![🏠 Build](https://github.com/ITAcademy-DevTeams/todo-api/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/ITAcademy-DevTeams/todo-api/actions/workflows/build.yml)

This GitHub Actions workflow automatically builds and tests the application when code changes are pushed to the master branch or a pull request targeting the main branch is opened or synchronized.

### 📋 Prerequisites

- Node.js (version >= 14)
- npm (version >= 6)
- MongoDB or MySQL installed and running, depending on the database you choose to use.
### 💾 Using MongoDB or MySQL as a database
This TO-DO CLI app can be used with either MongoDB or MySQL as a database. To configure the application to use the desired database, update the .env file in the root of your project with the corresponding environment variables.
#### 🍃 MongoDB Configuration
To use MongoDB as your database, provide the MongoDB connection URI in the `MONGO_URI` variable and choose it on cli menu.
#### 🐬 MySQL Configuration
To use MySQL as your database provide the MySQL connection details in the `MYSQL_HOST`, 'MYSQL_USER', and `MYSQL_PASSWORD` variables and choose it on cli menu.

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


- bcrypt: Library for hashing and comparing passwords.
- dotenv: Loads environment variables from a .env file.
- inquirer: Interactive CLI prompt library.
- mongodb: Driver for MongoDB.
- mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.
- mysql2: MySQL client for Node.js.
- reflect-metadata: Polyfill for metadata reflection in TypeScript.
- sequelize: Promise-based Node.js ORM for SQL databases.
- sequelize-typescript: Adds TypeScript support to Sequelize ORM.
- uuid: Generates unique identifiers.

### 🛠️ Dev Dependencies

- @types/bcrypt: TypeScript definitions for bcrypt.
- @types/inquirer: TypeScript definitions for inquirer.
- @types/jest: TypeScript definitions for jest.
- @types/mongoose: TypeScript definitions for mongoose.
- @types/mysql: TypeScript definitions for mysql.
- @types/node: TypeScript definitions for Node.js.
- @types/uuid: TypeScript definitions for uuid.
- @types/validator: TypeScript definitions for validator.
- eslint: Linter for TypeScript.
- eslint-config-codely: ESLint configuration used by CodelyTV.
- eslint-plugin-hexagonal-architecture: ESLint plugin used to apply hexagonal architecture.
- mysql: MySQL driver for Node.js.
- rimraf: Cross-platform tool for removing files and directories.
- ts-jest: TypeScript preprocessor for Jest.
- ts-node-dev: TypeScript execution and development environment for Node.js.
- tsc-watch: TypeScript compiler with file watching.
- typescript: TypeScript language package.

### 🗂️ Folder structure

In this folder structure, the code is organized according to the principles of Hexagonal Architecture. 

```
src/
├── App.ts
├── backend
│  ├── shared
│  │  ├── application
│  │  │  └── UuidService.ts
│  │  └── infrastructure
│  │     ├── config
│  │     │  ├── connectMongoDB.ts
│  │     │  └── sequelize.ts
│  │     └── JsonFileUtil.ts
│  ├── task
│  │  ├── application
│  │  │  └── TaskService.ts
│  │  ├── domain
│  │  │  ├── ITask.ts
│  │  │  ├── ITaskSwitchRepository.ts
│  │  │  ├── Task.ts
│  │  │  ├── TaskRepository.ts
│  │  │  └── TaskStatus.ts
│  │  └── infrastructure
│  │     ├── json
│  │     │  ├── JsonTaskRepository.ts
│  │     │  └── taskDb.json
│  │     ├── mongo
│  │     │  ├── ITaskMongo.ts
│  │     │  ├── MongoTaskRepository.ts
│  │     │  └── TaskMongoModel.ts
│  │     ├── mysql
│  │     │  ├── ITaskMysql.ts
│  │     │  ├── TaskMysqlModel.ts
│  │     │  └── TaskMysqlRepository.ts
│  │     ├── TaskController.ts
│  │     └── TaskSwitchRepository.ts
│  └── user
│     ├── application
│     │  ├── BcryptService.ts
│     │  └── UserService.ts
│     ├── domain
│     │  ├── IUser.ts
│     │  ├── IUserSwitchRepository.ts
│     │  ├── User.ts
│     │  └── UserRepository.ts
│     └── infrastructure
│        ├── json
│        │  ├── JsonUserRepository.ts
│        │  └── userDb.json
│        ├── mongo
│        │  ├── IUserMongo.ts
│        │  ├── MongoUserRepository.ts
│        │  └── UserMongoModel.ts
│        ├── mysql
│        │  ├── IUserMysql.ts
│        │  ├── UserMysqlModel.ts
│        │  └── UserMysqlRepository.ts
│        ├── UserController.ts
│        └── UserSwitchRepository.ts
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
- [@METAWISER](https://github.com/metawiser) - [LinkedIn](https://www.linkedin.com/in/carlos-zamora-n/)
- [@xpan1c](https://github.com/xpan1c) - [Linkedin](https://www.linkedin.com/in/danny-mv/)
