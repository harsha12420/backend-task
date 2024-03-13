# Inventry management

---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.16.0

    $ npm --version
    8.11.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Sequelize installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm i -g sequelize
      $ npm i -g sequelize-cli
      $ npm i -g mysql

## Install

    $ git clone git@bitbucket.org:solutionanalystspvtltd/inventory-apis-nodejs.git
    $ cd nodejs
    $ nvm use 16.16.0
    $ npm install
    $ npm i -g sequelize
    $ npm i -g sequelize-cli
    $ npm i -g mysql
    $ npm i typescript -g

# Requirements
npm = 8.11.0
node = 16.16.0
sequelize = 6.32.0
## Development server

Run `node dist/bin/www.js` for a dev server. Navigate to `http://localhost:3050/`. The app will automatically reload if you change any of the source files.

## Perform Steps
1. npm install
2. sequelize db:create
3. sequelize db:migrate
4. sequelize db:seed:all
5. tsc