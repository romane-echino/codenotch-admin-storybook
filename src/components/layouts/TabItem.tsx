import React, { PropsWithChildren } from 'react';

export const TabItem: React.FC<PropsWithChildren> = (props) => {
	return (
		<div>
			{props.children}
		</div>
	)
}
	