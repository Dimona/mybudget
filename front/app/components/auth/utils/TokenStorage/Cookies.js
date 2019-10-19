import Cookies from 'js-cookie';

export default class TokenStorageCookies {
    /**
     * Returns key
     *
     * @return {string}
     */
    static get key() {
        return 'token';
    }

    /**
     * Set token
     *
     * @param {string} value
     */
    static set(value) {
        Cookies.set(TokenStorageCookies.key, value);
    }

    /**
     * Get token
     *
     * @abstract
     * @return {string}
     */
    static get() {
        return Cookies.get(TokenStorageCookies.key);
    }

    /**
     * Remove token
     *
     * @abstract
     */
    static remove() {
        Cookies.remove(TokenStorageCookies.key);
    }
}
