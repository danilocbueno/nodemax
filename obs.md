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
    