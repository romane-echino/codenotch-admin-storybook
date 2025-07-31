import React from 'react';
import dayjs, { duration } from 'dayjs';
import { ISizingElementProps, Sizing } from '../../abstract/Sizing';
import { Ii18nProps } from '../../../codenotch/codenotch';

interface ILabelProps extends Ii18nProps, ISizingElementProps {
	Value: string;
	Title?: string;

	Icon?: string;
	IconColor?: 'Success' | 'Error' | 'Warning' | 'Info' | 'Primary' | 'Inherit';
	IconPlacement?: 'Left' | 'Right';

	Align?: 'Left' | 'Center' | 'Right';
	Size?: 'ExtraSmall' | 'Small' | 'Normal' | 'Large';
	TextColor?: 'Normal' | 'Light' | 'Inherit';


	Type?: 'Date' | 'Time' | 'DateTime' | 'Text' | 'Duration' | 'Currency' | 'Percentage' | 'Phone' | 'Email' | 'Url';
}

export const Label: React.FC<ILabelProps> = (props) => {

	const {
		Title,
		Value,
		Size = 'Normal',
		Icon,
		IconColor,
		Align = 'Left',
		TextColor = 'Normal',
		IconPlacement = 'Left',
		Type = 'Text'
	} = props;


	const getFormattedValue = (): string => {
		switch (props.Type) {
			case 'Date':
				return dayjs(Value).locale(props.language ?? 'en').format('ll');
			case 'Time':
				return dayjs(Value).locale(props.language ?? 'en').format('LT');
			case 'DateTime':
				return dayjs(Value).locale(props.language ?? 'en').format('lll');
			case 'Duration':
				return duration(dayjs(Value).diff(dayjs())).locale(props.language ?? 'en').humanize(true);
			case 'Currency':
				return new Intl.NumberFormat(props.language ?? 'en', { style: 'currency', currency: 'CHF' }).format(Number(Value));
			case 'Percentage':
				{
					const percentageValue: number = parseFloat(Value);
					if (isNaN(percentageValue)) {
						return '0%';
					}
					return `${percentageValue < 1 ? percentageValue * 100 : percentageValue}%`;
				}
			case 'Phone':
				return Value;
			case 'Email':
				return Value;
			case 'Url':
				return Value;
			default:
				return Value;
		}
	}

	const getFormattedComponent = (): { type: any, props: any } => {
		const component = 'p'
		switch (Type) {
			case 'Date':
			case 'Time':
			case 'DateTime':
			case 'Duration':
			case 'Currency':
			case 'Percentage':
				return { type: component, props: {} };
			case 'Phone':
				return { type: 'a', props: { href: `tel:${Value}` } };
			case 'Email':
				return { type: 'a', props: { href: `mailto:${Value}` } };
			case 'Url':
				return { type: 'a', props: { href: Value } };
			default:
				return { type: component, props: {} };
		}
	}


	const formattedComponent = getFormattedComponent();
	const Component = formattedComponent.type;

	let iconClass = '';
	switch (IconColor) {
		case 'Success': iconClass = 'text-green-500 dark:text-green-400'; break;
		case 'Error': iconClass = 'text-red-500 dark:text-red-400'; break;
		case 'Warning': iconClass = 'text-yellow-500 dark:text-yellow-400'; break;
		case 'Info': iconClass = 'text-blue-500 dark:text-blue-400'; break;
		case 'Primary': iconClass = 'text-primary-500 dark:text-primary-400'; break;
		case 'Inherit': iconClass = ''; break;
		default: iconClass = 'text-gray-800 dark:text-white/90'; break;
	}

	let componentClass = 'flex items-center justify-center gap-1';
	switch (Size) {
		case 'ExtraSmall': componentClass += ' text-xs'; break;
		case 'Small': componentClass += ' text-sm'; break;
		case 'Normal': componentClass += ' text-base'; break;
		case 'Large': componentClass += ' text-base sm:text-lg font-semibold'; break;
		default: componentClass += ' text-base'; break;
	}

	if (formattedComponent.type === 'a') {
		componentClass += ` ${iconClass}`;
	} else {
		switch (TextColor) {
			case 'Normal': componentClass += ' text-gray-800 dark:text-white/90'; break;
			case 'Light': componentClass += ' text-gray-500 dark:text-gray-400'; break;
			case 'Inherit': componentClass += ''; break;
		}
	}


	let titleClass = '';
	switch (Align) {
		case 'Left': componentClass += ' justify-start'; titleClass = 'text-left'; break;
		case 'Center': componentClass += ' justify-center'; titleClass = 'text-center'; break;
		case 'Right': componentClass += ' justify-end'; titleClass = 'text-right'; break;
		default: componentClass += ' justify-start'; titleClass = 'text-left'; break;
	}


	switch (IconPlacement) {
		case 'Left': iconClass += ' mr-1'; break;
		case 'Right': iconClass += ' ml-1'; break;
		default: iconClass += ' mr-1'; break;
	}

	return (
		<Sizing {...props}>
			{Title &&
				<p className={`${titleClass} mb-1  text-xs ${TextColor !== 'Inherit' ? 'text-gray-500 dark:text-gray-400' : 'opacity-60'} sm:text-sm`}>
					{Title}
				</p>
			}

			<Component {...formattedComponent.props} className={`${componentClass}`}>
				{Icon && IconPlacement === 'Left' &&
					<i className={`${Icon} ${iconClass} text-sm flex items-center justify-center`} />
				}

				{getFormattedValue()}

				{Icon && IconPlacement === 'Right' &&
					<i className={`${Icon} ${iconClass} text-sm flex items-center justify-center`} />
				}
			</Component>
		</Sizing>
	)
}