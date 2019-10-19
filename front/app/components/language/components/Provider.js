/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from '../selectors';

export default
@connect(
    createSelector(
        makeSelectLocale(),
        locale => ({ locale })
    )
)
class LanguageProvider extends PureComponent {
    static propTypes = {
        locale: PropTypes.string,
        messages: PropTypes.object,
        children: PropTypes.element.isRequired
    };

    static defaultProps = {
        locale: 'en',
        messages: {}
    };

    render() {
        const { locale, messages, children } = this.props;

        return (
            <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
                {React.Children.only(children)}
            </IntlProvider>
        );
    }
}
