import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { IChildrenInheritedProps } from '../../../codenotch/codenotch';
import { Box, IBoxProps } from './Box';


interface ITabsProps extends IBoxProps, IChildrenInheritedProps<{ Title: string, Icon?: string, Badge?: string }> {
	Orientation?: 'Horizontal' | 'Vertical';
	HasLayout?: boolean;
}

export const Tabs: React.FC<ITabsProps> = (props) => {

	const {
		Orientation = 'Horizontal',
		HasLayout = true,
		childrenProps
	} = props;

	const getChildren = () => {
		return (
			<TabGroup as={'div'} className={`${Orientation === 'Vertical' ? 'flex flex-col md:flex-row gap-6' : ''}`}>
				<div className={`${Orientation === 'Vertical' ? '' : 'border-b border-gray-200 dark:border-gray-800'}`}>
					<TabList className={`-mb-px flex ${Orientation === 'Vertical' ? 'flex-col space-y-2' : 'space-x-2'} overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5`}>
						{childrenProps?.map((child, index) => (
							<Tab key={index} as={React.Fragment}>
								{({ selected }) => (
									<button className={`inline-flex cursor-pointer outline-none items-center gap-2 ${Orientation === 'Vertical' ? 'rounded-lg' : 'border-b-2'} px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out 
									${selected ? `${Orientation === 'Vertical' ? 'text-primary-500 dark:bg-primary-400/20 dark:text-primary-400 bg-primary-50' : 'text-primary-500 border-primary-500 dark:text-primary-400 dark:border-primary-400'}` :
											'bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}>
										{child.Icon &&
											<i className={`${child.Icon} ${selected ? 'text-primary-500 dark:text-primary-400' : 'text-gray-500'}`}></i>
										}

										{child.Title}

										{child.Badge &&
											<span className="inline-block items-center justify-center rounded-full bg-primary-50 px-2 py-0.5 text-center text-xs font-medium text-primary-500 dark:bg-primary-500/15 dark:text-primary-400">
												{child.Badge}
											</span>}
									</button>
								)}
							</Tab>
						))}
					</TabList>
				</div>

				<TabPanels className={`${Orientation === 'Vertical' ? '' : 'pt-4'}`}>
					{React.Children.map(props.children, (child, index) => (
						<TabPanel key={index}>
							{child}
						</TabPanel>
					))}
				</TabPanels>
			</TabGroup>
		)
	}


	if (HasLayout) {
		return (
			<Box {...props}>
				<div>
					{getChildren()}
				</div>
			</Box>
		)
	}
	else {
		return (
			<div>
				{getChildren()}
			</div>
		)
	}

}