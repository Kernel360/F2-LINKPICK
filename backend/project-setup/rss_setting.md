### docker mysql 접속

1. docker exec -it techpick-mysql sh
2. mysql -u root -p
3. show databases;
4. use techpick_db;
5. show tables;

### mysql에서 data.sql 파일 실행 및 rss csv 파일 insert

6. source /var/lib/mysql-files/develop/data.sql;