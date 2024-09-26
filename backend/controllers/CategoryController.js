import Category from "../models/CategoryModel.js";


export const getAllCategory= async (req, res) => {
    try {
        const response = await Category.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getCategoryByid = async(req, res) =>{
    try {
        const response = await Category.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createCategory = async (req, res) => {
    const { nama_kategori } = req.body;
    if (!nama_kategori) {
        return res.status(400).json({ msg: "nama_kategori is required" });
    }
    try {
        await Category.create({
            nama_kategori: nama_kategori
        });
        res.status(201).json({ msg: "Category created" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateCategory = async (req, res) => {
    const category = await Category.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!category) return res.status(404).json({ msg: "Category tidak ditemukan" });

    const { nama_kategori } = req.body;
    if (!nama_kategori) {
        return res.status(400).json({ msg: "nama_kategori is required" });
    }

    try {
        await Category.update({
            nama_kategori: nama_kategori
        }, {
            where: {
                id: category.id
            }
        });
        res.status(200).json({ msg: "Category Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteCategory = async(req, res) =>{
    const category = await Category.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!category) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await Category.destroy({
            where:{
                id: category.id
            }
        });
        res.status(200).json({msg: "Category Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
