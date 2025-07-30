import React, { PropsWithChildren } from 'react';

export interface ISizingElementProps {
    ColSpan?: '1/2' | '1/3' | '1/4' | '2/3' | '3/4' | 'full';
    RowSpan?: number;
}


interface ISizingProps extends ISizingElementProps, PropsWithChildren {
    Containered?: boolean;
}

export const Sizing: React.FC<ISizingProps> = (props) => {
    let classes = '';
    if (props.Containered) {
        switch (props.ColSpan) {
            case '1/2': classes += 'col-span-12 @xl:col-span-6'; break;
            case '1/3': classes += 'col-span-12 @xl:col-span-4'; break;
            case '2/3': classes += 'col-span-12 @xl:col-span-8'; break;
            case '3/4': classes += 'col-span-12 @xl:col-span-9'; break;
            case '1/4': classes += 'col-span-12 @xl:col-span-3'; break;
            case 'full': classes += 'col-span-12'; break;
            default: classes += 'col-span-12 '; break;
        }
    } else {
        switch (props.ColSpan) {
            case '1/2': classes += 'col-span-12 xl:col-span-6'; break;
            case '1/3': classes += 'col-span-12 xl:col-span-4'; break;
            case '2/3': classes += 'col-span-12 xl:col-span-8'; break;
            case '3/4': classes += 'col-span-12 xl:col-span-9'; break;
            case '1/4': classes += 'col-span-12 xl:col-span-3'; break;
            case 'full': classes += 'col-span-12'; break;
            default: classes += 'col-span-12 '; break;
        }
    }

    const style: React.CSSProperties = {};
    if (props.RowSpan) {
        style.gridRow = `span ${props.RowSpan}`;
    }

    return (
        <div className={`${classes}`} style={style}>
            {props.children}
        </div>
    )
}