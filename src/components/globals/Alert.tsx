type AlertType = 'Success' | 'Warning' | 'Error' | 'Info';

interface IAlertProps {
	Type?: AlertType;
	/**
	 * Optional title for the alert.
	 */
	Title?: string;
	Message?: string;
	LinkText?: string;
	LinkUrl?: string;
}

const typeStyles: Record<AlertType, { border: string; bg: string; icon: string; iconClass: string }> = {
	Success: {
		border: 'border-success-500',
		bg: 'bg-success-50 dark:border-success-500/30 dark:bg-success-500/15',
		icon: 'fa-check-circle',
		iconClass: 'text-success-500',
	},
	Warning: {
		border: 'border-warning-500',
		bg: 'bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/15',
		icon: 'fa-exclamation-triangle',
		iconClass: 'text-warning-500',
	},
	Error: {
		border: 'border-error-500',
		bg: 'bg-error-50 dark:border-error-500/30 dark:bg-error-500/15',
		icon: 'fa-times-circle',
		iconClass: 'text-error-500',
	},
	Info: {
		border: 'border-info-500',
		bg: 'bg-info-50 dark:border-info-500/30 dark:bg-info-500/15',
		icon: 'fa-info-circle',
		iconClass: 'text-info-500',
	},
};

/**
 * Alert component to display messages with different styles based on the type.
 * @snippet <Alert Title="${1:Some title}" Message="${2:Some message}" Type="${3}" />
 */
export const Alert: React.FC<IAlertProps> = ({
	Type = 'Info',
	Title,
	Message,
	LinkText,
	LinkUrl,
}) => {
	const style = typeStyles[Type];

	return (
		<div className={`rounded-xl border ${style.border} ${style.bg} p-4`.trim()}>
			<div className="flex items-start gap-3">
				<div className={`-mt-0.5 ${style.iconClass}`}>
					<i className={`fa ${style.icon}`} />
				</div>
				<div>
					{Title && <h3 className="font-semibold text-gray-800 dark:text-white">{Title}</h3>}
					{Message && <p className="text-sm text-gray-500 dark:text-gray-400">{Message}</p>}

					{LinkText && LinkUrl && (
						<a href={LinkUrl} className="mt-3 inline-block text-sm font-medium text-gray-500 underline dark:text-gray-400">
							{LinkText}
						</a>
					)}
				</div>
			</div>
		</div>
	);
};