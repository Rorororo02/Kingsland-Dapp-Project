# Decentralized Mobile Number Registry
A mobile number registry to protect you from text frauds and scams. This is in Partial fulfillment Kingsland University's Advanced Project Module: Decentralized Application



## Install Dependencies

Truffle and Ganache are required to be installed for this project.
1. First, we need to install NodeJS. NodeJS is required for Truffle to work.
```
$ sudo apt-get install nodejs
````
To make sure that the installation is successful, run the following command.
```
$ node -v
```
Version 10.16.3 was used on developing this project.

2. Usually, the NodeJS Package Manager, <b>npm</b> is install alongside with NodeJS. If it's not installed yet, run the following command:
```
$ sudo apt-get install npm
```
3. Next we install ganache. Open https://github.com/trufflesuite/ganache/releases/tag/v2.0.3  and install the selected version.
4. Download the file for your platform. For Linux, choose the AppImage. For Windows, choose the exe file.
5. Now you can run the file with double click.
6. Go through the installation setup until it is complete. Find Ganache in your system and start it to verify it was installed successfully.
7. To install truffle, run the following command:
```
$ npm install –g truffle@5.0.27
```
or
```
sudo npm install –g truffle@5.0.27
```

## Setup the Project

1. Clone this project on your local machine.
2. Enter the project root directory. Execute the following command to install nodejs packages required for this project.
```
$ npm install
```
3. Install http-server globally. This will be needed to serve our web based DApp
```
sudo npm install http-server
```

## Running the Unit Tests and Coverage Tests
1. Open Ganache GUI or CLI.
2. On the command line, enter the project root directory.
3. To execute the unit tests and coverage, run the following command.
```
npm run test:coverage
```

## Deploying The Smart Contract to Ethereum Ropsten Testnet
1. Create a file `mnemonic.txt` on the project root directory.
2. Write your Ethereum wallet mnemonic on that file. Note that this file is included on the `.gitignore` file of this project as your mnemonic should be kept secret! Also make sure that your wallet has funds!
3. Deploy the smart contract by running the following command.
```
truffle deploy --network ropsten
```
4. Take note of the Contract Address. On this project, it is specified [here.](https://github.com/Rorororo02/Kingsland-Dapp-Project/blob/master/src/js/mobile-number-registry.js)

## Running our Decentralized Application
1. Our Decentralized app requires [Metamask](https://metamask.io/) as the client side wallet to interact with our Decentralized application. Be sure to install Metamask on your browser.
2. In our project directory, run the following command:
```
$ http-server -p 8000 src/
```
This will run our Decentralized App at http://localhost:8000.
3. Access the app at http://localhost:8000

## Other App Information
1. This application used IPFS Infura node to upload files to IPFS network.
2. This application used ethereum testnet Infura.io provider to connect with the Ethereum Testnet.
