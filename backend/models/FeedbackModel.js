import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Feedback = db.define('feedbacks',{
    id_member:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    id_product:{
        type: DataTypes.JSON,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    comment:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    gambar:{
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    freezeTableName: true
});

export default Feedback