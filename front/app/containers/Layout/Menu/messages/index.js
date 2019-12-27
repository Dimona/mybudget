import { defineMessages } from 'react-intl';

export const scope = 'menu';

export default defineMessages({
    headerDashboard: {
        id: `${scope}.header.dashboard`,
        defaultMessage: `Dashboard`
    },
    headerSettings: {
        id: `${scope}.header.settings`,
        defaultMessage: `Settings`
    },
    headerCategories: {
        id: `${scope}.header.categories`,
        defaultMessage: `Categories`
    },
    headerTest: {
        id: `${scope}.header.test`,
        defaultMessage: `Test`
    }
});
