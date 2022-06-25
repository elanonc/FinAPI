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



app.listen(3333);