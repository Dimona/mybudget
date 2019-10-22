import { useEffect, useReducer, useCallback } from 'react';

import { ApiClient } from 'config/axios';
import objectToFormData from 'utils/objectToFormData';
import asyncReducer, { INITIAL_STATE } from '../reducers';
import {
    ASYNC_FIRING,
    ASYNC_STATE,
    ASYNC_INDEX,
    ASYNC_INDEX_SUCCESS,
    ASYNC_INDEX_FAILURE,
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

export default function useAsync({ endpoint, autoload = false, params = [] }) {
    const [state, dispatch] = useReducer(asyncReducer, INITIAL_STATE);

    const setState = useCallback(payload => dispatch({ type: ASYNC_STATE, payload }), []);
    const firingAction = useCallback(() => dispatch({ type: ASYNC_FIRING }), []);

    const indexAction = useCallback(async (filter = {}) => {
        dispatch({ type: ASYNC_INDEX });
        try {
            const { data = {} } = await ApiClient.get(endpoint, { params: { filter } });
            dispatch({ type: ASYNC_INDEX_SUCCESS, payload: data });
        } catch (e) {
            dispatch({ type: ASYNC_INDEX_FAILURE });
        }
    }, []);

    const storeAction = useCallback(async (form = {}) => {
        dispatch({ type: ASYNC_STORE });
        try {
            const { data = {} } = await ApiClient.post(endpoint, objectToFormData(form, { indices: true }), {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            dispatch({ type: ASYNC_STORE_SUCCESS, payload: data });
        } catch (e) {
            dispatch({ type: ASYNC_STORE_FAILURE });
            throw e;
        }
    }, []);

    const updateAction = useCallback(async ({ id, ...form }) => {
        dispatch({ type: ASYNC_UPDATE });
        try {
            const { data = {} } = await ApiClient.patch(
                `${endpoint}/${id}`,
                objectToFormData(form, { indices: true }),
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            dispatch({ type: ASYNC_UPDATE_SUCCESS, payload: data });
        } catch (e) {
            dispatch({ type: ASYNC_UPDATE_FAILURE });
            throw e;
        }
    }, []);

    const destroyAction = useCallback(async id => {
        dispatch({ type: ASYNC_DESTROY });
        try {
            const { data = {} } = await ApiClient.delete(`${endpoint}/${id}`);
            dispatch({ type: ASYNC_DESTROY_SUCCESS, payload: data });
        } catch (e) {
            dispatch({ type: ASYNC_DESTROY_FAILURE });
            throw e;
        }
    }, []);

    useEffect(
        () => {
            if (autoload) {
                indexAction(...params);
            }
        },
        [autoload]
    );

    return {
        state,
        setState,
        firingAction,
        indexAction,
        storeAction,
        updateAction,
        destroyAction
    };
}
