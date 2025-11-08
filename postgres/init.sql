-- Create tables
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    capacity INTEGER NOT NULL
);

CREATE TABLE seats (
    id SERIAL PRIMARY KEY
);

-- Populate rooms with 15 rooms of 20 capacity
INSERT INTO rooms (capacity)
SELECT 20 FROM generate_series(1, 15);

-- Populate seats with 216 entries
INSERT INTO seats (id)
SELECT generate_series(1, 216);
