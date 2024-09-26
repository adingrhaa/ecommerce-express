import Cart from "../models/CartModel.js";
import fs from 'fs';
import path from 'path';

export const getAllCart= async (req, res) => {
    try {
        const response = await Cart.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getCartById = async (req, res) => {
    const { id_member, id_produk } = req.query;

    try {
        let carts;
        if (id_member && id_produk) {
            // Jika kedua parameter ada, cari berdasarkan keduanya
            carts = await Cart.findAll({
                where: {
                    id_member: id_member,
                    id_produk: id_produk
                }
            });
        } else if (id_member) {
            // Jika hanya id_member ada, cari berdasarkan id_member
            carts = await Cart.findAll({
                where: {
                    id_member: id_member
                }
            });
        } else if (!id_member && !id_produk) {
            // Jika tidak ada parameter, tampilkan semua data
            carts = await Cart.findAll();
        } else {
            // Jika hanya salah satu parameter yang ada, kembalikan error
            return res.status(400).json({ error: 'Both id_member and id_produk are required' });
        }

        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createCart = async (req, res) => {
    const { id_produk, id_member, nama_barang, harga } = req.body;
    const gambar = req.file ? req.file.filename : null;
    try {
        await Cart.create({
            id_produk: id_produk,
            id_member: id_member,
            nama_barang: nama_barang,
            gambar: gambar,
            harga: harga
        });
        res.status(201).json({ msg: "Cart created" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateCart = async (req, res) => {
    const { id_produk, id_member, nama_barang, harga } = req.body;
    const gambar = req.file ? req.file.filename : null;

    try {
        const cart = await Cart.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!cart) return res.status(404).json({ msg: "Cart tidak ditemukan" });

        const updatedCart = {
            id_produk: id_produk,
            id_member: id_member,
            nama_barang: nama_barang,
            harga: harga,
        };

        if (gambar) {
            if (cart.gambar) {
                const oldImagePath = path.join('uploads', cart.gambar);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Gagal menghapus gambar lama:', err);
                    }
                });
            }
            updatedCart.gambar = gambar;
        }

        await Cart.update(updatedCart, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ msg: "Cart updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteCart = async (req, res) => {
    const { id } = req.params;
    const { id_member, id_produk } = req.query;

    try {
        if (id) {
            // Hapus berdasarkan id
            const cart = await Cart.findByPk(id);

            if (cart) {
                // Jika ingin menghapus gambar, uncomment baris berikut
                // if (cart.gambar) {
                //     fs.unlinkSync(path.join('public/images', cart.gambar));
                // }

                await cart.destroy();
                return res.status(200).json({ message: 'Cart deleted successfully' });
            } else {
                return res.status(404).json({ error: 'Cart not found' });
            }
        } else {
            if (id_member && id_produk) {
                // Cari semua data dengan id_member dan id_produk yang sesuai
                const carts = await Cart.findAll({
                    where: {
                        id_member: id_member,
                        id_produk: id_produk
                    }
                });

                if (carts.length > 0) {
                    for (const cart of carts) {
                        // Jika ingin menghapus gambar, uncomment baris berikut
                        // if (cart.gambar) {
                        //     fs.unlinkSync(path.join('public/images', cart.gambar));
                        // }
                        await cart.destroy();
                    }
                    return res.status(200).json({ message: 'Carts deleted successfully' });
                } else {
                    return res.status(404).json({ error: 'Carts not found' });
                }
            } else {
                // Jika tidak ada parameter atau parameter tidak lengkap, kembalikan pesan error
                return res.status(400).json({ error: 'Both id_member and id_produk are required' });
            }
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};