#!/usr/bin/env bash

export PGPASSWORD=rollcall
dropdb -h localhost -U rollcall rollcall && \
createdb -h localhost -U rollcall rollcall && \
echo "The old DB was dropped and the new one was created."
