import React, { PropsWithChildren } from 'react';
import { Sizing } from './Sizing';
import { Helper } from './Helper';
import { IBindableComponentProps } from '../../codenotch/codenotch';

export interface IAbstractInputProps extends IInputProps, PropsWithChildren  {
    Focus: boolean;
}

export interface IAbstractListAction {
    value: any,
    index: number
}

export interface IInputProps extends IBindableComponentProps {
    Title?: string;
    Subtitle?: string;
    Placeholder?: string;
    Value?: string | number;
    OnChange?: (value:any) => void //Action<any>;
    OnSelect?: (action:IAbstractListAction) => void; //Action<IAbstractListAction>;
    Icon?: string;
    Disabled?: boolean;
    Helper?: string;

    Prefix?: React.ReactNode;
    Suffix?: React.ReactNode;
}

interface IAbstractInputState {
    focused: boolean;
}

export class AbstractInput extends React.Component<IAbstractInputProps, IAbstractInputState> {

    constructor(props: IAbstractInputProps) {
        super(props);
        this.state = {
            focused: false
        };
    }


    componentDidUpdate(prevProps: Readonly<IAbstractInputProps>): void {
        if (this.props.Focus !== prevProps.Focus) {
            this.setState({ focused: this.props.Focus });
        }
    }

    render() {
        return (
            <Sizing {...this.props} Containered={true}>
                <div className='flex justify-between items-center min-w-2xs'>
                    <div>
                        {this.props.Title &&
                            <label className={`${this.props.Subtitle ? '' : 'mb-1.5'} block text-sm font-medium text-gray-700 dark:text-gray-400`}>
                                {this.props.Title}
                            </label>
                        }

                        {this.props.Subtitle &&
                            <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-500">
                                {this.props.Subtitle}
                            </label>
                        }
                    </div>

                    {this.props.Helper &&
                       <Helper>
                            {this.props.Helper}
                       </Helper>
                    }
                </div>

                <div className={`flex dark:bg-dark-900 min-h-11 w-full rounded-lg border  bg-transparent  text-sm   dark:bg-gray-900 text-gray-800 dark:text-white/90 
                    ${this.state.focused && !this.props.Disabled ? 'border-primary-300 dark:border-primary-800 ring-primary-500/10 ring-3' : 'border-gray-300 dark:border-gray-700'}`}>

                    {this.props.Prefix &&
                        <span className="pointer-events-none flex items-center justify-center border-r border-gray-200 py-3 pr-3 pl-3.5  dark:border-gray-800">
                            {this.props.Prefix}
                        </span>
                    }

                    <div className='relative grow group flex items-center'>
                        {this.props.Icon &&
                            <span className="absolute min-w-4 flex items-center justify-center pointer-events-none left-3 top-1/2 -translate-y-1/2">
                                <i className={`${this.props.Icon} text-gray-500 dark:text-gray-400`}></i>
                            </span>
                        }

                        {this.props.children}
                    </div>

                    {this.props.Suffix &&
                        <span className="pointer-events-none flex items-center justify-center border-l border-gray-200 py-3 pl-3 pr-3.5  dark:border-gray-800">
                            {this.props.Suffix}
                        </span>
                    }
                </div>
            </Sizing>
        )
    }

}