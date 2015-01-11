INSERT INTO categoria(descricao) VALUES('ISEL');
INSERT INTO categoria(descricao) VALUES('Ensino Superior');
INSERT INTO categoria(descricao) VALUES('Politica');
INSERT INTO categoria(descricao) VALUES('Terrorismo');
INSERT INTO categoria(descricao) VALUES('Desporto');
INSERT INTO categoria(descricao) VALUES('Mulheres');

INSERT INTO utilizador(username, password, alcunha, email) VALUES('morais','mais','mestre morais', 'victor@morais.pt');
INSERT INTO utilizador(username, password, alcunha, email) VALUES('jon','jons','chefe joao', 'joao@caselli.pt');
INSERT INTO utilizador(username, password, alcunha, email) VALUES('eskilo','dinis','papa rui', 'rui@dinis.pt');

INSERT INTO queixinha(estado, categoria, criador, georeferencia, descricao) VALUES(true,1,1,'Lisboa','Nunca mais sai a nota de PDM');
INSERT INTO queixinha(estado, categoria, criador, georeferencia, descricao) VALUES(true,4,2,'Lisboa','Je sois charles');
INSERT INTO queixinha(estado, categoria, criador, georeferencia, descricao) VALUES(true,5,3,'Lisboa','Benfica rumo ao 34');
INSERT INTO queixinha(estado, categoria, criador, georeferencia, descricao) VALUES(true,6,3,'Lisboa','tou farto de aturar a Ines');

INSERT INTO comentario(datainsercao, queixinha, utilizador, descricao) VALUES('10/01/2015',1,2,'manda mail ao prof');
INSERT INTO comentario(datainsercao, queixinha, utilizador, descricao) VALUES('10/01/2015',1,1,'ja mandei');
INSERT INTO comentario(datainsercao, queixinha, utilizador, descricao) VALUES('10/01/2015',1,2,'manda outro');
INSERT INTO comentario(datainsercao, queixinha, utilizador, descricao) VALUES('10/01/2015',2,3,'eu sou o carlinhos');
INSERT INTO comentario(datainsercao, queixinha, utilizador, descricao) VALUES('10/01/2015',3,1,'Ninguem para o BENFICA...');
INSERT INTO comentario(datainsercao, queixinha, utilizador, descricao) VALUES('10/01/2015',3,2,'no porto ta frio... -6');
INSERT INTO comentario(datainsercao, queixinha, utilizador, descricao) VALUES('10/01/2015',3,3,'em alvalade, só ha mm frangos');
INSERT INTO comentario(datainsercao, queixinha, utilizador, descricao) VALUES('10/01/2015',4,1,'aguenta');
INSERT INTO comentario(datainsercao, queixinha, utilizador, descricao) VALUES('10/01/2015',4,2,'e ainda agora começou');
INSERT INTO comentario(datainsercao, queixinha, utilizador, descricao) VALUES('10/01/2015',4,1,'vai mudar fraldas');

INSERT INTO interesse(queixinha, utilizador) VALUES(1,2);
INSERT INTO interesse(queixinha, utilizador) VALUES(4,1);
INSERT INTO interesse(queixinha, utilizador) VALUES(4,2);
INSERT INTO interesse(queixinha, utilizador) VALUES(4,3);

INSERT INTO voto(voto, queixinha, utilizador) VALUES(true, 4, 1);
INSERT INTO voto(voto, queixinha, utilizador) VALUES(true, 4, 2);
INSERT INTO voto(voto, queixinha, utilizador) VALUES(true, 4, 3);

