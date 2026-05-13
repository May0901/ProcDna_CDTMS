const express = require("express");
const ClinicalTrialController = require('./clinicalTrial.controller')
const ParticipantRoutes = require('./participant/participant.route')
const router = express.Router();


router.post(
    "/",
    (req, res, next) => {
        if (req.user.role === "admin") {
            return next();
        }

        return res.json({
            message: "Action not allowed"
        })
    },
    ClinicalTrialController.createNewTrial
)

router.post(
    "/gql",
    ClinicalTrialController.getAllTrials
)

router.delete(
    "/:id",
    ClinicalTrialController.deleteTrialById
)

router.patch(
    "/:id",
    ClinicalTrialController.updateClinicalTrialById
)

router.use("/:trialId/participant", ParticipantRoutes)

module.exports = router;