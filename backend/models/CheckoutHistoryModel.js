import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const CheckoutHistory = db.define('checkout_histories', { // Nama tabel di Laravel adalah 'checkout_histories'
    id_member: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    },
    ringkasan_belanja: {
        type: DataTypes.JSON, // Menggunakan tipe JSON
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    total_harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    }
}, {
    freezeTableName: true,
    timestamps: true // Menggunakan timestamps untuk createdAt dan updatedAt
});

export default CheckoutHistory;
