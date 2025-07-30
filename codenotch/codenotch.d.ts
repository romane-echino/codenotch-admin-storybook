export type Action<T = void> = (data: T) => void;

export interface IBindableComponentProps {
    onPropertyChanged?: (propertyName: string, oldValue: any, newValue: any) => void;
    declareFunction?: (name: string, func: (...args: any[]) => any) => void;
}

export interface IChildrenInheritedProps<T = any> {
    childrenProps?: T[];
}
