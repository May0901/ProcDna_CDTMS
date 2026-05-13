const express = require('express');
const ParticipantContoller = require("./participant.controller")
const router = express.Router({ mergeParams: true });

router.post(
    "/",
    (req, res, next) => {
        if (req.user.role === "admin") {
            next();
        }
        return res.json({
            message: "Action not allowed"
        })
    },
    ParticipantContoller.createParticipant
)

router.get(
    "/",
    ParticipantContoller.getParticipants
)

router.delete(
    "/:participantId",
    ParticipantContoller.deleteParticipantById
)

module.exports = router