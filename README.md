# Teste Téncino para ENACOM

## Justificativas
- Uso do TypeScript:
  - Inclui segurança de tipo no código, evitando diversos problemas realcionados que possam aparecer ao longo do processo de desenvolvimento.
- Escolha do ExpressJS: 
  - É o framework que mais tenho familiaridade.
  - É unopinionated, o que me dá mais liberdade para decidir a arquitetura da aplicação
- Uso do ORM Prisma:
  - Facilita a criação de coleções e queries
  - Integra perfeitamente com TypeScript já que os models são automaticamente transformados em tipos
- Modelagem do Banco de dados:
  - A coleção de usuários só tem salva o email e nome, sem necessitar de senha por questões de simplicidade na hora dos testes. Em uma API real seria requisitada uma senha que seria criptografada e salva no banco de dados. Pelo mesmo motivo não é salvo ou requisitado o endereço do usuário, que ficaria salvo em uma coleção específica de endereços. Minha compreensão foi que a autentificação do usuário não faz parte do teste, e sim a abordagem para lidar com a Sacola e seus produtos.
  - Escolhi salvar a Sacola (Cart) em uma coleção separa da dos Usuários por questões de organização. Os requests que vão modificar a Sacola devem acessar apenas informações necessárias, como o estado atual da própria Sacola e os Produtos, mas não os dados de endereço e senha do usuário.
  - A lista de produtos salva na Sacola do usuário contém apenas a quantidade e ID dos produtos, fiz dessa maneira para evitar gastar espaço no banco de dados com informações duplicadas. Um GET request pode ser feito para visualizar todos os produtos na Sacola com todas suas informações.
- Escolha da Arquitetura em camadas:
  - Questões de organização e isolamento de atividades.
  - Os controllers lidam apenas com o request e a response.
  - Os services aplicam as regras de negócio, são os únicos com acesso aos repositórios, retornam "a resposta pronta" para os controllers apenas enviarem.
  - Os middlewares asseguram que as informações enviadas junto com o request estejam de acordo com o formado desejado, e valida a sessão do usuário.
  - Os repositories são os únicos a modificarem o banco de dados.
  - Os routers roteiam os request para o devido controllador.
  - O ErrorHandler é uma camada pra tratar os erros que são jogados pelas demais camadas.

  ## Implementação
  - Necessário NodeJS e npm instalados na máquina.
  - Passo a passo dentro da pasta onde o projeto se encontra:
    - criar um arquivo .env com as seguintes variavéis:
      - PORT = porta onde a API vai estar escutando
      - JWT_SECRET = string para assinar/validar os tokens
      - DATABASE_URL = url para acessar o banco de dados, deve seguir o seguinte formato: `mongodb://USERNAME:PASSWORD@HOST{:PORT_NUMBER(OPTIONAL)}/DATABASE(?arguments, optional)`. 
      - Um banco de dados pode ser criado no MongoAtlas de graça, selecionando a opção "Connect" e depois "Connect your application" será gerado um link onde será necessário adicionar o nome do banco de dados (`DATABASE`) antes da interrogação, e colocar a senha no lugar de `<password>`. Feito isso o link estará pronto para ser usado como `DATABSE_URL`.
    - rodar `npm i` no terminal.
    - rodar `npx prisma generate` no terminal.
    - rodar `npm run dev` no terminal para subir a API no modo de desenvolvimento. Ou rodar `npm run build` e depois `npm run start` para subir a API no modo de desenvolvimento.
    - O comando `npx prisma db seed` pode ser rodado após o prisma generate para seedar o banco de dados com 50 produtos aleatórios.

## Rotas
  - Rota Autenticada: rota que necessita do token informado ao logar na header Authorization.
  - POST /sign-up
   - Body JSON, contendo apenas email(string, válido) e nome(string)
  - POST /sign-in
    - Body JSON, contendo apenas o email registrado
    - retorna um token para ser usado nas demais rotas
  - GET /products 
    - Rota Autenticada
    - exige uma query "page" com um número inteiro, a primeira página é page=1
  - POST /cart
    - Rota Autenticada
    - Body JSON, contendo apenas productId(string) e amount(number, int) do produto a ser adicionado
    - Se um produto que já está na sacola for informado, sua quantidade será atualizada pela nova informada
  - PUT /cart
    - Rota Autenticada
    - Body JSON, contendo apenas productId(string) e amount(number, int) do produto a ser atualizado
    - Se um produto que não está na sacola for informado, ele será adicionado
  - GET /cart
    - Rota Autenticada
    - Retorna uma lista com os produtos presentes na sacola
  - DELETE /cart
    - Rota Autenticada
    - Body JSON, contendo apenas o productId(string) a ser removido da sacola
  - DELETE /cart/all
    - Rota Autenticada
    - Remove todos os produtos na sacola do usuário
