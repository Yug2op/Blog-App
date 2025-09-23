import apiService from './apiService';

class AuthService {

    async createAccount({ email, password, name }) {
        try {
            const response = await apiService.register({ name, email, password });
            return response.data; // Return user data from backend
        } catch (err) {
            throw err.response ? err.response.data.message : err.message;
        }
    }

    async login({ email, password }) {
        try {
            const response = await apiService.login({ email, password });
            // Backend now sets HTTP-only cookie, no token in response body
            const user = await this.getCurrentUser(); // Fetch user data after login
            return user; // Return user data
        } catch (err) {
            throw err.response ? err.response.data.message : err.message;
        }
    }

    async getCurrentUser() {
        try {
            const response = await apiService.getCurrentUser();
            return response.data; // Return user data if authenticated
        } catch (err) {
            // If not authenticated or token expired, backend will return 401
            return null;
        }
    }

    async logout() {
        try {
            await apiService.logout();
            return true;
        } catch (err) {
            throw err.response ? err.response.data.message : err.message;
        }
    }

    // Helper for checking if logged in (will use getCurrentUser)
    async isLoggedIn() {
        const user = await this.getCurrentUser();
        return !!user; // Returns true if user data exists, false otherwise
    }
}

const authService = new AuthService();
export default authService;
