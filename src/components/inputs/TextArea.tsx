import React from 'react';
import { ISizingElementProps } from '../../abstract/Sizing';
import { AbstractInput, IInputProps } from '../../abstract/AbstractInput';

interface ITextAreaProps extends IInputProps, ISizingElementProps {
}

export const TextArea: React.FC<ITextAreaProps> = (props) => {

	const [focused, setFocused] = React.useState(false);

	const updateValue = (value: string) => {
		props.onPropertyChanged?.('Value', undefined, value)
		if (props.OnChange) {
			props.OnChange(value);
		}
	}

	React.useEffect(() => {
		if (props.Value !== undefined && props.Value !== null && props.Value !== '') {
			updateValue(props.Value as string);
		}
	}, [props.Value]);

	return (
		<AbstractInput Focus={focused} {...props}>
			<textarea
				placeholder={props.Placeholder}
				defaultValue={props.Value}
				disabled={props.Disabled}
				onChange={(e) => updateValue(e.target.value)}
				className={`${props.Icon ? 'pl-9':''} 
				px-4 py-2.5 w-full focus:border-0 focus:outline-hidden cn-scroll min-h-32
				placeholder:text-gray-400 dark:placeholder:text-white/30
				${props.Disabled ? 'opacity-50' : ''}
				`}
				onBlur={() => setFocused(false)}
				onFocus={() => setFocused(true)} />
		</AbstractInput>
	)
}