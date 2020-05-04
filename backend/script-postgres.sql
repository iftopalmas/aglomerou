create database aglomerou encoding = utf8;

# Conectar ao banco pelo psql
\c aglomerou

## Usuários que podem acessar o dashboard web para administração
create table usuario (
    id serial not null primary key, 
    data_hora_cadastro timestamp default CURRENT_TIMESTAMP,
    ativo boolean not null default true,
    email varchar(120) not null,
    senha varchar(255)
);

## Dispositivos móveis usados pelo app (representando as pessoas que o utilizam)
create table dispositivo (
    id serial not null primary key, 
    data_hora_cadastro timestamp default CURRENT_TIMESTAMP,
    uid varchar(200) not null unique
);

# Os campos latitude e longitude são representados em decimal,
# mas não sei se a quantidade de casas é exata.
# Por isso, defini como varchar, pelo menos por enquanto.
# https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en

create table localizacao_dispositivo (
    id bigserial not null primary key, 
    id_dispositivo int not null, 
    latitude varchar(20) not null, 
    longitude varchar(20) not null,
    data_hora_ultima_atualizacao timestamp default CURRENT_TIMESTAMP,
    ativo boolean not null default true,

    constraint fk_localizacao_dispositivo foreign key (id_dispositivo) references dispositivo(id)
);


