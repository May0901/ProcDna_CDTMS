import { createBrowserRouter, redirect } from "react-router"
import Dashboard from "../pages/Dashboard"
import LoginPage from "../pages/LoginPage";
import AppLayout from "../layouts/AppLayout";
import { fetchClinicalTrials } from "../services/api"
import ClinicalTrialDetailPage from "../pages/ClinicalTrialDetailPage";
import { useAuthStore } from "../store";
import { jwtDecode } from "jwt-decode"
import NotFound from "../pages/NotFound";

// Loader function to check if user is authenticated or not.
// If not authenticated redirect user to login page
const checkSigninLoader = () => {
    const authToken = localStorage.getItem("token");
    // No token
    if (!authToken) {
        return redirect("/signin");
    }

    try {
        // Decode token
        const user = jwtDecode(authToken);
        // Save auth state
        useAuthStore.setState({
            user,
            authState: true,
        });

        return null;
    } catch (err) {
        console.error('Error in loader:', err)
        localStorage.removeItem("token");
        redirect("/signin");
    }
}

// Redirect authenticated users away from signin
const signinLoader = () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) return null;
    try {
        const _ = jwtDecode(authToken);
        redirect("/dashboard");
    } catch {
        localStorage.removeItem("token");
        return null;
    }
};

// App routes
const appRouter = createBrowserRouter([
    {
        path: "/",
        Component: AppLayout,
        children: [
            {
                index: true,
                loader: () => redirect("/dashboard"),
            },
            {
                path: "/dashboard",
                loader: async () => {
                    checkSigninLoader();
                    return fetchClinicalTrials();
                },
                Component: Dashboard,
            },
            {
                path: "/dashboard/:id",
                loader: checkSigninLoader,
                Component: ClinicalTrialDetailPage
            },
            {
                path: "/signin",
                loader: signinLoader,
                Component: LoginPage
            },
            {
                path: "*", //catch all route
                Component: NotFound
            }
        ]
    }
])

export default appRouter;