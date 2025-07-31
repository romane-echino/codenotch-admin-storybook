import React from 'react';
import { ColorPalette, getBackgroundColorFromName, getConstrastColorFromName, getTextColorFromName } from '../../utils/DefaultColorPalette';

interface ITagProps {
	Label: string;
	Icon?: string;
	Color?: ColorPalette;

	IconPlacement?: 'Left' | 'Right';
	Light?: boolean;
}

export const Tag: React.FC<ITagProps> = (props) => {
	const {
		IconPlacement = 'Left',
		Light = false,
		Label,
		Icon,
		Color
	} = props;

	if (!Label && !Icon) {
		return null;
	}

	return (
		<span className={`inline-flex items-center justify-center gap-1 rounded-full py-0.5 text-sm font-medium
			${IconPlacement === 'Left' ? 'pl-2 pr-3' : 'pr-2 pl-3'}
			${Color ? (Light ? getTextColorFromName(Color) : getConstrastColorFromName(Color)) : 'text-gray-500'}
			${Color ? getBackgroundColorFromName(Color) + (Light ? '/15' : '') : 'bg-gray-200'}`}>

			{Icon && IconPlacement === 'Left' &&
				<i className={`${Icon} text-xs`} />
			}

			{Label}

			{Icon && IconPlacement === 'Right' &&
				<i className={`${Icon} text-xs`} />
			}
		</span>
	)


}