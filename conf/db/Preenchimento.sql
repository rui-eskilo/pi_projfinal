INSERT INTO category(description) VALUES('ISEL');
INSERT INTO category(description) VALUES('Ensino Superior');
INSERT INTO category(description) VALUES('Politica');
INSERT INTO category(description) VALUES('Terrorismo');
INSERT INTO category(description) VALUES('Desporto');
INSERT INTO category(description) VALUES('Mulheres');

INSERT INTO dbuser(username, password, nickname, email) VALUES('morais','mais','mestre morais', 'victor@morais.pt');
INSERT INTO dbuser(username, password, nickname, email) VALUES('jon','jons','chefe joao', 'joao@caselli.pt');
INSERT INTO dbuser(username, password, nickname, email) VALUES('eskilo','dinis','papa rui', 'rui@dinis.pt');

INSERT INTO queixinha(state, category, owner, georef, title) VALUES(true,1,1,'Lisboa','Nunca mais sai a nota de PDM');
INSERT INTO queixinha(state, category, owner, georef, title) VALUES(true,4,2,'Lisboa','Je sois charles');
INSERT INTO queixinha(state, category, owner, georef, title) VALUES(true,5,3,'Lisboa','Benfica rumo ao 34');
INSERT INTO queixinha(state, category, owner, georef, title) VALUES(true,6,3,'Lisboa','tou farto de aturar a Ines');

INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES('10/01/2015',1,2,'manda mail ao prof');
INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES('10/01/2015',1,1,'ja mandei');
INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES('10/01/2015',1,2,'manda outro');
INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES('10/01/2015',2,3,'eu sou o carlinhos');
INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES('10/01/2015',3,1,'Ninguem para o BENFICA...');
INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES('10/01/2015',3,2,'no porto ta frio... -6');
INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES('10/01/2015',3,3,'em alvalade, só ha mm frangos');
INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES('10/01/2015',4,1,'aguenta');
INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES('10/01/2015',4,2,'e ainda agora começou');
INSERT INTO comentary(insertion_date, queixinha, dbuser, description) VALUES('10/01/2015',4,1,'vai mudar fraldas');

INSERT INTO queixinha_dbuser(queixinha, dbuser) VALUES(1,2);
INSERT INTO queixinha_dbuser(queixinha, dbuser) VALUES(4,1);
INSERT INTO queixinha_dbuser(queixinha, dbuser) VALUES(4,2);
INSERT INTO queixinha_dbuser(queixinha, dbuser) VALUES(4,3);

INSERT INTO vote(value, queixinha, dbuser) VALUES(true, 4, 1);
INSERT INTO vote(value, queixinha, dbuser) VALUES(true, 4, 2);
INSERT INTO vote(value, queixinha, dbuser) VALUES(true, 4, 3);

