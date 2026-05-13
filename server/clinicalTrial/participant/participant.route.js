const express = require('express');
const ParticipantContoller = require("./participant.controller")
const protectRoute = require("../../middleware/protect.middleware")
const router = express.Router({ mergeParams: true });

router.post(
    "/",
    protectRoute,
    ParticipantContoller.createParticipant
)

router.get(
    "/",
    ParticipantContoller.getParticipants
)

router.delete(
    "/:participantId",
    protectRoute,
    ParticipantContoller.deleteParticipantById
)

module.exports = router