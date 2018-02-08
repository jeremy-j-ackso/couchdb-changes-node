# Add the source repo
echo "deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Get the signing key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# Install Postgres.
apt-get update -y -q
apt-get install -y -q postgresql-9.6

# Modify the configs to bind to all devices.

# Add a vagrant user for convenience and a node_user for the application.
sudo -u postgres createuser -d -l -s vagrant
sudo -u postgres createuser -d -l -s node_user
