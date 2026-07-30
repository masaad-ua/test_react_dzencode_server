-- ======================================================
-- Inventory Management Database
-- ======================================================

DROP DATABASE IF EXISTS orders_products_db;
CREATE DATABASE orders_products_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE orders_products_db;

-- ======================================================
-- Orders
-- ======================================================

CREATE TABLE orders
(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    description TEXT NULL,

    created_at DATETIME NOT NULL
);

-- ======================================================
-- Products
-- ======================================================

CREATE TABLE products
(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    order_id INT UNSIGNED NOT NULL,

    serial_number BIGINT NOT NULL,

    title VARCHAR(255) NOT NULL,

    series VARCHAR(100) NOT NULL,

    type VARCHAR(100) NOT NULL,

    specification VARCHAR(255),

    photo VARCHAR(255),

    is_new BOOLEAN NOT NULL DEFAULT FALSE,

    status BOOLEAN NOT NULL DEFAULT TRUE,

    guarantee_start DATETIME NOT NULL,

    guarantee_end DATETIME NOT NULL,

    price_usd DECIMAL(10,2) NOT NULL,

    price_uah DECIMAL(10,2) NOT NULL,

    created_at DATETIME NOT NULL,

    CONSTRAINT fk_products_orders
        FOREIGN KEY (order_id)
            REFERENCES orders(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE INDEX idx_products_order
    ON products(order_id);

CREATE INDEX idx_products_type
    ON products(type);

CREATE INDEX idx_products_status
    ON products(status);

CREATE INDEX idx_products_is_new
    ON products(is_new);