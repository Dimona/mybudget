import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Zoom from '@material-ui/core/Zoom';
import messages from './messages';

const StyledTooltip = withStyles(theme => ({
    tooltip: {
        // backgroundColor: theme.palette.common.white,
        // color: 'rgba(0, 0, 0, 0.87)',
        // boxShadow: theme.shadows[1],
        fontSize: 14
    }
}))(Tooltip);

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}));

function Menu({ intl, minified = false, onMenuClick = () => {} }) {
    const { formatMessage } = intl;
    const classes = useStyles();
    const [openSettings, setOpenSettings] = useState(true);

    const menu = {
        dashboard: {
            title: formatMessage(messages.headerDashboard),
            Icon: DashboardIcon,
            route: '/dashboard'
        },
        settings: {
            title: formatMessage(messages.headerSettings),
            Icon: SettingsIcon,
            menu: {
                categories: {
                    title: formatMessage(messages.headerCategories),
                    route: '/options/categories',
                    Icon: AccountTreeIcon
                }
            }
        }
    };

    const handleSettings = () => {
        setOpenSettings(!openSettings);
    };

    const handleMenuClick = config => () => {
        onMenuClick(config);
    };

    const MenuItem = ({
        type,
        nestedOptions: { nested = false, onNestedClick = () => {}, nestedOpen = false, nestedMenu } = {}
    }) => {
        const menuConfig = (nestedMenu || menu)[type];
        const { title, Icon, menu: nestedMenuConfig, route } = menuConfig;
        const Wrapper = ({ children })  => route ? (
            <Link to={route}>{children}</Link>
        ) : (
            <>{children}</>
        );
        return (
            <>
                <StyledTooltip arrow TransitionComponent={Zoom} title={minified ? title : ''}>
                    <Wrapper>
                        <ListItem
                            button
                            onClick={nestedMenuConfig ? onNestedClick : handleMenuClick(menuConfig)}
                            className={nested ? classes.nested : ''}
                        >
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={title} />
                            {nestedMenuConfig && (nestedOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
                        </ListItem>
                    </Wrapper>
                </StyledTooltip>
                {nestedMenuConfig && Object.keys(nestedMenuConfig).length > 0 && (
                    <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {Object.keys(nestedMenuConfig).map(nestedType => {
                                return (
                                    <MenuItem
                                        type={nestedType}
                                        nestedOptions={{ nested: true, nestedMenu: nestedMenuConfig }}
                                        key={`${type}.${nestedType}`}
                                    />
                                );
                            })}
                            ;
                        </List>
                    </Collapse>
                )}
            </>
        );
    };

    return (
        <List component="nav" className={classes.root}>
            <MenuItem type="dashboard" />
            <MenuItem
                type="settings"
                nestedOptions={{ onNestedClick: handleSettings, nestedOpen: openSettings }}
            />
        </List>
    );
}

export default injectIntl(Menu);
