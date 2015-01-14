-- Table: "Comentary"

-- DROP TABLE "Comentary";

CREATE TABLE "Comentary"
(
  id integer NOT NULL DEFAULT nextval('comentary_id_seq'::regclass),
  insertion_date timestamp without time zone NOT NULL,
  queixinha smallint NOT NULL,
  "user" smallint NOT NULL,
  description text NOT NULL,
  CONSTRAINT comentary_pk PRIMARY KEY (id),
  CONSTRAINT comentary_queixinha_fk FOREIGN KEY (queixinha)
      REFERENCES "Queixinha" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT comentary_user_fk FOREIGN KEY ("user")
      REFERENCES "User" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT comentary_id_unique UNIQUE (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Comentary"
  OWNER TO queixinhasmaster;
