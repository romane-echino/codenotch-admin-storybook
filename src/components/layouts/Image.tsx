import React from 'react';
import { ISizingElementProps, Sizing } from '../../abstract/Sizing';


interface IImageProps extends ISizingElementProps {
	Source: string;
	AlternativeText?: string;
	Rounded?: boolean;
}

export const Image: React.FC<IImageProps> = (props) => {
	return (
		<Sizing {...props}>
			<img
			src={props.Source}
			alt={props.AlternativeText}
			className={props.Rounded ? 'rounded-2xl' : ''}
		/>
		</Sizing>
	);
};