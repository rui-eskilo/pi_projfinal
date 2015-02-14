CREATE TABLE category (
    id integer NOT NULL,
    description text
);


CREATE SEQUENCE category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
	

ALTER SEQUENCE category_id_seq OWNED BY category.id;


CREATE TABLE comentary (
    id integer NOT NULL,
    insertion_date timestamp without time zone NOT NULL,
    queixinha smallint NOT NULL,
    dbuser smallint NOT NULL,
    description text NOT NULL
);


CREATE SEQUENCE comentary_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE comentary_id_seq OWNED BY comentary.id;


CREATE TABLE dbuser (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    nickname text,
    email text NOT NULL,
    role character varying(2) DEFAULT 'UE'::character varying NOT NULL
);



CREATE TABLE queixinha (
    id integer NOT NULL,
    state boolean NOT NULL,
    category smallint NOT NULL,
    owner smallint,
    georef text NOT NULL,
    description text DEFAULT ' '::text,
    title text NOT NULL
);


CREATE TABLE queixinha_dbuser (
    id integer NOT NULL,
    queixinha smallint NOT NULL,
    dbuser smallint NOT NULL,
    dirty boolean NOT NULL
);


CREATE SEQUENCE queixinha_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE queixinha_id_seq OWNED BY queixinha.id;


CREATE SEQUENCE queixinha_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



ALTER SEQUENCE queixinha_user_id_seq OWNED BY queixinha_dbuser.id;


CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE user_id_seq OWNED BY dbuser.id;



CREATE TABLE vote (
    id integer NOT NULL,
    value boolean NOT NULL,
    queixinha smallint NOT NULL,
    dbuser smallint NOT NULL
);


CREATE SEQUENCE vote_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



ALTER SEQUENCE vote_id_seq OWNED BY vote.id;


ALTER TABLE ONLY category ALTER COLUMN id SET DEFAULT nextval('category_id_seq'::regclass);
ALTER TABLE ONLY comentary ALTER COLUMN id SET DEFAULT nextval('comentary_id_seq'::regclass);
ALTER TABLE ONLY dbuser ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);
ALTER TABLE ONLY queixinha ALTER COLUMN id SET DEFAULT nextval('queixinha_id_seq'::regclass);
ALTER TABLE ONLY queixinha_dbuser ALTER COLUMN id SET DEFAULT nextval('queixinha_user_id_seq'::regclass);
ALTER TABLE ONLY vote ALTER COLUMN id SET DEFAULT nextval('vote_id_seq'::regclass);



ALTER TABLE ONLY category
    ADD CONSTRAINT category_id_unique UNIQUE (id);

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pk PRIMARY KEY (id);

ALTER TABLE ONLY comentary
    ADD CONSTRAINT comentary_id_unique UNIQUE (id);

ALTER TABLE ONLY comentary
    ADD CONSTRAINT comentary_pk PRIMARY KEY (id);

ALTER TABLE ONLY queixinha
    ADD CONSTRAINT queixinha_id_unique UNIQUE (id);

ALTER TABLE ONLY queixinha
    ADD CONSTRAINT queixinha_pk PRIMARY KEY (id);

ALTER TABLE ONLY queixinha_dbuser
    ADD CONSTRAINT queixinha_user_id_unique UNIQUE (id);

ALTER TABLE ONLY queixinha_dbuser
    ADD CONSTRAINT queixinha_user_pk PRIMARY KEY (id);

ALTER TABLE ONLY dbuser
    ADD CONSTRAINT user_id_unique UNIQUE (id);

ALTER TABLE ONLY dbuser
    ADD CONSTRAINT user_pk PRIMARY KEY (id);

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_id_unique UNIQUE (id);

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_pk PRIMARY KEY (id);

ALTER TABLE ONLY comentary
    ADD CONSTRAINT comentary_dbuser_fk FOREIGN KEY (dbuser) REFERENCES dbuser(id);

ALTER TABLE ONLY comentary
    ADD CONSTRAINT comentary_queixinha_fk FOREIGN KEY (queixinha) REFERENCES queixinha(id);

ALTER TABLE ONLY queixinha_dbuser
    ADD CONSTRAINT dbuser_fk FOREIGN KEY (dbuser) REFERENCES dbuser(id);

ALTER TABLE ONLY queixinha
    ADD CONSTRAINT queixinha_category_fk FOREIGN KEY (category) REFERENCES category(id);

ALTER TABLE ONLY queixinha
    ADD CONSTRAINT queixinha_dbuser_fk FOREIGN KEY (owner) REFERENCES dbuser(id);

ALTER TABLE ONLY queixinha_dbuser
    ADD CONSTRAINT queixinha_fk FOREIGN KEY (queixinha) REFERENCES queixinha(id);

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_dbuser_fk FOREIGN KEY (dbuser) REFERENCES dbuser(id);

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_queixinha_fk FOREIGN KEY (queixinha) REFERENCES queixinha(id);
	
	
INSERT INTO category(description) VALUES('ISEL');
INSERT INTO category(description) VALUES('Ensino Superior');
INSERT INTO category(description) VALUES('Politica');
INSERT INTO category(description) VALUES('Terrorismo');
INSERT INTO category(description) VALUES('Desporto');
INSERT INTO category(description) VALUES('Mulheres');

INSERT INTO dbuser(username, password, nickname, email) VALUES('morais','mais','mestre morais', 'victor@morais.pt');
INSERT INTO dbuser(username, password, nickname, email) VALUES('jon','jons','chefe joao', 'joao@caselli.pt');
INSERT INTO dbuser(username, password, nickname, email) VALUES('eskilo','dinis','papa rui', 'rui@dinis.pt');







