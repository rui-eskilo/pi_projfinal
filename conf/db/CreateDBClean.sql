--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.0
-- Dumped by pg_dump version 9.4.0
-- Started on 2015-02-13 18:00:14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 184 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2083 (class 0 OID 0)
-- Dependencies: 184
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 172 (class 1259 OID 17423)
-- Name: category; Type: TABLE; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

CREATE TABLE category (
    id integer NOT NULL,
    description text
);


ALTER TABLE category OWNER TO queixinhasmaster;

--
-- TOC entry 177 (class 1259 OID 17450)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: queixinhasmaster
--

CREATE SEQUENCE category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE category_id_seq OWNER TO queixinhasmaster;

--
-- TOC entry 2084 (class 0 OID 0)
-- Dependencies: 177
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: queixinhasmaster
--

ALTER SEQUENCE category_id_seq OWNED BY category.id;


--
-- TOC entry 173 (class 1259 OID 17429)
-- Name: comentary; Type: TABLE; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

CREATE TABLE comentary (
    id integer NOT NULL,
    insertion_date timestamp without time zone NOT NULL,
    queixinha smallint NOT NULL,
    dbuser smallint NOT NULL,
    description text NOT NULL
);


ALTER TABLE comentary OWNER TO queixinhasmaster;

--
-- TOC entry 178 (class 1259 OID 17452)
-- Name: comentary_id_seq; Type: SEQUENCE; Schema: public; Owner: queixinhasmaster
--

CREATE SEQUENCE comentary_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comentary_id_seq OWNER TO queixinhasmaster;

--
-- TOC entry 2085 (class 0 OID 0)
-- Dependencies: 178
-- Name: comentary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: queixinhasmaster
--

ALTER SEQUENCE comentary_id_seq OWNED BY comentary.id;


--
-- TOC entry 175 (class 1259 OID 17441)
-- Name: dbuser; Type: TABLE; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

CREATE TABLE dbuser (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    nickname text,
    email text NOT NULL,
    role character varying(2) DEFAULT 'UE'::character varying NOT NULL
);


ALTER TABLE dbuser OWNER TO queixinhasmaster;

--
-- TOC entry 174 (class 1259 OID 17435)
-- Name: queixinha; Type: TABLE; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

CREATE TABLE queixinha (
    id integer NOT NULL,
    state boolean NOT NULL,
    category smallint NOT NULL,
    owner smallint,
    georef text NOT NULL,
    description text DEFAULT ' '::text,
    title text NOT NULL
);


ALTER TABLE queixinha OWNER TO queixinhasmaster;

--
-- TOC entry 180 (class 1259 OID 17456)
-- Name: queixinha_dbuser; Type: TABLE; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

CREATE TABLE queixinha_dbuser (
    id integer NOT NULL,
    queixinha smallint NOT NULL,
    dbuser smallint NOT NULL,
    dirty boolean NOT NULL
);


ALTER TABLE queixinha_dbuser OWNER TO queixinhasmaster;

--
-- TOC entry 179 (class 1259 OID 17454)
-- Name: queixinha_id_seq; Type: SEQUENCE; Schema: public; Owner: queixinhasmaster
--

CREATE SEQUENCE queixinha_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE queixinha_id_seq OWNER TO queixinhasmaster;

--
-- TOC entry 2086 (class 0 OID 0)
-- Dependencies: 179
-- Name: queixinha_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: queixinhasmaster
--

ALTER SEQUENCE queixinha_id_seq OWNED BY queixinha.id;


--
-- TOC entry 181 (class 1259 OID 17459)
-- Name: queixinha_user_id_seq; Type: SEQUENCE; Schema: public; Owner: queixinhasmaster
--

CREATE SEQUENCE queixinha_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE queixinha_user_id_seq OWNER TO queixinhasmaster;

--
-- TOC entry 2087 (class 0 OID 0)
-- Dependencies: 181
-- Name: queixinha_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: queixinhasmaster
--

ALTER SEQUENCE queixinha_user_id_seq OWNED BY queixinha_dbuser.id;


--
-- TOC entry 182 (class 1259 OID 17461)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: queixinhasmaster
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO queixinhasmaster;

--
-- TOC entry 2088 (class 0 OID 0)
-- Dependencies: 182
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: queixinhasmaster
--

ALTER SEQUENCE user_id_seq OWNED BY dbuser.id;


--
-- TOC entry 176 (class 1259 OID 17447)
-- Name: vote; Type: TABLE; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

CREATE TABLE vote (
    id integer NOT NULL,
    value boolean NOT NULL,
    queixinha smallint NOT NULL,
    dbuser smallint NOT NULL
);


ALTER TABLE vote OWNER TO queixinhasmaster;

--
-- TOC entry 183 (class 1259 OID 17463)
-- Name: vote_id_seq; Type: SEQUENCE; Schema: public; Owner: queixinhasmaster
--

CREATE SEQUENCE vote_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vote_id_seq OWNER TO queixinhasmaster;

--
-- TOC entry 2089 (class 0 OID 0)
-- Dependencies: 183
-- Name: vote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: queixinhasmaster
--

ALTER SEQUENCE vote_id_seq OWNED BY vote.id;


--
-- TOC entry 1915 (class 2604 OID 17465)
-- Name: id; Type: DEFAULT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY category ALTER COLUMN id SET DEFAULT nextval('category_id_seq'::regclass);


--
-- TOC entry 1916 (class 2604 OID 17466)
-- Name: id; Type: DEFAULT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY comentary ALTER COLUMN id SET DEFAULT nextval('comentary_id_seq'::regclass);


--
-- TOC entry 1919 (class 2604 OID 17468)
-- Name: id; Type: DEFAULT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY dbuser ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 1917 (class 2604 OID 17467)
-- Name: id; Type: DEFAULT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY queixinha ALTER COLUMN id SET DEFAULT nextval('queixinha_id_seq'::regclass);


--
-- TOC entry 1922 (class 2604 OID 17470)
-- Name: id; Type: DEFAULT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY queixinha_dbuser ALTER COLUMN id SET DEFAULT nextval('queixinha_user_id_seq'::regclass);


--
-- TOC entry 1921 (class 2604 OID 17469)
-- Name: id; Type: DEFAULT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY vote ALTER COLUMN id SET DEFAULT nextval('vote_id_seq'::regclass);


--
-- TOC entry 2064 (class 0 OID 17423)
-- Dependencies: 172
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: queixinhasmaster
--

COPY category (id, description) FROM stdin;
1	ISEL
2	Ensino Superior
3	Politica
4	Terrorismo
5	Desporto
6	Mulheres
\.


--
-- TOC entry 2090 (class 0 OID 0)
-- Dependencies: 177
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: queixinhasmaster
--

SELECT pg_catalog.setval('category_id_seq', 6, true);


--
-- TOC entry 2065 (class 0 OID 17429)
-- Dependencies: 173
-- Data for Name: comentary; Type: TABLE DATA; Schema: public; Owner: queixinhasmaster
--

COPY comentary (id, insertion_date, queixinha, dbuser, description) FROM stdin;
1	2015-10-01 00:00:00	1	2	manda mail ao prof
2	2015-10-01 00:00:00	1	1	ja mandei
3	2015-10-01 00:00:00	1	2	manda outro
4	2015-10-01 00:00:00	2	3	eu sou o carlinhos
5	2015-10-01 00:00:00	3	1	Ninguem para o BENFICA...
6	2015-10-01 00:00:00	3	2	no porto ta frio... -6
7	2015-10-01 00:00:00	3	3	em alvalade, só ha mm frangos
8	2015-10-01 00:00:00	4	1	aguenta
9	2015-10-01 00:00:00	4	2	e ainda agora começou
10	2015-10-01 00:00:00	4	1	vai mudar fraldas
12	2015-02-02 21:55:30.782	1	3	E as notas pá !!!!!
13	2015-02-02 22:05:11.023	1	3	Queres mesmo saber as notas ?????
14	2015-02-02 22:14:51.471	1	2	Já agora sim !!!!
15	2015-02-02 22:20:08.095	1	2	ola !!!!!
16	2015-02-02 22:23:07.699	1	2	oi
17	2015-02-02 22:25:10.752	4	2	oi
18	2015-02-02 22:31:01.2	3	2	oi
19	2015-02-02 22:36:42.935	11	2	oi
20	2015-02-02 22:38:44.646	11	2	oi
21	2015-02-03 16:46:43.977	8	2	Olá !!!
22	2015-02-03 16:49:55.493	8	2	Oi !!!
23	2015-02-03 17:01:41.984	8	2	ok
24	2015-02-03 17:15:44.573	8	2	try !!!
25	2015-02-03 17:20:51.722	8	2	once again !!!!!
26	2015-02-03 17:36:12.053	8	2	gdfgfdgfgfdg
27	2015-02-03 17:36:43.862	8	2	fffffffff
28	2015-02-03 19:58:25.865	8	2	ggggggggggg
29	2015-02-06 12:12:12.465	11	2	bla bla
30	2015-02-06 17:45:43.23	5	2	dfff
31	2015-02-06 17:48:35.525	5	2	eeeeee
32	2015-02-07 12:01:53.578	1	2	ola
33	2015-02-07 12:06:53.363	1	2	ggggg
34	2015-02-07 12:17:24.629	1	1	ffffff
38	2015-02-07 13:10:30.692	9	2	Esta queixinha foi alterada pelo seu criador
45	2015-02-10 16:59:53.025	1	2	blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
46	2015-02-10 17:01:53.342	1	2	blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
\.


--
-- TOC entry 2091 (class 0 OID 0)
-- Dependencies: 178
-- Name: comentary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: queixinhasmaster
--

SELECT pg_catalog.setval('comentary_id_seq', 46, true);


--
-- TOC entry 2067 (class 0 OID 17441)
-- Dependencies: 175
-- Data for Name: dbuser; Type: TABLE DATA; Schema: public; Owner: queixinhasmaster
--

COPY dbuser (id, username, password, nickname, email, role) FROM stdin;
1	morais	mais	mestre morais	victor@morais.pt	UE
3	eskilo	dinis	papa rui	rui@dinis.pt	UE
2	jony	jons	chefe joao	nicles	UE
\.


--
-- TOC entry 2066 (class 0 OID 17435)
-- Dependencies: 174
-- Data for Name: queixinha; Type: TABLE DATA; Schema: public; Owner: queixinhasmaster
--

COPY queixinha (id, state, category, owner, georef, description, title) FROM stdin;
9	t	2	2	Penafiel	Finally	Mudar
1	t	1	1	Lisboa	No Isel é sempre a mesma coisa, temos de esperar uma eternidade para saber se a nota de um teste saí ou não. BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA	Nunca mais sai a nota de PDM
5	t	1	1	Lisboa	 	ALIVE FROM CHROME  !!!!
6	t	1	1	Lisboa	\N	Just checking !!!!!
8	t	4	1	Vila Nova dos Azeites	bla bla	Another Check
10	t	5	1	Arouca	grrrrrrrrrrr	Last Test
11	t	6	1	wes	frd	garbage
4	f	6	3	Lisboa	 	tou farto de aturar a Ines
13	t	1	1	Lisboa	Já deviamos andar a fazer o projecto	E o projecto pá !!!!!
12	f	1	2	ISEL	Já dizia a nossa Mary.	O Morais anda impossivel !!!!!!
2	f	4	2	Lisboa	Qualquer dia faço o mesmo no ISEL !!!!	Je sois charles
3	t	5	3	Lisboa	Força Benfica	Benfica rumo ao 34
7	t	4	2	Braga	Changed !!!!!	Another Check
14	t	5	2	Amadora	Será que ainda funciona ?????	Nova Queixinha
\.


--
-- TOC entry 2072 (class 0 OID 17456)
-- Dependencies: 180
-- Data for Name: queixinha_dbuser; Type: TABLE DATA; Schema: public; Owner: queixinhasmaster
--

COPY queixinha_dbuser (id, queixinha, dbuser, dirty) FROM stdin;
17	1	2	f
22	5	2	f
\.


--
-- TOC entry 2092 (class 0 OID 0)
-- Dependencies: 179
-- Name: queixinha_id_seq; Type: SEQUENCE SET; Schema: public; Owner: queixinhasmaster
--

SELECT pg_catalog.setval('queixinha_id_seq', 14, true);


--
-- TOC entry 2093 (class 0 OID 0)
-- Dependencies: 181
-- Name: queixinha_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: queixinhasmaster
--

SELECT pg_catalog.setval('queixinha_user_id_seq', 22, true);


--
-- TOC entry 2094 (class 0 OID 0)
-- Dependencies: 182
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: queixinhasmaster
--

SELECT pg_catalog.setval('user_id_seq', 3, true);


--
-- TOC entry 2068 (class 0 OID 17447)
-- Dependencies: 176
-- Data for Name: vote; Type: TABLE DATA; Schema: public; Owner: queixinhasmaster
--

COPY vote (id, value, queixinha, dbuser) FROM stdin;
2	t	1	2
3	t	10	2
4	f	2	2
5	t	2	1
6	t	5	2
7	t	7	2
8	f	11	2
\.


--
-- TOC entry 2095 (class 0 OID 0)
-- Dependencies: 183
-- Name: vote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: queixinhasmaster
--

SELECT pg_catalog.setval('vote_id_seq', 8, true);


--
-- TOC entry 1924 (class 2606 OID 17472)
-- Name: category_id_unique; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_id_unique UNIQUE (id);


--
-- TOC entry 1926 (class 2606 OID 17474)
-- Name: category_pk; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pk PRIMARY KEY (id);


--
-- TOC entry 1928 (class 2606 OID 17476)
-- Name: comentary_id_unique; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY comentary
    ADD CONSTRAINT comentary_id_unique UNIQUE (id);


--
-- TOC entry 1930 (class 2606 OID 17478)
-- Name: comentary_pk; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY comentary
    ADD CONSTRAINT comentary_pk PRIMARY KEY (id);


--
-- TOC entry 1932 (class 2606 OID 17480)
-- Name: queixinha_id_unique; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY queixinha
    ADD CONSTRAINT queixinha_id_unique UNIQUE (id);


--
-- TOC entry 1934 (class 2606 OID 17482)
-- Name: queixinha_pk; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY queixinha
    ADD CONSTRAINT queixinha_pk PRIMARY KEY (id);


--
-- TOC entry 1944 (class 2606 OID 17484)
-- Name: queixinha_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY queixinha_dbuser
    ADD CONSTRAINT queixinha_user_id_unique UNIQUE (id);


--
-- TOC entry 1946 (class 2606 OID 17486)
-- Name: queixinha_user_pk; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY queixinha_dbuser
    ADD CONSTRAINT queixinha_user_pk PRIMARY KEY (id);


--
-- TOC entry 1936 (class 2606 OID 17488)
-- Name: user_id_unique; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY dbuser
    ADD CONSTRAINT user_id_unique UNIQUE (id);


--
-- TOC entry 1938 (class 2606 OID 17490)
-- Name: user_pk; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY dbuser
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- TOC entry 1940 (class 2606 OID 17492)
-- Name: vote_id_unique; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_id_unique UNIQUE (id);


--
-- TOC entry 1942 (class 2606 OID 17494)
-- Name: vote_pk; Type: CONSTRAINT; Schema: public; Owner: queixinhasmaster; Tablespace: 
--

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_pk PRIMARY KEY (id);


--
-- TOC entry 1948 (class 2606 OID 17500)
-- Name: comentary_dbuser_fk; Type: FK CONSTRAINT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY comentary
    ADD CONSTRAINT comentary_dbuser_fk FOREIGN KEY (dbuser) REFERENCES dbuser(id);


--
-- TOC entry 1947 (class 2606 OID 17495)
-- Name: comentary_queixinha_fk; Type: FK CONSTRAINT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY comentary
    ADD CONSTRAINT comentary_queixinha_fk FOREIGN KEY (queixinha) REFERENCES queixinha(id);


--
-- TOC entry 1954 (class 2606 OID 17520)
-- Name: dbuser_fk; Type: FK CONSTRAINT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY queixinha_dbuser
    ADD CONSTRAINT dbuser_fk FOREIGN KEY (dbuser) REFERENCES dbuser(id);


--
-- TOC entry 1949 (class 2606 OID 17505)
-- Name: queixinha_category_fk; Type: FK CONSTRAINT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY queixinha
    ADD CONSTRAINT queixinha_category_fk FOREIGN KEY (category) REFERENCES category(id);


--
-- TOC entry 1950 (class 2606 OID 17515)
-- Name: queixinha_dbuser_fk; Type: FK CONSTRAINT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY queixinha
    ADD CONSTRAINT queixinha_dbuser_fk FOREIGN KEY (owner) REFERENCES dbuser(id);


--
-- TOC entry 1953 (class 2606 OID 17510)
-- Name: queixinha_fk; Type: FK CONSTRAINT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY queixinha_dbuser
    ADD CONSTRAINT queixinha_fk FOREIGN KEY (queixinha) REFERENCES queixinha(id);


--
-- TOC entry 1952 (class 2606 OID 17530)
-- Name: vote_dbuser_fk; Type: FK CONSTRAINT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_dbuser_fk FOREIGN KEY (dbuser) REFERENCES dbuser(id);


--
-- TOC entry 1951 (class 2606 OID 17525)
-- Name: vote_queixinha_fk; Type: FK CONSTRAINT; Schema: public; Owner: queixinhasmaster
--

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_queixinha_fk FOREIGN KEY (queixinha) REFERENCES queixinha(id);


--
-- TOC entry 2082 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2015-02-13 18:00:14

--
-- PostgreSQL database dump complete
--

