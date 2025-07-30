import { useEffect, useState } from 'react';
import { AbstractInput, IInputProps } from '../../abstract/AbstractInput';


export const TextInput: React.FC<IInputProps> = (props) => {
	const [focused, setFocused] = useState(false);


	useEffect(() => {
		if (props.Value !== undefined && props.Value !== null && props.Value !== '') {
			updateValue(props.Value as string);
		}
	}, [props.Value]);

	const updateValue = (value: string) => {
		props.onPropertyChanged?.('value', undefined, value)
		if (props.OnChange) {
			props.OnChange(value);
		}
	}


	return (
		<AbstractInput Focus={focused} {...props}>
			<input type="text"
				placeholder={props.Placeholder}
				defaultValue={props.Value}
				disabled={props.Disabled}
				onChange={(e) => updateValue(e.target.value)}
				className={`${props.Icon && 'pl-9'} px-4 py-2.5 w-full focus:border-0 focus:outline-hidden placeholder:text-gray-400 dark:placeholder:text-white/30`}
				onBlur={() => setFocused(false)}
				onFocus={() => setFocused(true)} />
		</AbstractInput>
	)
}