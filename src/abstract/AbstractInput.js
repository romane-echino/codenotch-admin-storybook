import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Sizing } from './Sizing';
import { Helper } from './Helper';
export class AbstractInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.Focus !== prevProps.Focus) {
            this.setState({ focused: this.props.Focus });
        }
    }
    render() {
        return (_jsxs(Sizing, { ...this.props, Containered: true, children: [_jsxs("div", { className: 'flex justify-between items-center min-w-2xs', children: [_jsxs("div", { children: [this.props.Title &&
                                    _jsx("label", { className: `${this.props.Subtitle ? '' : 'mb-1.5'} block text-sm font-medium text-gray-700 dark:text-gray-400`, children: this.props.Title }), this.props.Subtitle &&
                                    _jsx("label", { className: "mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-500", children: this.props.Subtitle })] }), this.props.Helper &&
                            _jsx(Helper, { children: this.props.Helper })] }), _jsxs("div", { className: `flex dark:bg-dark-900 min-h-11 w-full rounded-lg border  bg-transparent  text-sm   dark:bg-gray-900 text-gray-800 dark:text-white/90 
                    ${this.state.focused && !this.props.Disabled ? 'border-primary-300 dark:border-primary-800 ring-primary-500/10 ring-3' : 'border-gray-300 dark:border-gray-700'}`, children: [this.props.Prefix &&
                            _jsx("span", { className: "pointer-events-none flex items-center justify-center border-r border-gray-200 py-3 pr-3 pl-3.5  dark:border-gray-800", children: this.props.Prefix }), _jsxs("div", { className: 'relative grow group flex items-center', children: [this.props.Icon &&
                                    _jsx("span", { className: "absolute min-w-4 flex items-center justify-center pointer-events-none left-3 top-1/2 -translate-y-1/2", children: _jsx("i", { className: `${this.props.Icon} text-gray-500 dark:text-gray-400` }) }), this.props.children] }), this.props.Suffix &&
                            _jsx("span", { className: "pointer-events-none flex items-center justify-center border-l border-gray-200 py-3 pl-3 pr-3.5  dark:border-gray-800", children: this.props.Suffix })] })] }));
    }
}
