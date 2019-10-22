import React from 'react';
import SocialLogin from 'react-social-login';
import Button from '@material-ui/core/Button';

function SocialButton({ children, triggerLogin, ...props }) {
    return (
        <Button onClick={triggerLogin} {...props}>
            {children}
        </Button>
    );
}

export default SocialLogin(SocialButton);
