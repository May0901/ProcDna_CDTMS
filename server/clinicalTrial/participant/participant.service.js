const Participant = require("./participant.model");

exports.createParticipant = async (participantData) => {
    const participant = await Participant.create(participantData);
    return participant.id;
}

exports.deleteParticipantById = async (id) => {
    const rowsDeleted = await Participant.destroy({
        where: {
            id
        }
    });
    return rowsDeleted;
}