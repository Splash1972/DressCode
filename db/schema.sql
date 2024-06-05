DROP DATABASE IF EXISTS dresscode_db;

-- Create the database
CREATE DATABASE dresscode_db;

-- Connect to the database
\c dresscode_db;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the attires table
CREATE TABLE attires (
    id SERIAL PRIMARY KEY,
    weather VARCHAR(50) NOT NULL,
    event VARCHAR(100) NOT NULL,
    suggestion TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the sessions table for express-session
CREATE TABLE sessions (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE sessions ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Optional: Create indexes for faster querying
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_attires_user_id ON attires(user_id);
