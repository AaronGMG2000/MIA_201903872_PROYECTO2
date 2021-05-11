sudo chmod 666 /var/run/docker.sock
sudo docker login
sudo docker start oracle
sudo  docker exec -it oracle bash -c "source /home/oracle/.bashrc; sqlplus /nolog"

#sudo /opt/sqldeveloper/sqldeveloper.sh
