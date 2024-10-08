CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('client', 'provider'))
);

CREATE TABLE availabilities (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL,
    availability_date DATE NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('open', 'reserved')),
    FOREIGN KEY (provider_id) REFERENCES users(id)
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    availability_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    requested_at TIMESTAMP NOT NULL,   
    status VARCHAR(50) NOT NULL CHECK (status IN ('requested', 'confirmed')),
    FOREIGN KEY (availability_id) REFERENCES availabilities(id),
    FOREIGN KEY (client_id) REFERENCES users(id)
);

INSERT INTO users (name, email, user_type) VALUES
('John Doe', 'john.doe@clients.com', 'client'),
('Jane Smith', 'jane.smith@providers.com', 'provider');

