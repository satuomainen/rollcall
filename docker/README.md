# Docker containers for development

Services here:

* PostgreSQL 9.6 (user: postgres, password: postgres)

## Initialization scripts

All *.sql and *.sh scripts in the `./init-scripts` directory are run when the database volume is created. To
drop the database container, delete the docker volume as well: `docker volume rm docker_rollcall_dbdata`.

The initialization script `initialize-rollcall.sql` creates user `rollcall` (password `rollcall`) and
database `rollcall`.

## Starting and stopping

To start in the background, run `docker-compose up -d`.

To stop the running container(s), run `docker-compose down`.

## Version compatibility

This config worked on macOS 10.13.3. with
* `Docker version 17.12.0-ce, build c97c6d6` and
* `docker-compose version 1.18.0, build 8dd22a9`.
