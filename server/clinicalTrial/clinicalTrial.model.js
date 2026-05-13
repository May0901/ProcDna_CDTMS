const { DataTypes, DATE } = require('sequelize');
const pgsql = require("../application/pgsql");

const ClinicalTrial = pgsql.define("ClinicalTrial", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.STRING,
    phase: DataTypes.STRING,
    objective: DataTypes.STRING,
    therapeutic_area: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM,
        values: ["Completed", "Active"],
        defaultValue: "Active"
    },
    location: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY
});

module.exports = ClinicalTrial;