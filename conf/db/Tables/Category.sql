-- Table: "Category"

-- DROP TABLE "Category";

CREATE TABLE "Category"
(
  id integer NOT NULL DEFAULT nextval('category_id_seq'::regclass),
  description text,
  CONSTRAINT category_pk PRIMARY KEY (id),
  CONSTRAINT category_id_unique UNIQUE (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Category"
  OWNER TO queixinhasmaster;
