import produce from 'immer';
import { handleActions } from 'redux-actions';

import { DEFAULT_LOCALE } from 'i18n';
import { changeAction } from '../actions';

export const INITIAL_STATE = {
    locale: DEFAULT_LOCALE
};

export default {
    key: 'language',
    reducer: handleActions(
        {
            [changeAction]: (state, { payload: { locale = DEFAULT_LOCALE } = {} }) =>
                produce(state, draft => {
                    draft.locale = locale
                })
        },
        INITIAL_STATE
    )
};
