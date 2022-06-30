 ## FinAPI - API Financeira

 ## Techs
 - NodeJS

 ## Requisitos
 - [x] Deve ser possível criar uma conta
 - [x] Deve ser possível buscar o extrato bancário do cliente
 - [x] Deve ser possível realizar um deposito
 - [x] Deve ser possível realizar um saque
 - [x] Deve ser possível buscar o extrato bancário do cliente por data
 - [x] Deve ser possível atualizar dados da conta do cliente
 - [x] Deve ser possível obter dados da conta do cliente
 - [x] Deve ser possível deletar uma conta
 - [x] Deve ser possível retornar o "balance" 

 ## Regras de negócio
 - [x] Não deve ser possível cadastrar uma conta com um CPF já existente 
 - [x] Não deve ser possível buscar um extrato em uma conta não existente 
 - [x] Não deve ser possível fazer um deposito em uma conta não existente 
 - [x] Não deve ser possível fazer um saque em uma conta não existente    
 - [x] Não deve ser possível excluir uma conta não existente  
 - [x] Não deve ser possível fazer um saque quando o saldo for insuficiente
 - [x] Não deve ser possível retornar o balanço de uma conta não existente

# Clone este repositório
$ git clone https://github.com/elanonc/FinAPI

# Entre na pasta
$ cd finapi

# Instale as dependências
$ npm install

# Para executar
$ npm run dev