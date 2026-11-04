# Projeto de API com express e sequelize-cli

## Iniciar um projeto node
```
npm init -y
```

## Instalar as dependências
```
npm i express sequelize sequelize-cli nodemon mysql2 bcrypt jsonwebtoken cors dotenv swagger-jsdoc swagger-ui-express
```

## Executar o sequelize-cli
```
npx sequelize-cli init
```

## Criar o banco
```
npx sequelize-cli db:create
```

## Executa a criação das migrations

```
npx sequelize-cli model:generate --name Usuario --attributes email:string,senha:string,role:string,emailVerificado:boolean,codigoVerificacao:string,codigoExpiracao:date

npx sequelize-cli model:generate --name Endereco --attributes rua:string,numero:string,cidade:string,estado:string,cep:string,complemento:string

npx sequelize-cli model:generate --name Aluno --attributes nome:string,dataNascimento:date,usuarioId:integer,enderecoId:integer

npx sequelize-cli model:generate --name Professor --attributes nome:string,disciplina:string,usuarioId:integer,enderecoId:integer

npx sequelize-cli model:generate --name Turma --attributes nome:string,ano:integer,professorId:integer

npx sequelize-cli model:generate --name AlunoTurma --attributes alunoId:integer,turmaId:integer

npx sequelize-cli model:generate --name Avaliacao --attributes alunoId:integer,turmaId:integer,professorId:integer,nota:decimal,dataAvaliacao:date,observacao:string
```

## Executa as migrations no banco

```
npx sequelize-cli db:migrate
```
