import { useSelector } from 'react-redux';

import { isAuthorizedSelector, tokenSelector, userSelector } from '../selectors';

export default function useAuth() {
    return {
        authToken: useSelector(tokenSelector),
        authUser: useSelector(userSelector),
        isAuthorized: useSelector(isAuthorizedSelector)
    };
}
