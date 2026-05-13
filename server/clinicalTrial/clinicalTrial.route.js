const express = require("express");
const ClinicalTrialController = require('./clinicalTrial.controller')
const ParticipantRoutes = require('./participant/participant.route')
const protectRoute = require("../middleware/protect.middleware")
const router = express.Router();

router.post(
    "/",
    protectRoute,
    ClinicalTrialController.createNewTrial
)

router.post(
    "/gql",
    ClinicalTrialController.getAllTrials
)

router.delete(
    "/:id",
    protectRoute,
    ClinicalTrialController.deleteTrialById
)

router.patch(
    "/:id",
    protectRoute,
    ClinicalTrialController.updateClinicalTrialById
)

router.use("/:trialId/participant", ParticipantRoutes)

module.exports = router;