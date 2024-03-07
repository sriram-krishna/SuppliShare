const database = require('../config/databaseConfig');

// Get a user by B2C Object ID
exports.getUserByB2CObjectId = async (b2cObjectId) => {
    const result = await database.query('SELECT * FROM users WHERE b2c_object_id = $1', [b2cObjectId]);
    return result.rows[0];
};

// Create a new user profile after authentication from B2C
exports.createUserProfile = async (b2cObjectId, username, email) => {
    const result = await database.query('INSERT INTO users (b2c_object_id, username, email) VALUES ($1, $2, $3) RETURNING *', [b2cObjectId, username, email]);
    return result.rows[0];
};

// Update user's profile (as an example of an update operation)
exports.updateUserProfile = async (b2cObjectId, username, email) => {
    const result = await database.query('UPDATE users SET username = $1, email = $2 WHERE b2c_object_id = $3 RETURNING *', [username, email, b2cObjectId]);
    return result.rows[0];
};

// (Optional) Delete a user profile by B2C Object ID
exports.deleteUserByB2CObjectId = async (b2cObjectId) => {
    const result = await database.query('DELETE FROM users WHERE b2c_object_id = $1 RETURNING *', [b2cObjectId]);
    return result.rows[0];
};
