import React, { PropsWithChildren } from 'react';
import { IChildrenInheritedProps } from '../../../codenotch/codenotch';
import { PageHeader } from '../../abstract/PageHeader';

export interface IPageProps extends IChildrenInheritedProps<IPageInheritedProps>, PropsWithChildren {
	Layout?: 'Grid' | 'Flow' | 'Full'
	Header?: React.ReactNode;

	Title?: string;
	Subtitle?: string;
	Icon?: string;
	ParentPageTitle?: string;
	ParentPageRoute?: string;
}

export interface IPageInheritedProps {
	ColSpan?: '1/2' | '1/3' | '1/4' | '2/3' | '3/4' | 'full';
	RowSpan?: number;
}

export const Page: React.FC<IPageProps> = (props) => {

	const {
		Layout = 'Grid',
		Header,
		children,
		childrenProps = [],
	}: IPageProps = props;


	const getChildren = () => {
		return React.Children.map(children, (child, index) => {
			const effectiveProps = (child as any)?.props;
			effectiveProps.children.props = {
				...childrenProps[index],
				...effectiveProps.children.props
			}

			if (React.isValidElement(child)) {
				return React.cloneElement(child, effectiveProps);
			}
		});
	}

	if (!children)
		return <div>no child</div>;

	switch (Layout) {
		case 'Grid':
			return (
				<div className="p-4 mx-auto max-w-[1536px] md:p-6">
					<PageHeader CustomHeader={Header} {...props} />

					<div className="grid grid-cols-12 gap-4 md:gap-6">
						{getChildren()}
					</div>
				</div>
			)
		case 'Flow':
			return (
				<div className="p-4 mx-auto max-w-[1536px] md:p-6">
					<PageHeader CustomHeader={Header} {...props} />

					<div className="flex flex-col gap-4 md:gap-6">
						{getChildren()}
					</div>
				</div>
			)
		case 'Full':
			return (
				<div className="p-4 md:p-6">
					<PageHeader CustomHeader={Header} {...props} />

					<div className="flex flex-col gap-4 md:gap-6">
						{getChildren()}
					</div>
				</div>
			)
	}
}