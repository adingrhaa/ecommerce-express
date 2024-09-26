import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getAllUser= async (req, res) => {
    try {
        const response = await User.findAll({
            where: {
                role: 'member'
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserByid = async(req, res) =>{
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) =>{
    const {fullname, country, city, gender, detail_alamat, no_hp, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        const hashPassword = await argon2.hash(password);
        await User.create({
            fullname: fullname,
            country: country,
            city: city,
            gender: gender,
            detail_alamat: detail_alamat,
            no_hp: no_hp,
            email: email,
            password: hashPassword,
            role: 'member'
        });
        res.status(201).json({msg: "Register berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async(req, res) =>{
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
            role: 'member'
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

export const deleteUser = async(req, res) =>{
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


