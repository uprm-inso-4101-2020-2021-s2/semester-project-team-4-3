create table administrator
(
    id           serial       not null
        constraint administrator_pkey
            primary key,
    first_name   varchar(20)  not null,
    last_name    varchar(20)  not null,
    phone_number varchar(10)  not null,
    email        varchar(100) not null,
    username     varchar(10)  not null,
    password     varchar(10)  not null
);

alter table administrator
    owner to javier;

INSERT INTO administrator (id, first_name, last_name, phone_number, email, username, password) VALUES (100, 'Pedro', 'Astacio', '7872343454', 'pedroa@yahoo.com', 'pastacio', '12345');
INSERT INTO administrator (id, first_name, last_name, phone_number, email, username, password) VALUES (101, 'Anibal', 'Acevedo', '7879872341', 'anibala@yahoo.com', 'aacevedo', '12345');
INSERT INTO administrator (id, first_name, last_name, phone_number, email, username, password) VALUES (102, 'Alejandro', 'Garcia', '7879892355', 'alejandrog@yahoo.com', 'agarcia', '12345');
INSERT INTO administrator (id, first_name, last_name, phone_number, email, username, password) VALUES (103, 'Joe', 'Biden', '7873432343', 'joeb@yahoo.com', 'jbiden', '12345');







create table deductions_benefits
(
    id         serial       not null
        constraint deductions_benefits_pkey
            primary key,
    type       varchar(100) not null,
    deductions boolean      not null,
    rule       integer      not null,
    employee   integer
);

alter table deductions_benefits
    owner to javier;

INSERT INTO deductions_benefits (id, type, deductions, rule, employee) VALUES (1, 'Medical Plan', false, 1, 1);
INSERT INTO deductions_benefits (id, type, deductions, rule, employee) VALUES (2, 'Medical Plan', false, 1, 2);
INSERT INTO deductions_benefits (id, type, deductions, rule, employee) VALUES (3, 'Medical Plan', false, 1, 11);
INSERT INTO deductions_benefits (id, type, deductions, rule, employee) VALUES (4, 'Medical Plan', false, 1, 12);
INSERT INTO deductions_benefits (id, type, deductions, rule, employee) VALUES (5, 'Social Security', true, 1, 15);
INSERT INTO deductions_benefits (id, type, deductions, rule, employee) VALUES (6, 'Social Security', true, 1, 11);
INSERT INTO deductions_benefits (id, type, deductions, rule, employee) VALUES (7, 'Social Security', true, 1, 12);
INSERT INTO deductions_benefits (id, type, deductions, rule, employee) VALUES (8, 'SINOT', false, 1, 17);
INSERT INTO deductions_benefits (id, type, deductions, rule, employee) VALUES (9, 'Insurance', true, 1, 18);
INSERT INTO deductions_benefits (id, type, deductions, rule, employee) VALUES (10, 'Income Tax', true, 1, 19);







create table employee
(
    id            integer          not null
        constraint employee_pkey
            primary key,
    first_name    varchar(20)      not null,
    last_name     varchar(20)      not null,
    phone_number  varchar(10)      not null,
    email         varchar(100)     not null,
    username      varchar(10)      not null,
    password      varchar(10)      not null,
    salary        double precision not null,
    vacation_days integer          not null,
    sick_days     integer          not null
);

alter table employee
    owner to javier;

INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (1, 'Javier', 'Melendez', '7872205582', 'javier@gmail.com', 'javier1', '1234', 2000, 24, 12);
INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (2, 'Jose', 'Martinez', '7872324345', 'josemart@gmail.com', 'jose1', '1234', 2000, 24, 12);
INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (11, 'Jose', 'Martinez', '7872324345', 'josemart@gmail.com', 'jose1', '1234', 2000, 24, 12);
INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (12, 'Alberto', 'Ramirez', '7873435636', 'albertoram@gmail.com', 'alberto1', '1234', 2000, 24, 12);
INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (13, 'Antonio', 'Guzman', '9395412343', 'antonio@gmail.com', 'antonio1', '1234', 2000, 24, 12);
INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (14, 'Sofia', 'Melendez', '9394326578', 'sofia@gmail.com', 'sofia1', '1234', 2000, 24, 12);
INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (15, 'Marcos', 'Guzman', '7878923425', 'guzmanmarcos@gmail.com', 'marcos1', '1234', 2000, 24, 12);
INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (16, 'Luis', 'Melendez', '7872205487', 'luismelendez@gmail.com', 'luis1', '1234', 2000, 24, 12);
INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (17, 'Mildred', 'Droz', '7872205434', 'drozm@gmail.com', 'mildred1', '1234', 2000, 24, 12);
INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (18, 'Benito', 'Martinez', '9392345678', 'benitopr@gmail.com', 'sanbenito', '1234', 2000, 24, 12);
INSERT INTO employee (id, first_name, last_name, phone_number, email, username, password, salary, vacation_days, sick_days) VALUES (19, 'Dwayne', 'Johnson', '7873455456', 'therock@gmail.com', 'therock', '1234', 2000, 24, 12);







create table manages
(
    manager  integer
        constraint manages_manager_fkey
            references administrator,
    employee integer
);

alter table manages
    owner to javier;

INSERT INTO manages (manager, employee) VALUES (100, 1);
INSERT INTO manages (manager, employee) VALUES (100, 2);
INSERT INTO manages (manager, employee) VALUES (100, 11);
INSERT INTO manages (manager, employee) VALUES (100, 12);
INSERT INTO manages (manager, employee) VALUES (101, 13);
INSERT INTO manages (manager, employee) VALUES (102, 14);
INSERT INTO manages (manager, employee) VALUES (103, 15);
INSERT INTO manages (manager, employee) VALUES (103, 16);
INSERT INTO manages (manager, employee) VALUES (101, 17);
INSERT INTO manages (manager, employee) VALUES (101, 18);
INSERT INTO manages (manager, employee) VALUES (102, 19);







create table paystub
(
    pid        integer not null
        constraint paystub_pkey
            primary key,
    start_date date    not null,
    end_date   date    not null,
    employee   integer
        constraint paystub_employee_fkey
            references employee
);

alter table paystub
    owner to javier;

INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2000, '2021-03-01', '2021-03-14', 1);
INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2001, '2021-03-01', '2021-03-14', 2);
INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2002, '2021-03-01', '2021-03-14', 11);
INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2003, '2021-03-01', '2021-03-14', 12);
INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2004, '2021-03-01', '2021-03-14', 13);
INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2005, '2021-03-01', '2021-03-14', 14);
INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2006, '2021-03-01', '2021-03-14', 15);
INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2007, '2021-03-01', '2021-03-14', 16);
INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2008, '2021-03-01', '2021-03-14', 17);
INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2009, '2021-03-01', '2021-03-14', 18);
INSERT INTO paystub (pid, start_date, end_date, employee) VALUES (2010, '2021-03-01', '2021-03-14', 19);







create table requests
(
    id         serial       not null
        constraint requests_pkey
            primary key,
    type       varchar(100) not null,
    start_date date         not null,
    end_date   date         not null,
    approved   boolean      not null,
    manager    integer
        constraint requests_manager_fkey
            references administrator,
    employee   integer
);

alter table requests
    owner to javier;

INSERT INTO requests (id, type, start_date, end_date, approved, manager, employee) VALUES (1, 'sick day', '2021-03-15', '2021-03-16', true, 102, 11);
INSERT INTO requests (id, type, start_date, end_date, approved, manager, employee) VALUES (2, 'vacations', '2021-03-15', '2021-03-30', false, 103, 2);








create table timesheet
(
    id         serial not null
        constraint timesheet_pkey
            primary key,
    start_date date   not null,
    end_date   date   not null,
    employee   integer
);

alter table timesheet
    owner to javier;

INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (200, '2021-03-01', '2021-03-14', 1);
INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (201, '2021-03-01', '2021-03-14', 2);
INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (202, '2021-03-01', '2021-03-14', 11);
INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (203, '2021-03-01', '2021-03-14', 12);
INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (204, '2021-03-01', '2021-03-14', 13);
INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (205, '2021-03-01', '2021-03-14', 14);
INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (206, '2021-03-01', '2021-03-14', 15);
INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (207, '2021-03-01', '2021-03-14', 16);
INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (208, '2021-03-01', '2021-03-14', 17);
INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (209, '2021-03-01', '2021-03-14', 18);
INSERT INTO timesheet (id, start_date, end_date, employee) VALUES (210, '2021-03-01', '2021-03-14', 19);







create table workday
(
    id        serial  not null
        constraint workday_pkey
            primary key,
    w_date    date    not null,
    vacation  boolean not null,
    timesheet integer
        constraint workday_timesheet_fkey
            references timesheet
);

alter table workday
    owner to javier;

INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (301, '2021-03-02', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (302, '2021-03-03', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (303, '2021-03-04', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (304, '2021-03-05', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (305, '2021-03-06', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (306, '2021-03-08', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (307, '2021-03-09', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (308, '2021-03-10', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (309, '2021-03-11', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (310, '2021-03-12', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (311, '2021-03-13', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (300, '2021-03-01', false, 200);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (312, '2021-03-01', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (313, '2021-03-02', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (314, '2021-03-03', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (315, '2021-03-04', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (316, '2021-03-05', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (317, '2021-03-06', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (318, '2021-03-08', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (319, '2021-03-09', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (320, '2021-03-10', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (321, '2021-03-11', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (322, '2021-03-12', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (323, '2021-03-13', false, 201);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (324, '2021-03-01', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (325, '2021-03-02', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (326, '2021-03-03', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (327, '2021-03-04', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (328, '2021-03-05', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (329, '2021-03-06', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (330, '2021-03-08', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (331, '2021-03-09', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (332, '2021-03-10', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (333, '2021-03-11', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (334, '2021-03-12', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (335, '2021-03-13', false, 202);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (336, '2021-03-01', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (337, '2021-03-02', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (338, '2021-03-03', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (339, '2021-03-04', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (340, '2021-03-05', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (341, '2021-03-06', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (342, '2021-03-08', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (343, '2021-03-09', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (344, '2021-03-10', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (345, '2021-03-11', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (346, '2021-03-12', false, 203);
INSERT INTO workday (id, w_date, vacation, timesheet) VALUES (347, '2021-03-13', false, 203);




create table worktasks
(
    id           serial           not null
        constraint worktasks_pkey
            primary key,
    type         varchar(100)     not null,
    hours_worked double precision not null,
    workday      integer
        constraint worktasks_workday_fkey
            references workday
);

alter table worktasks
    owner to javier;

INSERT INTO worktasks (id, type, hours_worked, workday) VALUES (1000, 'Sampling', 4, 300);
INSERT INTO worktasks (id, type, hours_worked, workday) VALUES (1001, 'Lunch', 1, 300);
INSERT INTO worktasks (id, type, hours_worked, workday) VALUES (1002, 'Laboratory tasks', 4, 300);
INSERT INTO worktasks (id, type, hours_worked, workday) VALUES (1003, 'Sampling', 4, 301);
INSERT INTO worktasks (id, type, hours_worked, workday) VALUES (1004, 'Lunch', 1, 301);
INSERT INTO worktasks (id, type, hours_worked, workday) VALUES (1005, 'Secretarial tasks', 4, 301);
INSERT INTO worktasks (id, type, hours_worked, workday) VALUES (1006, 'Billing', 4, 302);
INSERT INTO worktasks (id, type, hours_worked, workday) VALUES (1007, 'Lunch', 1, 302);
INSERT INTO worktasks (id, type, hours_worked, workday) VALUES (1008, 'Billing', 4, 302);