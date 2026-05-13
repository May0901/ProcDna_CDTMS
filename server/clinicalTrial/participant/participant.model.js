const { DataTypes } = require('sequelize');
const pgsql = require('../../application/pgsql');
const ClinicalTrial = require('../clinicalTrial.model');

const Participant = pgsql.define('Participant', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    location: DataTypes.STRING,
    enrollment_status: {
        type: DataTypes.ENUM,
        values: ["Active", "Pending", "Withdrawn"],
        defaultValue: "Active"
    },
    clinicalTrialId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ClinicalTrials',
            key: 'id',
        }
    }
});

ClinicalTrial.hasMany(Participant, {
    foreignKey: "clinicalTrialId",
    as: "participants",
    onDelete: "CASCADE"
});

Participant.belongsTo(ClinicalTrial, {
    foreignKey: "clinicalTrialId"
});

module.exports = Participant;