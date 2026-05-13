const { buildSchema } = require("graphql")

module.exports = buildSchema(`
    type Participant {
        id: ID
        name: String
        age: Int
        gender: String
        enrollment_status: String
        location: String
        trialId: ID
    }

    type ClinicalTrial {
        id: ID
        title: String
        phase: String
        status: String
        location: String
        therapeutic_area: String
        objective: String
        start_date: String
        participants: [Participant]
    }

     type Query {
        clinicalTrials: [ClinicalTrial]
    }
`);