const pool = require('../db');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const {full_name, email, age } = req.body;
        const result = await pool.query(
            'INSERT INTO users (full_name, email, age) VALUES ($1, $2, $3) RETURNING *',
            [full_name, email, age]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {full_name, email, age } = req.body;
        const result = await pool.query(
            'UPDATE users SET full_name = $1, email = $2, age = $3 WHERE user_id = $4 RETURNING *',
            [full_name, email, age, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
