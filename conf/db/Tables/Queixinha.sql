-- Table: "Queixinha"

-- DROP TABLE "Queixinha";

CREATE TABLE "Queixinha"
(
  id integer NOT NULL DEFAULT nextval('queixinha_id_seq'::regclass),
  state boolean NOT NULL,
  category smallint NOT NULL,
  owner smallint,
  georef text NOT NULL,
  description text NOT NULL,
  title text,
  CONSTRAINT queixinha_pk PRIMARY KEY (id),
  CONSTRAINT queixinha_category_fk FOREIGN KEY (category)
      REFERENCES "category" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT queixinha_user_fk FOREIGN KEY (owner)
      REFERENCES "dbuser" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT queixinha_id_unique UNIQUE (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Queixinha"
  OWNER TO queixinhasmaster;
