#!/bin/bash

# Database setup for Supabase
echo "Setting up database tables..."

# Create tables
psql $DATABASE_URL << EOF
-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS "Table" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    qr_code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "MediaFile" (
    id SERIAL PRIMARY KEY,
    table_id INTEGER NOT NULL REFERENCES "Table"(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_type TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_table_qr_code ON "Table"(qr_code);
CREATE INDEX IF NOT EXISTS idx_media_file_table_id ON "MediaFile"(table_id);

EOF

echo "Database setup completed!"
