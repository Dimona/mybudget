import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import withStyles from '@material-ui/core/styles/withStyles';
import PubSub from 'pubsub-js';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import styles from '../styles';
import { SNACKBAR_SUBMISSION } from '../constants';

export default
@withSnackbar
@withStyles(styles)
class SnackbarPubSub extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        enqueueSnackbar: PropTypes.func.isRequired,
        closeSnackbar: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const { enqueueSnackbar, closeSnackbar, classes } = props;

        PubSub.subscribe(SNACKBAR_SUBMISSION, (msg, { message = '', ...options }) => {
            enqueueSnackbar(message, {
                ...options,
                action: key => (
                    <IconButton key="close" aria-label="Close" color="inherit" onClick={() => closeSnackbar(key)}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                )
            });
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(SNACKBAR_SUBMISSION);
    }

    render() {
        return null;
    }
}
