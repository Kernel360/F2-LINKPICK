ALTER TABLE baguni_db.link
    MODIFY COLUMN created_at TIMESTAMP NOT NULL DEFAULT '2024-01-01 00:00:00',
    MODIFY COLUMN updated_at TIMESTAMP NOT NULL DEFAULT '2024-01-01 00:00:00';

UPDATE baguni_db.link
SET created_at = '2024-01-01 00:00:00',
    updated_at = '2024-01-01 00:00:00';


