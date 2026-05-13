
const { graphql } = require('graphql');
const ClinicalTrialService = require('./clinicalTrial.service');
const clinicalTrialSchema = require('./clinicalTrial.schema');

// Resolver for Graphql
const root = {
    clinicalTrials: async () => {
        const data = await ClinicalTrialService.getAllTrials();
        return data;
    }
}

// Create New Clinical Trial
exports.createNewTrial = async (req, res) => {
    try {
        const trialData = req.body;
        const newTrialId = await ClinicalTrialService.createNewTrial(trialData);

        return res.json({
            success: true,
            trialId: newTrialId,
            message: "Created new clinical trial successfully"
        })
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }
}

// GraphQL endpoint 
// Return all clinical trials and paticipants part of it.
exports.getAllTrials = async (req, res) => {
    try {
        const { query } = req.body;

        const result = await graphql({
            schema: clinicalTrialSchema,
            source: query,
            rootValue: root,
        })

        return res.json({
            success: true,
            result,
            mesasge: "Fetched clinical trials successfully"
        })
    } catch (err) {
        return res.json({ success: false, message: err.message })
    }
}

// Delete clinical trial by ID
exports.deleteTrialById = async (req, res) => {
    try {
        const id = req.params.id;
        const count = await ClinicalTrialService.deleteTrialById(id);
        return res.json({
            success: true,
            deletedCount: count,
            message: "Deleted clinical trial successfully"
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}

// update clinical trial by ID
exports.updateClinicalTrialById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const done = await ClinicalTrialService.updateTrialById(id, data);
        return res.json({
            success: true,
            message: "Clinical trail updated successfully"
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}