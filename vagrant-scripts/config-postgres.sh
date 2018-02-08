# Add the source repo
echo "deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Get the signing key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# Install Postgres.
apt-get update -y -q
apt-get install -y -q postgresql-9.6

# Modify the configs to bind to all devices.

