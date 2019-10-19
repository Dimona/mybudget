import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import withStyles from '@material-ui/core/styles/withStyles';

import SnackbarPubSub from './SnackbarPubSub';
import styles from '../styles';

export default
@withStyles(styles)
class Snackbars extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired
    };

    render() {
        const {
            children,
            classes: { root, action, message }
        } = this.props;

        return (
            <SnackbarProvider
                maxSnack={3}
                preventDuplicate
                autoHideDuration={2000}
                dense={false}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                ContentProps={{
                    classes: {
                        root,
                        action,
                        message
                    }
                }}
            >
                {children}
                <SnackbarPubSub />
            </SnackbarProvider>
        );
    }
}
