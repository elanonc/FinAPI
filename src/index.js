const express = require('express');
const { v4:uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

// Middleware para validação do usuário
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json( {error: "Customer not found" });
    }

    request.customer = customer; // Repassando o objeto para o request.costumer, a informação consumida pode ser lida em outra parte posteriormente

    return next();
}

function getBalance(statement) {
    const balance = statement.reduce((acc, cur) => {
        if (cur.type === 'credit') {
            return acc + cur.amount;
        }else{
            return acc - cur.amount;
        }
    }, 0);

    return balance;
}

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlredyExists = customers.some((customer) => customer.cpf === cpf);
    if (customerAlredyExists) {
        return response.status(400).json({error: "Customer alredy exists!"});
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return response.status(201).send();
})

app.get("/statement/", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request; // Desestrutura o objeto do request

    return response.json(customer.statement);
})

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;
    const { customer } = request;

    const statementOperation = {
        description,
        amount, 
        created_at: new Date(), 
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();
})

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);

    if(balance < amount){
        return response.status(400).json( { error: "Insufficient funds!" } )
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: 'debit',
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
})

app.listen(3333);