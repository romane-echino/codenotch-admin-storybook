import React from 'react';

interface IIconProps {
	Value: string;
	Size?: 'ExtraSmall' | 'Small' | 'Normal' | 'Large' | 'ExtraLarge';
	Color: 'Primary' | 'Success' | 'Error' | 'Warning' | 'Info' | 'Inherit';
	Animate?: 'None' | 'Beat' | 'Fade' | 'Spin';
}

export const Icon: React.FC<IIconProps> = (props) => {

	let classes = '';
	let containerClasses = '';
	switch (props.Size) {
		case 'ExtraSmall':
			classes = 'text-xs';
			containerClasses = 'size-4';
			break;
		case 'Small':
			classes = 'text-sm';
			containerClasses = 'size-5';
			break;
		case 'Normal':
			classes = 'text-base';
			containerClasses = 'size-6';
			break;
		case 'Large':
			classes = 'text-lg';
			containerClasses = 'size-7';
			break;
		case 'ExtraLarge':
			classes = 'text-xl';
			containerClasses = 'size-8';
			break;
		default:
			classes = 'text-base';
			containerClasses = 'size-6';
			break;
	}

	switch (props.Color) {
		case 'Primary':
			classes += ' text-primary-500';
			break;
		case 'Success':
			classes += ' text-success-500';
			break;
		case 'Error':
			classes += ' text-error-500';
			break;
		case 'Warning':
			classes += ' text-warning-500';
			break;
		case 'Info':
			classes += ' text-info-500';
			break;
		case 'Inherit':
			classes += ' ';
			break;
		default:
			classes += ' text-gray-500';
			break;
	}

	switch (props.Animate) {
		case 'Beat':
			classes += ' fa-beat';
			break;
		case 'Fade':
			classes += ' fa-fade';
			break;
		case 'Spin':
			classes += ' fa-spin';
			break;
	}

	return (
		<div className={`${containerClasses} flex justify-center items-center `}>
			<i className={`${props.Value} ${classes}`} />
		</div>
	)

}