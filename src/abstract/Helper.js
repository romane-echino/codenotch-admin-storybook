import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
export const Helper = ({ children }) => {
    return (_jsxs(Popover, { className: "relative", children: [_jsx(PopoverButton, { className: ' outline-none size-6 flex items-center justify-end text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200', children: _jsx("i", { className: "far fa-circle-info" }) }), _jsx(PopoverPanel, { anchor: "bottom end", className: "z-50 px-4 py-2 text-sm bg-white border border-gray-300  dark:border-gray-700 dark:bg-gray-800 translate-y-0.5 rounded-lg shadow-lg overflow-hidden", children: children })] }));
};
