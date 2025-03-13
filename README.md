![img](./src/public/img/chatgpt.png)


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[API ChatGPT](https://platform.openai.com/docs/overview) Este projeto faz integração com a APi do ChatGPT, com isso é possível enviar um prompt para a API e receber uma resposta direta do chatGPT, para funcionar a requisição coloque sua 'OPENAI_API_KEY' no arquivo .env.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

Quando estiver pronto para implantar seu aplicativo NestJS na produção, há algumas etapas importantes que você pode seguir para garantir que ele seja executado da forma mais eficiente possível. Confira a [documentação de implantação](https://docs.nestjs.com/deployment) para obter mais informações.

Se estiver procurando uma plataforma baseada em nuvem para implantar seu aplicativo NestJS, confira [Mau](https://mau.nestjs.com), nossa plataforma oficial para implantar aplicativos NestJS na AWS. Mau torna a implantação direta e rápida, exigindo apenas algumas etapas simples:

```bash
$ npm install -g mau
$ mau deploy
```

Com o Mau, você pode implantar seu aplicativo em apenas alguns cliques, permitindo que você se concentre na criação de recursos em vez de gerenciar a infraestrutura.
