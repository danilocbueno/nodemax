## Curso NodeJS Max


### Aulas 

-> mostrando como os middlewars funcionam
-> recebe três parâmetros que não podem ser mudados: req, res, next. next é a função que deve ser invocada para que o pŕoximo middleware seja chamado
-> em vez de utilizar o req.end (que é o padrão do módulo http) o express encapsula isso com o res.send (que inclusive já verifica o tipo e colocar o ContentType :D)
-> Muito legal: da pra entrar no github do express e ver o código das funções em 
    * https://github.com/expressjs/express/blob/master/lib/application.js -> função listen
    * https://github.com/expressjs/express/blob/master/lib/response.js -> função send


### Aula 

-> parseando o dado que vem do formulário
-> adicionar novo form com a url add-product
-> pegar esse dado em uma nova url com product
-> usar o req.body (mas não funciona por padrão porque o express fica tirando e colocandp
-> instalar o body-parser com o npm i body-parser
-> importar no projeto e adicionar como novo middleware
    

## Aula 74

-> Os arquivos não estão sendo servidos automaticamente (estaticos para o publico)
-> criar uma pasta public (ai sim ficará publico)
-> servir arquivos estáticos (ou seja não servir pelo express)
-> o proprio express tem um middleware que fornecess isso o

` app.use(express.static(path.join(__dirname, 'public'))); `

-> o express vai pegar todo recurso e direcionar para o diretório publico, nesse sentido a url do recurso pode começar a partir de publico!
-> adicionar os arquivos CSS (peguei pronto)
-> linkar eles nos arquivos HTML

## Aula 78

-> compartilhando dados via arquivos JS
-> criou o adminData no arquivo admin e compartilhou com os demais aruqivos
-> por enquanto porque não está usando databse

## Aula 80
-> fala um pouco de todos os templates
-> instala todos e vai testando um por um
-> 

## Testando o https://www.npmjs.com/package/express-ejs-layouts-
-> instalando, usei esse tutorial: https://www.codementor.io/@nulldreams/utilizando-a-engine-ejs-para-aplicacoes-em-nodejs-dok81l3si
-> 

## Aula 97
-> adicionando controllers
-> basicamente cria a pasta controllers, extrai as funções para ele e deixa as rotas chamando os controllers;

## Aula 98
-> adiciona o controlador de erros

## Aula 99
-> adicionando modelos; utiliza-se a sintaxe de classe o que pode confundir um pouco; utilizou também uma variável global para armazenar os produtos porque ainda não tem banco; pra acessar essa variável usou um método estático da classe;
-> TypeError: Cannot read property 'length' of undefined
-> pra resolver esse erro necessita usar callback porque quando ele vai renderizar a view, a leitura do arquivo (que é async ainda não pode ter terminado); então encapsula a fetchAll em uma cb

## Aula 100 - 103
-> faz a refatoração do model

## Seção 8 opicional
-> adicionou novas views no projeto como detalhes etc.


## Sequelize
->  npm install --save sequelize
-> alterar o arquivo database fazendo a conexão com o sequelize
-> tem que ver como colocar as migracoes
https://blog.rocketseat.com.br/nodejs-express-sequelize/
-> https://www.luiztools.com.br/post/tutorial-de-migrations-com-nodejs-e-sequelize/


## Check it later
https://medium.com/@filipefilpe/api-com-nodejs-e-sequelize-ab6ce07195e0
https://blog.rocketseat.com.br/nodejs-express-sequelize/
https://github.com/rocketseat-content/blog-express-sequelize/blob/master/index.js
https://www.luiztools.com.br/post/tutorial-de-crud-com-node-js-sequelize-e-mysql/


## Add MongoDB

-> Install npm install --save mongodb


## Add Session
-> npm install --save express-session



## Protegendo a senha
-> npm install --save bcryptjs

## CSRF
-> npm install --save csurf
-> http://sahatyalkabov.com/jsrecipes/#!/backend/csrf-protection-with-express
-> https://medium.com/@d.silvas/how-to-implement-csrf-protection-on-a-jwt-based-app-node-csurf-angular-bb90af2a9efd


O problema com o CSRF é o seguinte. O bodyParser funciona normal mesmo com o hotwire turbo, o porém é o momento do parser e o tipo do form. Se for formulario de upload em que precisa do enctype o bodyparser não vai agir então o token não vai ser parseado e vai dar o erro de invalid csrf token. A solução mais simples (não sei se é a melhor) é passar o token via GET na URL do form. O CSRF procura dentro de req.body e também na URL, ai nesse caso apesar de não ser parseado ele vai encontrar!


## Authorization
-> https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
-> https://www.codementor.io/@manashkumarchakrobortty/authentication-and-authorization-in-node-js-19brdvhsyw
-> https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/
-> https://developer.okta.com/blog/2019/02/14/modern-token-authentication-in-node-with-express
https://medium.com/@pedro.lg.cs/implementando-controle-de-acesso-acl-no-nodejs-com-express-ef3a4d5bddf0


## Express validator
-> npm install --save express-validator
-> express-validator usa esquema de middlewares, particularmente achei que poluiu bastate o código, pode melhorar com isso: https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go
-> Essa abordagem melhorou: https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/

ESse eh massa: 
-> https://github.com/howardmann/validation

-> Ou usa o joi..
-> https://101node.io/blog/javascript-validators-comparison-using-joi-vs-express-validator/

## Debug
https://www.alura.com.br/artigos/debugando-projetos-nodejs-no-vscode?gclid=CjwKCAiA9vOABhBfEiwATCi7GGICZ-8BkP4nV888_N_FXmfIB4gnR-dxkgIRdHAYFmq00e-v9EFnyxoCB1oQAvD_BwE

## Templating IONIC
https://blog.logrocket.com/theming-customization-with-ionic/