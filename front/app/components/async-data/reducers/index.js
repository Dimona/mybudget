import produce from 'immer';
import nullfined from 'nullfined';

import {
    ASYNC_FIRING,
    ASYNC_STATE,
    ASYNC_INDEX,
    ASYNC_INDEX_FAILURE,
    ASYNC_INDEX_SUCCESS,
    ASYNC_STORE,
    ASYNC_STORE_SUCCESS,
    ASYNC_STORE_FAILURE,
    ASYNC_UPDATE,
    ASYNC_UPDATE_SUCCESS,
    ASYNC_UPDATE_FAILURE,
    ASYNC_DESTROY,
    ASYNC_DESTROY_SUCCESS,
    ASYNC_DESTROY_FAILURE
} from '../constants';

export const INITIAL_STATE = {
    data: undefined,
    loading: false,
    firing: false
};

export default function asyncReducer(state = INITIAL_STATE, { type, payload = INITIAL_STATE }) {
    return produce(state, draft => {
        switch (type) {
            case ASYNC_STATE:
                draft = { ...draft, ...payload };
                break;
            case ASYNC_FIRING:
                draft.firing = !state.firing;
                break;
            case ASYNC_INDEX:
            case ASYNC_STORE:
            case ASYNC_UPDATE:
            case ASYNC_DESTROY:
                draft.loading = true;
                break;
            case ASYNC_INDEX_SUCCESS:
                draft.loading = false;
                draft.data = nullfined(payload);
                break;
            case ASYNC_STORE_SUCCESS:
            case ASYNC_UPDATE_SUCCESS:
            case ASYNC_DESTROY_SUCCESS:
                draft.loading = false;
                draft.firing = !state.firing;
                break;
            case ASYNC_INDEX_FAILURE:
            case ASYNC_STORE_FAILURE:
            case ASYNC_UPDATE_FAILURE:
            case ASYNC_DESTROY_FAILURE:
                draft.loading = false;
                break;
        }
    });
}
