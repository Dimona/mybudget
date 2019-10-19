import { defineMessages } from 'react-intl';

export const scope = 'messages';

export default defineMessages({
    successStore: {
        id: `${scope}.success.store`,
        defaultMessage: 'The {entity} has been successfully created'
    },
    successUpdate: {
        id: `${scope}.success.update`,
        defaultMessage: 'The {entity} has been successfully updated'
    },
    successDestroy: {
        id: `${scope}.success.destroy`,
        defaultMessage: 'The {entity} has been successfully deleted'
    }
});
