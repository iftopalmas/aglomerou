create database aglomerou encoding = utf8;

-- Conectar ao banco pelo psql
\connect aglomerou

-- Habilita o módulo de criptografia para funções como crypt e gen_sault
create extension pgcrypto;

create table usuario (
    id serial not null primary key, 
    data_hora_cadastro timestamp default CURRENT_TIMESTAMP,
    ativo boolean not null default true,
    email varchar(120) not null,
    senha varchar(255)
);

comment on table usuario is 'Usuários que podem acessar o dashboard web para administração';

create table dispositivo (
    id serial not null primary key, 
    data_hora_cadastro timestamp default CURRENT_TIMESTAMP,
    uid varchar(200) not null unique
);

comment on table dispositivo is 'Dispositivos móveis usados pelo app (representando as pessoas que o utilizam)';

-- Os campos latitude e longitude são representados em Graus Decimais,
-- mas não sei se a quantidade de casas é exata.
-- Por isso, defini como varchar, pelo menos por enquanto.
-- https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en
-- https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#Change_of_units_and_format

create table localizacao_dispositivo (
    id bigserial not null primary key, 
    id_dispositivo int not null, 
    latitude varchar(20) not null, 
    longitude varchar(20) not null,
    data_hora_ultima_atualizacao timestamp default CURRENT_TIMESTAMP,

    constraint fk_localizacao_dispositivo foreign key (id_dispositivo) references dispositivo(id)
);

comment on column localizacao_dispositivo.latitude is 'Latitude em Graus Decimais';
comment on column localizacao_dispositivo.longitude is 'Longitude em Graus Decimais';
