import { useCallback } from 'react';
import { useIntl } from 'react-intl';

import snackbars from '../utils';
import messages from '../messages';

export default function useMessages({ entity }) {
    const { formatMessage } = useIntl();

    const successStore = useCallback(() => snackbars.success(formatMessage(messages.successStore, { entity })), [
        entity
    ]);
    const successUpdate = useCallback(() => snackbars.success(formatMessage(messages.successUpdate, { entity })), [
        entity
    ]);
    const successDestroy = useCallback(() => snackbars.success(formatMessage(messages.successDestroy, { entity })), [
        entity
    ]);

    return {
        successStore,
        successUpdate,
        successDestroy
    };
}
