import React, {FC} from 'react';

type PropsType = {
    callBack: () => void
    disable: boolean
    className: string
    children: React.ReactNode
}

export const SuperButton: FC<PropsType> = (
    {
        className,
        disable,
        callBack,
        children
    }
) => {
    return (
        <button
            className={className}
            disabled={disable}
            onClick={callBack}>
            {children}
        </button>
    )
};

