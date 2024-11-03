# logistics-routes
 project for Unama college.

## Preparando Ambiente de Desenvolvimento

instlando a versão node recomendada:
```
nvm install node@v20.17.0
```

Vamos usar a biblioteca node-fetch para realizar requisições HTTP à API da LocationIQ.
```
npm install node-fetch
```

Obter a Chave da API:

Cadastre-se no LocationIQ: https://locationiq.com/
e obtenha uma chave de API gratuita. Guarde a chave, pois ela será usada em cada requisição.

Para proteger a chave, você pode instalar dotenv para mantê-la em um arquivo .env, especialmente útil em versões públicas do código.
```
npm install dotenv
```