create database aglomerou encoding = utf8;

-- Conectar ao banco pelo psql
\connect aglomerou

-- Habilita o módulo de criptografia para funções como crypt e gen_sault
create extension pgcrypto;

create table usuario (
    id serial not null primary key, 
    data_hora_cadastro timestamp default CURRENT_TIMESTAMP,
    ativo boolean not null default false,
    email varchar(120) not null unique,
    senha varchar(255)
);

comment on table usuario is 'Usuários que podem acessar o dashboard web para administração';

create table dispositivo (
    uid varchar(200) not null primary key,
    tipo varchar(100) not null,
    bloqueado boolean not null default false,
    latitude numeric(10,7),
    longitude numeric(10,7),
    data_hora_ultima_atualizacao timestamp default CURRENT_TIMESTAMP,
    data_hora_cadastro timestamp default CURRENT_TIMESTAMP
);

comment on table dispositivo is 'Dispositivos móveis usados pelo app (representando as pessoas que o utilizam)';
comment on column dispositivo.bloqueado is 'Se marcado como true ira recusar as requisições de tal dispositivo';

-- Os campos latitude e longitude são representados em Graus Decimais,
-- mas não sei se a quantidade de casas é exata.
-- Por isso, defini como varchar, pelo menos por enquanto.
-- https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en
-- https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#Change_of_units_and_format

create table localizacao_dispositivo (
    id bigserial not null primary key, 
    uid varchar(200) not null, 
    latitude numeric(10,7) not null, 
    longitude numeric(10,7) not null,
    data_hora_ultima_atualizacao timestamp default CURRENT_TIMESTAMP,

    constraint fk_localizacao_dispositivo foreign key (uid) references dispositivo(uid) on delete cascade
);

comment on column localizacao_dispositivo.latitude is 'Latitude em Graus Decimais';
comment on column localizacao_dispositivo.longitude is 'Longitude em Graus Decimais';

create table notificacao (
    id serial not null primary key,
    data_hora_cadastro timestamp default current_timestamp not null,
    uid varchar(200) not null, 
    latitude numeric(10,7) not null,
    longitude numeric(10,7) not null,
    estimativa_total_pessoas int not null,
    observacoes varchar(250),

    constraint fk_notificacao_dispositivo foreign key (uid) references dispositivo(uid) on delete cascade
);

create view vwUltimosDispositivosAtivos as 
select uid, max(id) as id_localizacao from localizacao_dispositivo l 
where extract(epoch from (current_timestamp - data_hora_ultima_atualizacao)) <= 300 
group by uid;

comment on view vwUltimosDispositivosAtivos is 'Obtém os dispositivos que estiveram ativos nos últimos 5 minutos';

create view vwUltimaLocalizacaoTodos as 
select latitude, longitude
from localizacao_dispositivo l
inner join vwUltimosDispositivosAtivos v on l.uid = v.uid and l.id = v.id_localizacao;

comment on view vwUltimaLocalizacaoTodos is 'Obtém a localização dos dispositivos que estiveram ativos nos últimos 5 minutos';
