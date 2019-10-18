/**
 * Asynchronously loads the component for FeaturePage
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import index from './index'

export default loadable(() => index, {
    fallback: <LoadingIndicator />
});
