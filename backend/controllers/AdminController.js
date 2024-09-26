import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getAllAdmin= async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['fullname', 'email', 'role'],
            where: {
                role: 'admin'
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAdminByid = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes: ['fullname', 'email', 'role'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createAdmin = async(req, res) =>{
    const {fullname, email, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        const hashPassword = await argon2.hash(password);
        await User.create({
            fullname: fullname,
            country: 'default',
            city: 'default',
            gender: 'default',
            detail_alamat: 'default',
            no_hp: 'default',
            email: email,
            password: hashPassword,
            role: 'admin'
        });
        res.status(201).json({msg: "Register berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateAdmin = async(req, res) =>{
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {fullname, country, city, gender, detail_alamat, no_hp, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await User.update({
            fullname: fullname,
            country: country,
            city: city,
            gender: gender,
            detail_alamat: detail_alamat,
            no_hp: no_hp,
            email: email,
            password: hashPassword,
            role: 'admin'
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteAdmin = async(req, res) =>{
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}