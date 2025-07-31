import React, { Children, PropsWithChildren } from 'react';
import { Menu, MenuButton as HUIMenuButton, MenuItems, MenuItem } from '@headlessui/react';


export const MenuButton: React.FC<PropsWithChildren> = (props) => {
	const [focus, setFocus] = React.useState<boolean>(false);
	const [popupPosition, setPopupPosition] = React.useState<'top' | 'bottom'>('bottom');
	const inputRef = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		const calculatePosition = () => {
			if (!inputRef.current) return;

			const rect = inputRef.current.getBoundingClientRect();
			const inputMiddle = rect.top + rect.height / 2;
			const windowMiddle = window.innerHeight / 2;

			// If input is in the lower half of the screen, position popup above
			setPopupPosition(inputMiddle > windowMiddle ? 'top' : 'bottom');
		};

		if (focus) {
			calculatePosition();
			// Add event listeners when input is focused
			window.addEventListener('resize', calculatePosition);
			window.addEventListener('scroll', calculatePosition, true);
		}

		// Clean up
		return () => {
			window.removeEventListener('resize', calculatePosition);
			window.removeEventListener('scroll', calculatePosition, true);
		};
	}, [focus]);
	return (
		<Menu as="div" className="relative">
			<HUIMenuButton ref={inputRef}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				className='size-6 text-lg cursor-pointer flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white'>
				<i className="fal fa-ellipsis-vertical"></i>
			</HUIMenuButton>
			<MenuItems
				className={`absolute p-2 flex flex-col gap-1 right-0 ${popupPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'} z-50 bg-white border border-gray-300  dark:border-gray-700 dark:bg-gray-800 translate-y-0.5 rounded-lg shadow-lg overflow-hidden`}>
				{Children.map(props.children, (child, index) => (
					<MenuItem key={index}>
						{child}
					</MenuItem>
				))}
			</MenuItems>
		</Menu>
	)
}

