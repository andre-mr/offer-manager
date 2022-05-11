# 🗒️ Gerenciador de Ofertas
Gerenciador para ofertas de marketing de afiliação.

<!-- SOBRE -->
## :page_with_curl:	Sobre o projeto
Projeto privado, solicitado por um cliente afiliado de e-commerce, com sua autorização para publicar o código-fonte.

O sistema é estruturado com uma API REST em Node.js com uma arquitetura de responsabilidade em camadas.
Usando MySQL para armazenar dados criados pelo usuário.
Um frontend html/javascript simples, que consome a biblioteca Bootstrap e o gerador de tabelas Bootstrap Table com um estilo minimalista.
Tudo visando uma boa usabilidade, garantindo eficiência e simplicidade para hospedagem em servidores compartilhados de baixo custo.

### :construction:	Feito com
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en/JavaScript)
* [Bootstrap](https://getbootstrap.com)
* [Bootstrap Table](https://bootstrap-table.com/)
* [MySQL](https://www.mysql.com/)
* [Node.js](https://nodejs.org/)
#### Bibliotecas Node
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Express](https://www.npmjs.com/package/express)
* [Cors](https://www.npmjs.com/package/cors)
* [Node MySQL 2](https://www.npmjs.com/package/mysql2)

<!-- USO -->
## :desktop_computer: Uso básico
Estas são informações básicas de uso.
* O usuário abre a url e uma tela é aberta pedindo uma senha. Nenhum usuário necessário, é um sistema de usuário único privado por enquanto.
* A senha é salva no armazenamento local do navegador e será utilizada sempre que uma solicitação for enviada por código javascript.
* Uma lista de dados básicos é enviada do banco de dados.
* O usuário pode trabalhar com dados preenchidos na tabela, com muitos filtros e opções de ordenação.
* O usuário pode adicionar uma nova oferta usando um botão que abre uma janela pop-up.
* O usuário pode editar as ofertas já armazenadas, clicando nelas e salvando as alterações.
* Cada vez que o usuário edita e salva uma oferta, a data e hora de utilização são alteradas e o texto do conteúdo é copiado para a área de transferência, para uso com software de publicação externo.
* A ordem de classificação padrão é por data de utilização do mais antigo ao mais recente, porque o objetivo é prioridade para ofertas mais antigas.

<!-- NOTAS PARA DESENVOLVEDORES -->
## ⌨️: Notas para desenvolvedores
#### :man_technologist:	Node
O backend é servido pelo Node versão 16, estruturado em camadas, no momento servindo apenas requisições GET com o uso da biblioteca Express.
#### :man_technologist:	Bootstrap
O uso direto é mínimo, apenas porque a página é principalmente preenchida dinamicamente pelo Bootstrap Table com suas próprias opções de estilo.
#### :iphone: Responsividade
Destina-se a utilização com um computador desktop, mas pode ser utilizado com dispositivos Android.
#### :earth_americas:	Idioma
A interface do usuário é toda em português brasileiro. Por outro lado, todo o código está em inglês.
#### 🔒:	Dados confidenciais
Todos os dados confidenciais são armazenados apenas no servidor, principalmente como variáveis de ambiente, incluindo chave de API para todas as solicitações.

<!-- CONSIDERAÇÕES FINAIS -->
## Considerações finais
Este projeto foi lançado para o usuário final em abril/2022.
