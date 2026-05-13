import axios from 'axios';
const getAllClinicalTrialsQuery = `
    query {
        clinicalTrials {
            id
            title
            objective
            phase
            start_date
            therapeutic_area,
            status
            location
            participants {
                id
                name
                age
                gender
                location
                enrollment_status
            }
        }
    }
`
export const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem('token');
        if (authToken) {
            config.headers['Authorization'] = `${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // will cause full reload
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export const fetchClinicalTrials = async () => {
    try {
        const response = await api.post("/trial/gql",
            {
                query: getAllClinicalTrialsQuery
            }
        )

        const clinicalTrials = response.data?.result.data.clinicalTrials;

        return {
            success: response.data?.success,
            clinicalTrials: clinicalTrials,
            message: response.data?.message
        };
    } catch (err) {
        console.error("Error in fetchClinicalTrials:", err);
        return {
            success: false,
            message:
                err?.response?.data?.message ||
                "Failed to fetch clinical trials",
            error: err
        };
    }
}

export const createNewClinicalTrial = async (clinicalTrialData) => {
    try {
        const response = await api.post(
            "/trial",
            clinicalTrialData
        );

        return {
            success: response.data?.success,
            trialId: response.data.trialId,
            message: response.data?.message
        };

    } catch (err) {
        console.error("Error in createNewClinicalTrial:", err);
        return {
            success: false,
            message:
                err?.response?.data?.message ||
                "Failed to create clinical trial",
            error: err
        };
    }
}

export const deleteClinicalTrialById = async (id) => {
    try {
        const response = await api.delete(
            `/trial/${id}`
        );

        return {
            success: response.data?.success,
            message: response.data?.message
        };

    } catch (err) {
        console.error("Error in deleteClinicalTrialById:", err);
        return {
            success: false,
            message:
                err?.response?.data?.message ||
                "Failed to delete clinical trial",
            error: err
        };
    }
}


export const addNewParticipant = async (trialId, participantData) => {
    try {
        const response = await api.post(
            `/trial/${trialId}/participant`,
            participantData
        );

        return {
            success: response.data?.success,
            trialId: response.data.participantId,
            message: response.data?.message
        };

    } catch (err) {
        console.error("Error in addNewParticipant:", err);
        return {
            success: false,
            message:
                err?.response?.data?.message ||
                "Failed to create new participant",
            error: err
        };
    }
}


export const deleteParticipantById = async (trialId, participantId) => {
    try {
        const response = await api.delete(
            `/trial/${trialId}/participant/${participantId}`
        );

        return {
            success: response.data?.success,
            message: response.data?.message
        };

    } catch (err) {
        console.error("Error in deleteClinicalTrialById:", err);
        return {
            success: false,
            message:
                err?.response?.data?.message ||
                "Failed to delete particpant",
            error: err
        };
    }
}

export const authenticateUser = async (creds) => {
    try {
        const response = await api.post(
            "/auth/signin",
            creds
        );

        return {
            success: response.data?.success,
            token: response.data?.token,
            user: response.data?.user,
            message: response.data?.message
        };
    }
    catch (err) {
        console.error("Error in authenticateUser", err)
        return {
            success: false,
            message:
                err?.response?.data?.message ||
                "Failed to authenicate user",
            error: err
        };
    }
}


export const updateClinicalTrial = async (trialId, data) => {
    try {
        const response = await api.patch(
            `/trial/${trialId}`,
            data
        );

        return {
            success: response.data?.success,
            message: response.data?.message
        };

    } catch (err) {
        console.error("Error in updateClinicalTrial:", err);
        return {
            success: false,
            message:
                err?.response?.data?.message ||
                "Failed to update clinical trial",
            error: err
        };
    }
}