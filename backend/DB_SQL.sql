-- ENUM for roles and statuses
CREATE TYPE UserRole AS ENUM ('Admin', 'Teacher', 'Donor');
CREATE TYPE ItemStatus AS ENUM ('Pending', 'Accepted', 'Rejected');
CREATE TYPE RequestStatus AS ENUM ('Pending', 'Accepted', 'Rejected');
CREATE TYPE ListingStatus AS ENUM ('Active', 'Expired', 'Paused');

-- Users Table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    AccountStatus BOOLEAN DEFAULT TRUE,
    LastLoginDate TIMESTAMP,
    Role UserRole,
    OrganizationName VARCHAR(255),
    ItemsDonated INTEGER DEFAULT 0,
    SchoolName VARCHAR(255),
    GradeLevel VARCHAR(50)
);

-- Items Table
CREATE TABLE Items (
    ItemID SERIAL PRIMARY KEY,
    ItemType VARCHAR(255),  -- This can be an ENUM if there are specific item types
    Description TEXT,
    ItemPictureURL VARCHAR(1024),
    ZipCode VARCHAR(10),
    DatePosted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ItemStatus
);

-- ListItems Table
CREATE TABLE ListItems (
    ListingID SERIAL PRIMARY KEY,
    ListingTitle VARCHAR(255),
    ItemID INTEGER REFERENCES Items(ItemID),
    UserID INTEGER REFERENCES Users(UserID),
    Status ListingStatus
);

-- Requests Table
CREATE TABLE Requests (
    RequestID SERIAL PRIMARY KEY,
    TeacherID INTEGER REFERENCES Users(UserID),
    ItemID INTEGER REFERENCES Items(ItemID),
    RequestDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status RequestStatus
);

-- Messages Table
CREATE TABLE Messages (
    MessageID SERIAL PRIMARY KEY,
    SenderID INTEGER REFERENCES Users(UserID),
    RecipientID INTEGER REFERENCES Users(UserID),
    MsgTxt TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GenerateReport Table
CREATE TABLE GenerateReport (
    ReportID SERIAL PRIMARY KEY,
    ReporterID INTEGER REFERENCES Users(UserID),
    ReportContent TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Indexes (as before, with additional ones if needed)
CREATE INDEX idx_items_zipcode ON Items(ZipCode);
CREATE INDEX idx_items_itemtype ON Items(ItemType);
CREATE INDEX idx_users_email ON Users(Email);
CREATE INDEX idx_messages_sender ON Messages(SenderID);
CREATE INDEX idx_messages_recipient ON Messages(RecipientID);
