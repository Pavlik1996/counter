
const initialState = {
    value: 0,
    maxValue: 0,
    minValue: 0
}

type initialStateType = typeof initialState

export const counterReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'INC-COUNT':
            return { ...state, value: state.value + 1 }
        case 'SET-CURRENT-COUNT':
            return { ...state, value: action.value }
        case 'SET-MAX-VALUE':
            return { ...state, maxValue: action.value }
        case 'SET-MIN-VALUE':
            return { ...state, minValue: action.value }
        default: return state
    }
}

export const setMaxValueAC = (value: number) => ({ type: 'SET-MAX-VALUE', value } as const)
export const setMinValueAC = (value: number) => ({ type: 'SET-MIN-VALUE', value } as const)
export const setCountAC = (value: number) => ({ type: 'SET-CURRENT-COUNT', value } as const)
export const incCountAC = () => ({ type: 'INC-COUNT' } as const)


type setCountType = ReturnType<typeof setCountAC>
type incCountType = ReturnType<typeof incCountAC>
type setMinValueType = ReturnType<typeof setMinValueAC>
type setMaxValueTYpe = ReturnType<typeof setMaxValueAC>

type ActionsType =
    | setCountType
    | incCountType
    | setMinValueType
    | setMaxValueTYpe