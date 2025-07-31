import React, { PropsWithChildren } from 'react';
import ReactMarkdown from 'react-markdown';


export const Markdown: React.FC<PropsWithChildren> = (props) => {

	let value = ' ';
	if (props.children && typeof props.children === 'string') {
		value = (props.children as string).trim();
		value = value.replace(/\t/g, '')
	}

	return (
		<div className='mdblock text-gray-800 dark:text-white/90'>
			<ReactMarkdown
				children={value} />
		</div>
	)
}