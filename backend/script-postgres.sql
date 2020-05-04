create database aglomerou encoding = utf8;

# Conectar ao banco pelo psql
\c aglomerou

create table usuario (
    id serial not null primary key, 
    data_hora_cadastro timestamp default CURRENT_TIMESTAMP,
    uid varchar(200) not null unique
);

# latitude e longitude são representados em decimal,
# mas não sei se a quantidade de casas é exata.
# Por isso, defini como varchar, pelo menos por enquanto.
# https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en

create table localizacao_usuario (
    id bigserial not null primary key, 
    id_usuario int not null, 
    latitude varchar(20) not null, 
    longitude varchar(20) not null,
    data_hora_ultima_atualizacao timestamp default CURRENT_TIMESTAMP,
    ativo boolean not null default true,

    constraint fk_localizacao_usuario foreign key (id_usuario) references usuario(id)
);


