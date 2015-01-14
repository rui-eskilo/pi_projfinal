-- Table: "Vote"

-- DROP TABLE "Vote";

CREATE TABLE "Vote"
(
  id integer NOT NULL DEFAULT nextval('vote_id_seq'::regclass),
  value boolean NOT NULL,
  queixinha smallint NOT NULL,
  "user" smallint NOT NULL,
  CONSTRAINT vote_pk PRIMARY KEY (id),
  CONSTRAINT vote_queixinha_fk FOREIGN KEY (queixinha)
      REFERENCES "Queixinha" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT vote_user_fk FOREIGN KEY ("user")
      REFERENCES "User" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT vote_id_unique UNIQUE (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Vote"
  OWNER TO queixinhasmaster;
