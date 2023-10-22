const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (data) => {
    const userExists = await User.findOne({ email: data.email });
    if (userExists) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({ ...data, password: hashedPassword });
    await user.save();

    return user;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return { user, token };
};
