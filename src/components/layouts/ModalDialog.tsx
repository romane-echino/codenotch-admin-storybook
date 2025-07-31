import React from 'react';
import { applyTint } from '../../utils/ColorPaletteUtils';
import { Box, IBoxProps } from './Box';
import { IDialogProps } from '../../../codenotch/codenotch';
import { motion } from 'framer-motion';

interface IModalDialogProps extends IBoxProps, IDialogProps {
	Tint?: string;
}


export const ModalDialog = (props: IModalDialogProps) => {
	React.useEffect(() => {
		if (props.Tint) {
			applyTint(props.Tint);
		}
	}, [props.Tint]);

	return (
		<motion.div
			onClick={() => props.dialogId && props.cancelDialog?.(props.dialogId)}
			className='fixed p-5 inset-0 h-full w-full bg-gray-400/50 dark:bg-gray-900/50 backdrop-blur-[32px] flex items-end sm:items-center justify-center z-50'>
			<div onClick={(e) => e.stopPropagation()} className='w-full max-w-[700px]'>
				<Box {...props} Modal={true}>
					{props.children}
				</Box>
			</div>
		</motion.div>
	)
}

