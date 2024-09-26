import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import User from '../models/UserModel.js';
import BlacklistedToken from '../models/BlacklistedToken.js';

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'Email or password is wrong' });
        }

        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(401).json({ error: 'Email or password is wrong' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'secret-key',
            { expiresIn: '1h' }
        );

        // Simpan token ke tabel BlacklistedToken
        await BlacklistedToken.create({ token });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const logoutAdmin = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        // Hapus token dari tabel BlacklistedToken
        await BlacklistedToken.destroy({ where: { token } });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: { email: email }
        });

        if (!user || !await argon2.verify(user.password, password)) {
            return res.status(401).json({ error: 'Email or password is wrong' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'secret-key',
            { expiresIn: '1h' }
        );

        // Simpan token ke tabel BlacklistedToken
        await BlacklistedToken.create({ token });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const logoutUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        // Hapus token dari tabel BlacklistedToken
        await BlacklistedToken.destroy({ where: { token } });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const me = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.userId
            }
        });
        
        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        // Periksa apakah token masih terdaftar di BlacklistedToken
        const blacklistedToken = await BlacklistedToken.findOne({ where: { token: req.headers.authorization?.split(' ')[1] } });
        if (!blacklistedToken) {
            return res.status(403).json({ error: 'Token Expired' });
        }

        // Jika user adalah admin, kembalikan fullname, email, dan role saja
        if (user.role === 'admin') {
            const { id, fullname, email, role } = user;
            return res.status(200).json({ id, fullname, email, role });
        }
        
        // Jika bukan admin, kembalikan seluruh data user
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

