-- BULK INSERT (STATIC DATA)

LOAD DATA INFILE '/var/lib/mysql-files/develop/rss_blog.csv'
    INTO TABLE rss_blog
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (@source_name, @url)
    SET rss_feed_url = @url, created_at = now(), updated_at = now();
