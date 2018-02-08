# Get repo attached.
echo "deb https://apache.bintray.com/couchdb-deb xenial main" > /etc/apt/sources.list.d/couchdb.list

# Get signing key.
curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc | apt-key add -

# Prep debconf for automatic install.
COUCHDB_PASSWORD=password
COUCHDB_BIND=0.0.0.0
echo "couchdb couchdb/mode select standalone
couchdb couchdb/mode seen true
couchdb couchdb/bindaddress string ${COUCHDB_BIND}
couchdb couchdb/bindaddress seen true
couchdb couchdb/adminpass password ${COUCHDB_PASSWORD}
couchdb couchdb/adminpass seen true
couchdb couchdb/adminpass_again password ${COUCHDB_PASSWORD}
couchdb couchdb/adminpass_again seen true" | debconf-set-selections

# Install the package.
DEBIAN_FRONTEND=noninteractive apt-get install -y --force-yes couchdb
