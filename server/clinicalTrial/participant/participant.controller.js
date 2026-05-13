const ParticipantService = require("./participant.service")

exports.createParticipant = async (req, res) => {
    try {
        const participantData = req.body;
        const clinicalTrialId = +req.params.trialId;
        const participantId = await ParticipantService.createParticipant({
            clinicalTrialId,
            ...participantData
        });
        return res.json({
            success: true,
            participantId,
            message: "Added new participant successfully"
        })
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }
}

exports.getParticipants = async (req, res) => {
    try {
        const participants = await ParticipantService.getParticipants();
        return res.json({
            participants
        })
    }
    catch (err) {
        return res.json({ message: err.message })
    }
};

exports.deleteParticipantById = async (req, res) => {
    try {
        const id = req.params.participantId;
        const count = await ParticipantService.deleteParticipantById(id);
        return res.json({
            success: true,
            deletedCount: count,
            message: "Deleted Participant successfully"
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}