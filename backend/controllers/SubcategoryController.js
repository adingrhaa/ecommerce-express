import Subcategory from "../models/SubcategoryModel.js";


export const getAllSubcategory= async (req, res) => {
    try {
        const response = await Subcategory.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getSubcategoryByid = async(req, res) =>{
    try {
        const response = await Subcategory.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createSubcategory = async (req, res) => {
    const { id_kategori, nama_subkategori, deskripsi } = req.body;
    const gambar = req.file ? req.file.filename : null;
    try {
        await Subcategory.create({
            id_kategori: id_kategori,
            nama_subkategori: nama_subkategori,
            deskripsi: deskripsi,
            gambar: gambar,
        });
        res.status(201).json({ msg: "Subcategory created" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateSubcategory = async (req, res) => {
    const { id_kategori, nama_subkategori, deskripsi } = req.body;
    const gambar = req.file ? req.file.filename : null;

    try {
        const subkategori = await Subcategory.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!subcategory) {
            return res.status(404).json({ msg: "Subcategory not found" });
        }

        await subkategori.update({
            id_kategori: id_kategori,
            nama_subkategori: nama_subkategori,
            deskripsi: deskripsi,
            gambar: gambar || subkategori.gambar,
        });

        res.status(200).json({ msg: "Subcategory updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteSubcategory = async (req, res) => {
    const subkategori = await Subcategory.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!subcategory) return res.status(404).json({ msg: "Subcategory tidak ditemukan" });
    try {
        // Hapus gambar dari direktori uploads jika ada
        if (subkategori.gambar) {
            const imagePath = path.join('uploads', subkategori.gambar);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus gambar:', err);
                }
            });
        }
        await Subcategory.destroy({
            where: {
                id: subkategori.id
            }
        });
        res.status(200).json({ msg: "Subcategory Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}