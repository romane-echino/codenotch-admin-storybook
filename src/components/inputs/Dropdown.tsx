import React from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { getDataFromSource, getIndexFromSource } from '../../utils/SourceHandling';
import { AbstractInput, IInputProps } from '../../abstract/AbstractInput';
import { IBindableComponentProps } from '../../../codenotch/codenotch';

interface IDropdownProps extends IInputProps, IBindableComponentProps {
	Source?: any;
	DisplayField?: string;
	ValueField?: string;

	Renderer?: (as: string, data: any) => React.ReactNode;
	DisabledFunction?: (value: any, index: number) => boolean;
}

export const Dropdown: React.FC<IDropdownProps> = (props) => {

	const [selectedIndex, setSelected] = React.useState<number | null>(null);
	const [focus, setFocus] = React.useState<boolean>(false);
	const [data, setData] = React.useState<any[]>([]);

	const [popupPosition, setPopupPosition] = React.useState<'top' | 'bottom'>('bottom');
	const inputRef = React.useRef<HTMLButtonElement>(null);


	React.useEffect(() => {
		const src = getDataFromSource(props.Source);
		setData(src);

		const defaultIndex = getIndexFromSource(src, props.Value, props.ValueField);
		if (defaultIndex !== -1) {
			updateValue(src?.[defaultIndex], defaultIndex);
		}
	}, [props.Source, props.Value]);

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

	const updateValue = (value: any, index: number) => {
		if (value) {
			const result = props.ValueField ? value[props.ValueField] : value;
			props.onPropertyChanged?.('value', undefined, result)
			setSelected(index);
			props.OnSelect?.({ value: result, index: index });
		}
	}

	return (
		<AbstractInput {...props} Focus={focus}>
			<Listbox defaultValue={selectedIndex} onChange={(index: number) => {
				if (index !== undefined) {
					updateValue(data?.[index], index);
				}
			}}>

				<ListboxButton
					ref={inputRef}
					className={`${props.Icon && 'pl-9'} cursor-pointer text-left px-4 py-2.5 w-full focus:border-0 focus:outline-hidden placeholder:text-gray-400 dark:placeholder:text-white/30`}
					onBlur={() => setFocus(false)}
					onFocus={() => setFocus(true)}
				>
					{selectedIndex !== null ?
						<span>
							{props.DisplayField ?
								data?.[selectedIndex]?.[props.DisplayField] :
								data?.[selectedIndex]
							}
						</span>
						:
						<span className='opacity-50'>{props.Placeholder}</span>
					}

					<div className='absolute inset-y-0 right-0 flex items-center pr-2'>
						<i className="h-5 w-5 text-gray-400 fa-solid fa-angles-up-down"></i>
					</div>
				</ListboxButton>

				<ListboxOptions
					className={`absolute ${popupPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'} z-50 bg-white border border-gray-300 dark:border-gray-700 translate-y-0.5 rounded-lg shadow-lg overflow-hidden max-w-full`}>
					{data.map((obj, objIndex) => {

						const disabled = props.DisabledFunction ? props.DisabledFunction(obj, objIndex) : false;
						return (
							<ListboxOption
								key={objIndex}
								value={objIndex}
								disabled={disabled}
								className={`relative cursor-default select-none py-2 pr-10 pl-4 text-gray-700 data-focus:bg-primary-500 data-focus:text-white
									${disabled ? 'opacity-50 cursor-not-allowed line-through' : ''}`}>
								<>
									<span className={`truncate flex gap-2 items-center justify-start`}>
										{props.Renderer ?
											props.Renderer('item', obj) :
											(props.DisplayField && obj[props.DisplayField]) ?
														obj[props.DisplayField] :
														obj
										}
									</span>

									{objIndex === selectedIndex &&
										<span className={`absolute inset-y-0 right-0 flex items-center pr-3 text-gray-800 group-data-selected:text-white`}>
											<i className="fa-regular fa-circle-check flex justify-center items-center"></i>
										</span>
									}
								</>

							</ListboxOption>
						)
					})}
				</ListboxOptions>
			</Listbox>
		</AbstractInput>
	)
}

