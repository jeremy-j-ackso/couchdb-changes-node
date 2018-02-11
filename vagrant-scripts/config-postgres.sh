# Add the source repo
echo "deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Get the signing key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# Install Postgres.
apt-get update -y -q
apt-get install -y -q postgresql-9.6 odbc-postgresql unixodbc

# Modify the configs to bind to all devices.

# Add a vagrant user for convenience and a node_user for the application.
sudo -u postgres createuser -d -l -s vagrant
sudo -u postgres createuser -l node_user

# Add the sql database that will be updated.
sudo -u postgres createdb updatedDb

# Set up odbc
odbcinst -i -d -f /usr/share/psqlodbc/odbcinst.ini.template

echo "[PostgreSQL]
Description = Updating Node Database
Driver = PostgreSQL ANSI
Trace = No
TraceFile = /var/log/postgres/updatedDb-trace.log
Database = updatedDb
Servername = localhost
Port = 5432
ReadOnly = No" > /etc/odbc.ini

sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/9.6/main/postgresql.conf
sed -i "88i\host all all 0.0.0.0/0 trust" /etc/postgresql/9.6/main/pg_hba.conf

# Restart so changes take effect.
systemctl restart postgresql.service
