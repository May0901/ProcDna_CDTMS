const ClinicalTrial = require('./clinicalTrial.model');
const Participant = require('./participant/participant.model');

exports.createNewTrial = async (trialData) => {
    const clinicalTrial = await ClinicalTrial.create(trialData);
    return clinicalTrial.id;
}

exports.getAllTrials = async () => {
    const clinicalTrials = await ClinicalTrial.findAll({
        include: [{
            model: Participant,
            as: "participants"
        }]
    });

    return clinicalTrials;
}

exports.deleteTrialById = async (id) => {
    const rowsDeleted = await ClinicalTrial.destroy({
        where: {
            id
        }
    });
    return rowsDeleted;
}

exports.updateTrialById = async (id, data) => {
    const clincalTrial = await ClinicalTrial.findByPk(id);
    if (!clincalTrial)
        return false
    for (const key in data) {
        clincalTrial[key] = data[key]
    }
    await clincalTrial.save();
    return true;
}