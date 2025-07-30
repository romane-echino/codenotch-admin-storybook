import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export const Helper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Popover className="relative">
            <PopoverButton className=' outline-none size-6 flex items-center justify-end text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200'>
                <i className="far fa-circle-info"></i>
            </PopoverButton>
            <PopoverPanel
                anchor="bottom end"
                className="z-50 px-4 py-2 text-sm bg-white border border-gray-300  dark:border-gray-700 dark:bg-gray-800 translate-y-0.5 rounded-lg shadow-lg overflow-hidden">
                {children}
            </PopoverPanel>
        </Popover>
    );
}