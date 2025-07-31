import React, { useEffect } from 'react';
import { getDataFromSource } from '../../utils/SourceHandling';


//import Board from '@asseinfo/react-kanban'


import { Box, IBoxProps } from './Box';
import { Action } from '../../../codenotch/codenotch';

interface IKanbanProps extends IBoxProps {
	Source?: any[];
	CardRenderer?: (as: string, data: any) => React.ReactNode;
	ColumnRenderer?: (as: string, data: any) => React.ReactNode;
	OnChange?: Action<any>;
	OrderField?: string;
}

export const Kanban: React.FC<IKanbanProps> = (props) => {
	// Kanban implementation
	const [data, setData] = React.useState<any[]>([]);
	const commonTitleFields = ['Name', 'title', 'Title', 'name', 'displayName', 'label'];

	useEffect(() => {
		updateSource();
	}, [props.Source, props.children]);


	function updateSource() {
		if (!props.Source ) return;
		if (!props.OrderField) return;

		const source = getDataFromSource(props.Source);
		const arrayKey = Object.keys(source[0]).find(key => Array.isArray(source[0][key]));
		const titleKey = commonTitleFields.find(key => source[0][key] !== undefined);
		let data: any[] = [];

		if (arrayKey && titleKey) {
			data = source.map((item: any) => {

				const obj = {
					id: item[props.OrderField!] !== undefined ? item[props.OrderField!] : item.id,
					title: item[titleKey] !== undefined ? item[titleKey] : 'Name',
					cards: item[arrayKey] ? item[arrayKey].map((card: any) => {
						const c = {
							id: card[props.OrderField!] !== undefined ? card[props.OrderField!] : card.id,
							title: card[titleKey] !== undefined ? card[titleKey] : 'Name',
							...card
						}
						return c;
					}) : [],
					...item
				};

				delete obj[props.OrderField!];
				delete obj[arrayKey];
				delete obj[titleKey];

				return obj;
			});
		}

		setData(data);
	}

	return (
		<Box {...props}>
			{data &&
				<div>WIP</div>
			}
		</Box>
	)

	/*return (
		<Box {...props}>
			{data && data.length > 0 && (props.OrderField || data[0].id) &&
				<Board
					disableColumnDrag={true}
					initialBoard={{ columns: data }}
					onCardDragEnd={
						(board: any, card: any, source: any, destination: any) => {
							if (source.fromColumnId !== destination.toColumnId) {
								if (props.OnChange) {
									props.OnChange({ newColumnId: destination.toColumnId, ...card, column: data.find((c: any) => c.id === destination.toColumnId) });
								}
							}
						}
					}

					renderColumnHeader={(column, { removeColumn, renameColumn, addCard }) => (
						<div className="flex items-center justify-between gap-5 mb-2">
							{props.ColumnRenderer ?
								props.ColumnRenderer('column', column) :
								<h3 className="text-gray-800 dark:text-white/90">
									{column.title}
								</h3>
							}

							<span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-theme-xs font-medium text-gray-700 dark:bg-white/[0.03] dark:text-white/80">
								{column.cards.length}
							</span>

						</div>
					)}

					renderCard={(card, { removeCard, dragging }) => props.CardRenderer ?
						props.CardRenderer('card', card) : (
							<div className={`${dragging ? 'shadow-lg ring  ring-primary-500' : ''} mb-2 rounded-xl min-w-[220px] select-none cursor-grab bg-white p-5  dark:bg-gray-800`}>
								{card.title &&
									<h4 className="text-gray-800 dark:text-white/90">
										{card.title}
									</h4>
								}
							</div>
						)}

				/>
			}
		</Box >
	)*/
}
