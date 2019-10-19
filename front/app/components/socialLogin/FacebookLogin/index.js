import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = response => {
    console.log(response);
};

export default ({ onLogin, ...props }) => (
    <FacebookLogin
        appId={process.env.FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        onClick={onLogin}
        callback={responseFacebook}
        {...props}
    />
);
