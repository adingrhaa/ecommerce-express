import { validationResult } from 'express-validator';
import CheckoutInformation from '../models/CheckoutInformationModel.js';
import CheckoutHistory from '../models/CheckoutHistoryModel.js';

export const getAllCheckoutInformation = async (req, res) => {
    try {
        const response = await CheckoutInformation.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getCheckoutInformationByid = async (req, res) => {
    try {
        const response = await CheckoutInformation.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createCheckoutInformation = async (req, res) => {
    const {
        fullname, email, no_hp, provinsi, kota_kabupaten, kecamatan, kode_pos, detail, detail_lainnya, payment_method, delivery,
        ringkasan_belanja, biaya_pengiriman, biaya_admin, total_harga
    } = req.body;
    const gambar = req.file ? req.file.filename : null;

    // Validasi input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let validatedRingkasanBelanja = ringkasan_belanja.map(item => ({
        id_produk: item.id_produk,
        nama_barang: item.nama_barang,
        jumlah: item.jumlah
    }));

    try {
        // Membuat CheckoutInformation
        const checkoutInformation = await CheckoutInformation.create({
            fullname,
            email,
            no_hp,
            gambar,
            provinsi,
            kota_kabupaten, // Pastikan ini sesuai dengan nama kolom di model dan database
            kecamatan,
            kode_pos,
            detail,
            detail_lainnya,
            payment_method,
            delivery,
            ringkasan_belanja: JSON.stringify(validatedRingkasanBelanja),
            biaya_pengiriman,
            biaya_admin,
            total_harga
        });

        // Membuat CheckoutHistory
        await createCheckoutHistory(checkoutInformation, validatedRingkasanBelanja);

        // Decode ringkasan_belanja
        const ringkasanBelanjaArray = JSON.parse(checkoutInformation.ringkasan_belanja);
        checkoutInformation.ringkasan_belanja = ringkasanBelanjaArray;

        // Respon
        res.status(201).json({ msg: "Checkout Information created", data: checkoutInformation });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createCheckoutHistory = async (checkoutInformation, validatedRingkasanBelanja) => {
    try {
        await CheckoutHistory.create({
            id_member: checkoutInformation.id_member,
            no_hp: checkoutInformation.no_hp,
            provinsi: checkoutInformation.provinsi,
            kota_kabupaten: checkoutInformation.kota_kabupaten,
            kecamatan: checkoutInformation.kecamatan,
            kode_pos: checkoutInformation.kode_pos,
            detail: checkoutInformation.detail,
            detail_lainnya: checkoutInformation.detail_lainnya,
            ringkasan_belanja: validatedRingkasanBelanja, // Simpan langsung sebagai array
            total_harga: checkoutInformation.total_harga,
            payment_method: checkoutInformation.payment_method,
            biaya_pengiriman: checkoutInformation.biaya_pengiriman,
            biaya_admin: checkoutInformation.biaya_admin,
            delivery: checkoutInformation.delivery,
            status: checkoutInformation.status
        });
    } catch (error) {
        throw new Error('Failed to create CheckoutHistory: ' + error.message);
    }
};