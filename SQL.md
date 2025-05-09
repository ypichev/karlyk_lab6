# Реалізація інформаційного та програмного забезпечення

Цей SQL-скрипт реалізує схему бази даних для проекту FlexForm на MySQL.

## Створення схеми та таблиць

### Видалення існуючої схеми та створення нової

```sql
-- Видалення існуючої схеми та створення нової
DROP SCHEMA IF EXISTS FlexForm;
CREATE SCHEMA FlexForm;
USE FlexForm;

-- Таблиця користувачів з розширеними полями
CREATE TABLE AppUser (
    user_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_verified BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB;

-- Ролі системи з ієрархією
CREATE TABLE ActorRole (
    role_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    role_name VARCHAR(50) UNIQUE NOT NULL,
    parent_role CHAR(36) NULL,
    permissions JSON,
    FOREIGN KEY (parent_role) REFERENCES ActorRole(role_id)
) ENGINE=InnoDB;

-- Прив'язка ролей до користувачів
CREATE TABLE UserRole (
    user_id CHAR(36),
    role_id CHAR(36),
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES AppUser(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES ActorRole(role_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Опитування з параметрами доступу
CREATE TABLE Survey (
    survey_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('DRAFT', 'ACTIVE', 'ARCHIVED') DEFAULT 'DRAFT',
    access_level ENUM('PUBLIC', 'PRIVATE', 'INVITE_ONLY') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    owner_id CHAR(36) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES AppUser(user_id)
) ENGINE=InnoDB;

-- Адаптивні питання з типами
CREATE TABLE Question (
    question_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    survey_id CHAR(36),
    question_text TEXT NOT NULL,
    question_type ENUM('MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'RATING_SCALE', 'TEXT_INPUT') NOT NULL,
    is_required BOOLEAN DEFAULT FALSE,
    validation_rules JSON,
    FOREIGN KEY (survey_id) REFERENCES Survey(survey_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Варіанти відповідей з вагами
CREATE TABLE AnswerOption (
    option_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    question_id CHAR(36),
    option_text TEXT NOT NULL,
    option_weight DECIMAL(3,2) CHECK (option_weight BETWEEN 0 AND 1),
    FOREIGN KEY (question_id) REFERENCES Question(question_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Відповіді користувачів
CREATE TABLE UserResponse (
    response_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    survey_id CHAR(36),
    user_id CHAR(36),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    response_data JSON NOT NULL,
    FOREIGN KEY (survey_id) REFERENCES Survey(survey_id),
    FOREIGN KEY (user_id) REFERENCES AppUser(user_id)
) ENGINE=InnoDB;

-- Тригер для оновлення часу модифікації опитування
DELIMITER $$
CREATE TRIGGER UpdateSurveyTimestamp
BEFORE UPDATE ON Survey
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$
DELIMITER ;

-- Індекси для оптимізації
CREATE INDEX idx_survey_owner ON Survey(owner_id);
CREATE INDEX idx_response_user ON UserResponse(user_id);

-- Початкові дані для ролей
INSERT INTO ActorRole (role_name, permissions) VALUES
('Адміністратор', '{"users": ["create", "delete"], "surveys": ["full"]}'),
('Експерт', '{"surveys": ["answer", "validate"]}'),
('Респондент', '{"surveys": ["answer"]}'),
('Статистик', '{"analytics": ["read", "export"]}');

-- Приклад створення адміністратора
INSERT INTO AppUser (username, password_hash, email, is_verified)
VALUES (
    'sysadmin',
    SHA2('securepass123', 256), -- Хешування паролю
    'admin@flexform.com',
    TRUE
);

-- Прив'язка ролі адміністратора
INSERT INTO UserRole (user_id, role_id)
SELECT 
    (SELECT user_id FROM AppUser WHERE username = 'sysadmin'),
    (SELECT role_id FROM ActorRole WHERE role_name = 'Адміністратор');
```
