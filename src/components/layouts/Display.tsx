import React from 'react';
import { Box, IBoxProps } from './Box';
import { IChildrenInheritedProps } from '../../../codenotch/codenotch';

interface IDisplayProps extends IBoxProps, IChildrenInheritedProps<DisplayCustomColumns> {
	Source?: any;
}

interface DisplayCustomColumns {
	Field: string;
	Label: string;
}

export const Display: React.FC<IDisplayProps> = (props) => {

	const [fields, setFields] = React.useState<DisplayCustomColumns[]>([]);

	React.useEffect(() => {
		updateSource();
	}, [props.Source]);

	const updateSource = () => {
		if (!props.Source)
			return;

		const customFields = React.Children.toArray(props.children)
			.map(c => (c as any).props.children.props)
			.filter(c => c.componentDescription.tag.split(':')[1] === 'DisplayField')

		const fields: DisplayCustomColumns[] = customFields.length > 0 ?
			customFields.map((col: any) => {
				return {
					Field: col.Field,
					Label: col.Label || col.field.charAt(0).toUpperCase() + col.field.slice(1)
				};
			})
			:
			Object.keys(props.Source).filter(k => (typeof props.Source[k] !== 'object')).map((key) => {
				return {
					Field: key,
					Label: key.charAt(0).toUpperCase() + key.slice(1)
				};
			});

		setFields(fields);
	}

	return (
		<Box {...props}>
			<div className="grid grid-cols-1 gap-4 justify-start lg:grid-cols-[auto_auto] lg:gap-7 2xl:gap-x-32">
				{fields.map((field, index) => {
					return (
						<div key={index}>
							<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
								{field.Label}
							</p>
							<p className="text-sm font-medium text-gray-800 dark:text-white/90">
								{props.Source[field.Field] !== undefined ? props.Source[field.Field].toString() : 'N/A'}
							</p>
						</div>
					)
				})}
			</div>
		</Box>
	)
}