import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CircularProgress } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { childrenType } from 'types';
import styles from '../styles';

function Loader({classes, loading, className = '', children = '', fullPage = true, notUnmount = false}) {
    return (
        <>
            {loading && (
                <div
                    className={cx(classes.loaderWrapper, className, {
                        [classes.loaderFullPageWrapper]: fullPage
                    })}
                >
                    <CircularProgress className={classes.loader} size={50} />
                </div>
            )}
            {(notUnmount || !loading) && children}
        </>
    )
}

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    className: PropTypes.string,
    children: childrenType,
    fullPage: PropTypes.bool,
    notUnmount: PropTypes.bool
};

export default withStyles(styles)(Loader)
