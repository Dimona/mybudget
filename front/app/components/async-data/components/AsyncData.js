import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import nullfined from 'nullfined';

import { ApiClient } from 'config/axios';

export default class AsyncData extends PureComponent {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
        params: PropTypes.array,
        autoload: PropTypes.bool,
        item: PropTypes.bool
    };

    static defaultProps = {
        params: [],
        autoload: false,
        item: false
    };

    state = {
        data: {},
        loading: false,
        firing: false
    };

    componentDidMount() {
        this.handleAutoload();
    }

    handleAutoload = () => {
        const { params, autoload, item } = this.props;

        if (autoload) {
            this[item ? 'handleShow' : 'handleIndex'](...params);
        }
    };

    handleIndex = (filter = {}) => {
        const { endpoint } = this.props;

        this.setState({ loading: true }, async () => {
            try {
                const { data = {} } = await ApiClient.get(endpoint, { params: { filter } });
                const { firing } = this.state;

                this.setState({ loading: false, data: nullfined(data), firing: !firing });
            } catch (e) {
                this.setState({ loading: false });
            }
        });
    };

    handleShow = (id, filter = {}) => {
        const { endpoint } = this.props;

        this.setState({ loading: true }, async () => {
            try {
                const { data = {} } = await ApiClient.get(`${endpoint}/${id}`, { params: { filter } });
                this.setState({ loading: false, data: nullfined(data) });
            } catch (e) {
                this.setState({ loading: false });
            }
        });
    };

    render() {
        const { children } = this.props;

        return children({ ...this.state, index: this.handleIndex, show: this.handleShow });
    }
}
