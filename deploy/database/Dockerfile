FROM postgres:9.5

RUN sed -ri "s!^#?(max_connections)\s*=\s*\S+.*!\1 = '1000'!" /usr/share/postgresql/postgresql.conf.sample
