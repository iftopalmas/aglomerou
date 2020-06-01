-- Dados para testes no ambiente de desenvolvimento

--bf = algoritmo blowfish para gerar o salt e criptografar as senhas
insert into usuario (data_hora_cadastro, email, senha)
values ('2020-05-01', 'usuario1@gmail.com', crypt('123456', gen_salt('bf'))),
       ('2020-05-02', 'usuario2@gmail.com', crypt('123456', gen_salt('bf'))),
       ('2020-05-03', 'usuario3@gmail.com', crypt('123456', gen_salt('bf'))),
       ('2020-05-04', 'usuario4@gmail.com', crypt('123456', gen_salt('bf'))),
       ('2020-05-05', 'usuario5@gmail.com', crypt('123456', gen_salt('bf')));

insert into dispositivo (data_hora_cadastro, tipo, uid)
values ('2020-05-01', 'android', '1'),
       ('2020-05-02', 'android', '2'),
       ('2020-05-03', 'iOS', '3'),
       ('2020-05-04', 'iOS', '4');

insert into localizacao_dispositivo (uid, latitude, longitude)
values (1, 90, 180),
       (1, -90, 180),
       (1, 90, -180),
       (1, -90, -180),
       (2, 91, 170),
       (2, -91, 170),
       (2, 91, -170),
       (2, -91, -170),
       (3, 70, 170),
       (3, -70, 170),
       (3, 70, -170),
       (3, -70, -170),
       (4, 45, 120),
       (4, -45, 120),
       (4, 45, -120),
       (4, -45, -120);