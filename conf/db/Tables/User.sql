-- Table: "User"

-- DROP TABLE "User";

CREATE TABLE "User"
(
  id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
  username text NOT NULL,
  password text NOT NULL,
  nickname text,
  email text NOT NULL,
  CONSTRAINT user_pk PRIMARY KEY (id),
  CONSTRAINT user_id_unique UNIQUE (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "User"
  OWNER TO queixinhasmaster;
