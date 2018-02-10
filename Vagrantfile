# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-16.04"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "1"
  end

  config.vm.define "couch" do |couch|
    couch.vm.network "forwarded_port", guest: 5984, host: 5984
    couch.vm.provision "shell", path: "./vagrant-scripts/config-couchdb.sh"
  end

  config.vm.define "postgres" do |postgres|
    postgres.vm.network "forwarded_port", guest: 5432, host: 5432
    postgres.vm.provision "shell", path: "./vagrant-scripts/config-postgres.sh"
  end
end
