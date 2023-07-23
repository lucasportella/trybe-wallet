# trybe-wallet
## Frontend currency wallet using Redux

## How to install (using Docker)
### Requirements
  - docker
    
### Installation steps
  - in the "Code" icon, download the project via git clone or download zip option
  - open the terminal and enter in the project's folder and run the following command:
      - ***docker build -t trybe-wallet . && docker run -it -p 3000:3000 trybe-wallet***
      - wait for installation and then go to the broswer and type this URL:
        - ***http://localhost:3000***

## How to install (without Docker)
### Requirements
  - node

### Installation steps
  - in the "Code" icon, download the project via git clone or download zip option
  - open the terminal and enter in the project's folder
  - in the terminal run the following commands:
      - ***npm install***
      - ***npm start***
      - open the browser and type this URL:
      - ***http://localhost:3000***
 
 ## How to use
WARNING: this projects collects the currencies values through the endpoint *https://economia.awesomeapi.com.br/json/all*, which is deprecated. So data might be innacurate, especially bitcoin and ethereum.
 
 In the login page enter any email like myemail@mail.com (regex pattern is */\S+@\S+\.\S+/gi* (basically a xxxxx@xxxx.xxx pattern)) and a password with a minimal length of 6 characters, it can be 123456. You will be redirected to the wallet page.
 There, you can add, edit and delete expenses in your wallet, always showing the total value of your expenses. It supports the main currencies of the world and even some cryptocurrencies.
 
