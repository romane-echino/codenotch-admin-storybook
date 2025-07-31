export type Action<T = void> = (data: T) => void;

export interface IBindableComponentProps {
    onPropertyChanged?: (propertyName: string, oldValue: any, newValue: any) => void;
    declareFunction?: (name: string, func: (...args: any[]) => any) => void;
}

export interface IChildrenInheritedProps<T = any> {
    childrenProps?: T[];
}

export interface Ii18nProps {
    /**
     * The current language of the app
     */
    language?: string;
    /**
     * The list of available languages for the app
     */
    availableLanguages?: string[];
    extensionName?: string;
    /**
     * Change the language of the app
     * lang: the language code (en-US, de, fr-CH, ...)
     */
    setLanguage?: (lang: string, extensionName?: string) => void;
}

export interface IDialogProps {
    /**
     * Set the content of a dialog
     * dialogId: The id to give the dialog, if id is the same, the content is replaced
     * content: the dialog content as a ReactNode or an auml string (<Dialog></Dialog>)
     * contentType: react if content is a ReactNode, auml otherwise
     * asModal: true to display the dialog as a modal, false otherwise
     * onSubmit: callback for when the dialog is closed using the submit action, may contain data
     * onCancel: callback for when the dialog is closed using the cancel action
     */
    showDialog?: (dialogId: string, content: ReactNode | string, contentType: "auml" | "react", asModal: boolean, onSubmit: (data: any) => void, onCancel: () => void) => void;
    /**
     * Close a dialog using the cancel action
     * Will trigger any OnCancel action on the dialog
     */
    cancelDialog?: (dialogId: string) => void;
    /**
     * Close a dialog using the submit action
     * Can contain data
     * Will trigger any OnSubmit action on the dialog
     */
    submitDialog?: (dialogId: string, data: any) => void;
    /**
     * The id of the surrounding dialog if any
     */
    dialogId?: string;
}

/**
 * Interface to access the theme of the application
 */
export interface IApplicationThemeProps {
    applicationTheme?: string;
    setTheme?: (isDarkTheme: boolean) => void;
}


/**
 * Interface to retrieve the info of the currently authenticated user
 */
export interface IUserInfoProps {
    user?: UserInfo;
}
export interface UserInfo {
    id: string;
    roles: string[];
    groups: string[];
    email: string;
    firstName: string;
    lastName: string;
}

export declare class ComponentDescription {
    tag: string;
    props: {
        [key: string]: any;
    };
    parentInheritedProps: {
        [parentName: string]: {
            [key: string]: any;
        };
    };
    children: (ComponentDescription | any | string)[];
    storedData: {
        [key: string]: any;
    };
}

