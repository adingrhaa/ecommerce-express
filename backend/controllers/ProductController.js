import Product from "../models/ProductModel.js";
import fs from 'fs';
import path from 'path';

export const getAllProduct = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getProductByid = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createProduct = async (req, res) => {
    const { id_kategori, id_subkategori, nama_barang, deskripsi, harga, diskon, bahan, tags, sku, ukuran, warna } = req.body;
    const gambar = req.file ? req.file.filename : null;
    try {
        await Product.create({
            id_kategori: id_kategori,
            id_subkategori: id_subkategori,
            nama_barang: nama_barang,
            gambar: gambar,
            deskripsi: deskripsi,
            harga: harga,
            diskon: diskon,
            bahan: bahan,
            tags: tags,
            sku: sku,
            ukuran: ukuran,
            warna: warna
        });
        res.status(201).json({ msg: "Product created" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id_kategori, id_subkategori, nama_barang, deskripsi, harga, diskon, bahan, tags, sku, ukuran, warna } = req.body;
    const gambar = req.file ? req.file.filename : null;

    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!product) return res.status(404).json({ msg: "Product tidak ditemukan" });

        const updatedProduct = {
            id_kategori: id_kategori,
            id_subkategori: id_subkategori,
            nama_barang: nama_barang,
            deskripsi: deskripsi,
            harga: harga,
            diskon: diskon,
            bahan: bahan,
            tags: tags,
            sku: sku,
            ukuran: ukuran,
            warna: warna,
        };

        if (gambar) {
            if (product.gambar) {
                const oldImagePath = path.join('uploads', product.gambar);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Gagal menghapus gambar lama:', err);
                    }
                });
            }
            updatedProduct.gambar = gambar;
        }

        await Product.update(updatedProduct, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ msg: "Product updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "Product tidak ditemukan" });
    try {
        // Hapus gambar dari direktori uploads jika ada
        if (product.gambar) {
            const imagePath = path.join('uploads', product.gambar);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus gambar:', err);
                }
            });
        }
        await Product.destroy({
            where: {
                id: product.id
            }
        });
        res.status(200).json({ msg: "Product Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
