import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { DefaultColorPalette, DefaultColorPaletteNames } from '../../utils/DefaultColorPalette';
import { AbstractInput, IInputProps } from '../../abstract/AbstractInput';
import { ISizingElementProps } from '../../abstract/Sizing';

interface IColorInputProps extends IInputProps, ISizingElementProps {
}


export const ColorInput: React.FC<IColorInputProps> = (props) => {

	const [focused, setFocused] = React.useState(false);

	const [color, setColor] = React.useState<{
		value:string;
		name:string;
	}>();

	React.useEffect(() => {
		// Handle any side effects or updates based on props or state changes
	}, [props, focused]);

	const updateValue = (value: string) => {
		props.onPropertyChanged?.('Value', undefined, value)
		if (props.OnChange) {
			props.OnChange(value);
		}
	}

	return (
		<AbstractInput Focus={focused} {...props}>
			<Popover>
				<PopoverButton
				className={`${props.Icon && 'pl-9'} text-left cursor-pointer px-4 py-2.5 w-full focus:border-0 focus:outline-hidden placeholder:text-gray-400 dark:placeholder:text-white/30`}
					onBlur={() => setFocused(false)}
					onFocus={() => setFocused(true)}
				>
					
					{color !== null ?
						<div className="flex items-center gap-2">
							<div className="size-4" style={{ backgroundColor: color?.value }}>&nbsp;</div>
							{color?.name}
						</div>
						:
						<span className='opacity-50'>{props.Placeholder ?? 'Select a color...'}</span>
					}


					<div className='absolute inset-y-0 right-0 flex items-center pr-2'>
						<i className="h-5 w-5 text-gray-400 fa-solid fa-angles-up-down"></i>
					</div>
				</PopoverButton>

				<PopoverPanel
				className='absolute z-50 max-h-[320px] overflow-y-auto flex flex-wrap bg-white border border-gray-300 dark:border-gray-700 translate-y-0.5 rounded-lg shadow-lg overflow-hidden max-w-full'>

					{DefaultColorPalette.map((o,i) => (
						<div key={i} className="p-2 text-gray-700 flex items-center gap-2 cursor-pointer"
						onClick={() => {
							setColor({ value: o, name: DefaultColorPaletteNames[i] });
							updateValue(o);
						}}>
							<div className="size-4" style={{ backgroundColor: o }}>&nbsp;</div> {DefaultColorPaletteNames[i]}
						</div>
					))}
				</PopoverPanel>
			</Popover>
		</AbstractInput>
	)
}