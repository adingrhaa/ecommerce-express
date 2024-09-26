import { validationResult, body } from 'express-validator';
import CheckoutHistory from '../models/CheckoutHistoryModel.js';

export const createCheckoutHistory = [
    // Validasi input menggunakan express-validator
    body('id_member').isInt().withMessage('id_member harus berupa integer dan ada di tabel members'),
    body('ringkasan_belanja').isArray().withMessage('ringkasan_belanja harus berupa array'),
    body('total_harga').isNumeric().withMessage('total_harga harus berupa angka'),

    async (req, res) => {
        // Ambil hasil validasi
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // Ambil data dari request
        const { id_member, ringkasan_belanja, total_harga } = req.body;

        try {
            // Ubah ringkasan_belanja menjadi JSON
            const requestData = {
                id_member,
                ringkasan_belanja: JSON.stringify(ringkasan_belanja),
                total_harga
            };

            // Simpan data ke database
            const checkoutHistory = await CheckoutHistory.create(requestData);

            // Kirim respon sukses
            res.status(201).json({ data: checkoutHistory });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
];
