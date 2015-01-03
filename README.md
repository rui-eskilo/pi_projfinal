Instituto Superior de Engenharia de Lisboa
Licenciatura em Engenharia Informática e de Computadores
Programação na Internet
Semestre de Inverno de 2014/2015 Trabalho
Final
O objetivo deste trabalho é desenvolver uma aplicação Web de pequena/média
complexidade através da qual os alunos mostrem capacidade para aplicar os
conhecimentos adquiridos em Programação na Internet.
QueixinhasNaNet
Pretendese
que seja implementada a aplicação Web QueixinhasNaNet, que se constitui
como espaço de partilha, votação e discussão relativamente a aspectos do quotidiano dos
seus utilizadores.
A entidade principal desta aplicação é a queixinha. A queixinha tem um título com o
máximo de 140 carácteres e uma descrição, opcional. As queixinhas são listadas, criadas,
votadas, georeferênciadas,
categorizadas e discutidas.
Por exemplo, uma queixinha sobre a dificuldade deste trabalho poderia ser criada por um
utilizador, votada pelos demais como correcta ou incorrecta, visualizada e discutida por
todos os membros da comunidade.
Utilizadores
A aplicação tem diferentes tipos de utilizadores. A lista seguinte indica os diferentes tipos
de utilizadores da aplicação, bem como a sigla usada no resto do documento para os
identificar.
● Utilizador (U) Qualquer
utilizador do sistema, autenticado ou anómino
● Utilizador Não Autenticado (UN) Qualquer
utilizador que ainda não fez login
● Utilizador Autenticado (UA) Qualquer
utilizador que já fez login
● Utilizador Editor (UE) Utilizador
que criou a queixinha que se está a visualizar
● Utilizador Gestor (UG) Utilizador
que gere o sistema
Aspectos funcionais
A aplicação deve suportar, no mínimo, os seguintes aspectos funcionais.
● Como U devo poder visualizar uma página de entrada da aplicação que explique
claramente o seu objectivo e como deve ser usada
● Como UN devo poder:
○ visualizar uma lista, limitada em número, de queixinhas.
○ fazer registo ou login na aplicação
Instituto Superior de Engenharia de Lisboa
Licenciatura em Engenharia Informática e de Computadores
Programação na Internet
Semestre de Inverno de 2014/2015 Trabalho
Final
○ fazer recuperação de palavra chave
● Como U devo poder visualizar os detalhes de uma queixinha, que inclui os seus
comentários.
● Como UA devo poder:
○ visualizar a lista total de queixinhas de forma paginada, tendo nevegação
entre páginas.
○ fazer logout.
○ votar numa queixinha como correcta ou incorrecta.
○ comentar uma queixinha
○ registarme
como interessado numa queixinha e receber notificações
sempre que esta tiver ativiade (alterada ou comentada)
○ visualizar uma lista de queixinhas fechadas
○ consultar um dashboard com a lista de queixinhas em que estou interessado
e ter indicação de quais tiveram atividade sem que as tenha consultado.
● Como UE devo poder alterar a queixinha, sendo a alteração registada como
comentário.
● Como UE ou UG devo poder fechar a queixinha, deixando esta de ser apresentada
aos demais utilizadores do sistema. Esta operação obriga a escrita de uma nota,
que será também anexada aos comentários.
Se pretender implementar funcionalidade adicionais, bem diferentes das que são
apresentadas, deve falar com o seu docente.
Aspectos não funcionais
A aplicação desenvolvida deve ter em conta os seguintes aspectos não funcionais:
● Usar o Bootstrap para definir a estrutura e aspecto da aplicação
● Usar NodeJS como tecnologia de servidor Web
● Usar uma base de dados relacional, por exemplo PostgreSQL
● Ser entregue uma aplicação consola, desenvolvida em NodeJS, que cria dados de
teste (correctos, ou seja, que pareçam reais).
● Alojar a aplicação num serviço público de alojamento de aplicações.
● Ser acompanhada de um relatório que descreve a aplicação realizada.
Data recomendada de entrega: 27/01/2015
Data limite de entrega: 09/02/2015
Os docentes,
Carlos Guedes
Luís Falcão