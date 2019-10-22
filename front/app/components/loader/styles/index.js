export default theme => ({
    loaderWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        backgroundColor: 'rgba(0,0,0,.55)',
        borderRadius: 'inherit',
        '&$loaderFullPageWrapper': {
            position: 'fixed'
        }
    },
    loader: {
        color: theme.palette.primary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-25px',
        marginLeft: '-25px',
        zIndex: 100
    },
    loaderFullPageWrapper: {}
});
