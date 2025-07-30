import { Sizing } from "../../abstract/Sizing";

export interface IBoxProps extends React.PropsWithChildren {
	Title?: string;
	Subtitle?: string;
	Actions?: React.ReactNode;
	Footer?: React.ReactNode;

	/**
	 * If true, the box will be displayed as a modal.
	 * @hidden
	 */
	Modal?: boolean;
}

/**
 * Box component to display content with optional title, subtitle, actions, and footer.
 * @snippet <Box>\n\t$0\n</Box>
 */
export const Box: React.FC<IBoxProps> = (props) => {

	const renderBox = (hasBorder: boolean = true) => {
		return (
			<div className={`rounded-2xl bg-white p-5 dark:border-gray-800 md:p-6  
				${(props.Modal === true && !props.Footer) ? 'relative w-full max-w-[700px]' : ' h-full grow'} 
				${hasBorder && 'border border-gray-200'}  
				${props.Footer ? 'dark:bg-gray-900' : 'dark:bg-white/[0.03]'}`}>
				<BoxTitle {...props} />

				{props.Modal ?
					<div className='max-h-[550px] pb-1 overflow-x-hidden px-1 overflow-y-auto cn-scroll'>
						{props.children}
					</div> :
					props.children
				}
			</div>
		)
	}

	if (props.Footer) {
		return (
			<Sizing {...props}>
				<div className='dark:bg-gray-900 rounded-2xl shadow-2xl h-full'>
					<div className={`border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] border rounded-2xl ${props.Modal ? 'relative w-full max-w-[700px]' : 'h-full'} flex flex-col`}>
						{renderBox(false)}

						<div className={`px-6 py-3.5 sm:py-5 flex ${props.Modal ? '*:grow' : ' justify-center'} items-center gap-5 sm:gap-8 `}>
							{props.Footer}
						</div>
					</div>
				</div>
			</Sizing>
		)

	}
	else {
		return (
			<Sizing {...props}>
				{renderBox()}
			</Sizing>
		)
	}


}


export const BoxTitle: React.FC<IBoxProps> = (props) => {
	return (
		<>
			{(props.Title !== undefined || props.Subtitle !== undefined || props.Actions !== undefined) &&
				<div className='flex flex-col sm:flex-row gap-2 sm:justify-between mb-4 sm:items-center'>
					<div>
						{props.Title &&
							<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
								{props.Title}
							</h3>

						}
						{props.Subtitle &&
							<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
								{props.Subtitle}
							</p>
						}
					</div>

					{props.Actions &&
						<div className='flex items-center gap-3'>
							{props.Actions}
						</div>
					}
				</div>
			}
		</>
	)
}