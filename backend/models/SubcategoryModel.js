import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Subcategory = db.define('subcategories',{
    id_kategori:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nama_subkategori:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    deskripsi:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    gambar:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
},{
    freezeTableName: true
});

export default Subcategory;