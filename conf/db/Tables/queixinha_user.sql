-- Table: queixinha_user

-- DROP TABLE queixinha_user;

CREATE TABLE queixinha_user
(
  id serial NOT NULL,
  queixinha smallint NOT NULL,
  "user" smallint NOT NULL,
  CONSTRAINT queixinha_user_pk PRIMARY KEY (id),
  CONSTRAINT queixinha_fk FOREIGN KEY (queixinha)
      REFERENCES "queixinha" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT user_fk FOREIGN KEY ("user")
      REFERENCES "dbuser" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT queixinha_user_id_unique UNIQUE (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE queixinha_user
  OWNER TO queixinhasmaster;
