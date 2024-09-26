import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Product = db.define('products',{
    id_kategori:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    id_subkategori:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nama_barang:{
        type: DataTypes.STRING,
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
    deskripsi:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    harga:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
            min: 0
        }
    },
    diskon:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    bahan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    tags:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    sku:{
        type: DataTypes.STRING,
        allowNull: true
    },
    ukuran:{
        type: DataTypes.STRING,
        allowNull: true
    },
    warna:{
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    freezeTableName: true
});

export default Product;