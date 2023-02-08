CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_name VARCHAR(64),
    user_username VARCHAR(64),
    user_password VARCHAR(64),
    user_email VARCHAR(256),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE archive_users(
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    archive_id uuid ,
    user_name VARCHAR(64),
    user_username VARCHAR(64),
    user_password VARCHAR(64),
    user_email VARCHAR(256),
    archive_created_at TIMESTAMPTZ NOT NULL,
    archive_updated_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE memories(
    memory_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_id uuid,
    memory_title TEXT,
    memory_desc TEXT,
    memory_media TEXT,
    memory_like BOOLEAN DEFAULT FALSE,
    memory_dislike BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE archive_memories(
    memory_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    archive_id uuid,
    user_id uuid,
    memory_title TEXT,
    memory_desc TEXT,
    memory_media TEXT,
    archive_created_at TIMESTAMPTZ NOT NULL,
    archive_updated_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE categories(
    category_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    category_name VARCHAR(256),
    user_id uuid,
    category_datas TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE archive_categories(
    category_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    archive_id uuid,
    user_id uuid,
    category_name VARCHAR(256),
    category_datas TEXT,
    archive_created_at TIMESTAMPTZ NOT NULL,
    archive_updated_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE files(
    file_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    file_name VARCHAR(64),
    file_type VARCHAR(64),
    user_id uuid,
    file_size VARCHAR(64),
    file_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE archive_files(
    file_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_id uuid,
    archive_id uuid,
    file_name VARCHAR(64),
    file_type VARCHAR(64),
    file_size VARCHAR(64),
    file_url TEXT,
    archive_created_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_sessions(
    session_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_id uuid,
    user_username VARCHAR(100),
    user_password VARCHAR(100),
    session_remoteip VARCHAR(255),
    session_device VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



CREATE OR REPLACE FUNCTION fnArchiveUser()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN

     INSERT INTO archive_files(archive_id, user_name, user_username, user_password, user_email, archive_created_at, archive_updated_at) VALUES(OLD.user_id, OLD.user_name, OLD.user_username, OLD.user_password, OLD.user_email, OLD.created_at, OLD.updated_at);
    RETURN OLD;
END
$$;


CREATE TRIGGER deleteUserTrigger
AFTER DELETE
ON users
FOR EACH ROW
EXECUTE PROCEDURE fnArchiveUser();


------------- File Trigger -------------------------
CREATE OR REPLACE FUNCTION fnArchiveFile()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN

     INSERT INTO archive_files(archive_id, user_id, file_name, file_type, file_size, file_url ,archive_created_at, archive_updated_at) VALUES(OLD.file_id, OLD.user_id, OLD.file_name, OLD.file_type, OLD.file_size, OLD.file_url, OLD.created_at, OLD.updated_at);
     RETURN OLD;
END
$$;


CREATE TRIGGER deleteFileTrigger
AFTER DELETE
ON files
FOR EACH ROW
EXECUTE PROCEDURE fnArchiveFile();


-------------- Memories trigger --------------


CREATE OR REPLACE FUNCTION fnArchiveMemory()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN

     INSERT INTO archive_memories(archive_id, user_id, memory_title, memory_desc, memory_media, archive_created_at, archive_updated_at) VALUES(OLD.memory_id, OLD.user_id, OLD.memory_title, OLD.memory_desc, OLD.memory_media, OLD.created_at, OLD.updated_at);
     RETURN OLD;
END
$$;


CREATE TRIGGER deleteMemoryTrigger
AFTER DELETE
ON memories
FOR EACH ROW
EXECUTE PROCEDURE fnArchiveMemory();