import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (err) {
            throw err;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (err) {
            throw err;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (err) {
            return null; // Return null if the user is not logged in
        }
    }

    async isLoggedIn() {
        const user = await this.getCurrentUser();
        return !!user; // Returns true if user exists, false otherwise
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (err) {
            throw err;
        }
    }
}

const authService = new AuthService();
export default authService;
