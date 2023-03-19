import React, {ChangeEvent, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {SuperButton} from "./componentsforcount/SuperButton";
import { incCountAC, setCountAC, setMaxValueAC, setMinValueAC } from './redux/counter-reducer';
import { AppRootStateType } from './redux/store';

function App() {
    
    const dispatch = useDispatch()
    const count = useSelector<AppRootStateType, number>(s => s.counter.value)
    const minValueCount = useSelector<AppRootStateType, number>(s => s.counter.minValue)
    const maxValueCount = useSelector<AppRootStateType, number>(s => s.counter.maxValue)

    // const [count, setCount] = useState(0)

    // const [maxValueCount, setMaxValueCount] = useState<number>()
    // const [minValueCount, setMinValueCount] = useState<number>()

    const [disableIncRes, setDisableIncRes] = useState(false)
    const [buttonSet, setButtonSet] = useState(false)

    // useEffect(() => {
    //     let valueMinString = localStorage.getItem('counterValueMin')
    //     if (valueMinString) {
    //         let newValue = JSON.parse(valueMinString)
    //         // setCount(newValue)
    //         dispatch(setCountAC(newValue))
    //         // setMinValueCount(newValue)
    //         dispatch(setMinValueAC(newValue))
    //         setButtonSet(true)
    //     } else {
    //         setButtonSet(true)
    //         setDisableIncRes(true)
    //     }
    //     let valueMaxString = localStorage.getItem('counterValueMax')
    //     if (valueMaxString) {
    //         let newValue = JSON.parse(valueMaxString)
    //         // setMaxValueCount(newValue)
    //         dispatch(setMaxValueAC(newValue))
    //         setButtonSet(true)
    //     } else {
    //         setButtonSet(true)
    //         setDisableIncRes(true)
    //     }
    // }, [])

    const flagInc = count === maxValueCount ? true : disableIncRes
    const flagReset = disableIncRes
    const flagSet = buttonSet

    const countAddButtonHandler = () => {
        // setCount(count + 1)
        dispatch(incCountAC())
    }
    const countResetHandler = () => {
        // setCount(Number(minValueCount))
        dispatch(setCountAC(minValueCount))
    }

    const setToLocalStorageHandler = () => {
        localStorage.setItem('counterValueMax', JSON.stringify(maxValueCount))
        localStorage.setItem('counterValueMin', JSON.stringify(minValueCount))
        // setCount(Number(minValueCount))
        dispatch(setMinValueAC(minValueCount))
        setDisableIncRes(false)
        setButtonSet(true)
    }

    const onChangeInputMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setMaxValueCount(+e.currentTarget.value)
        dispatch(setMaxValueAC(+e.currentTarget.value))
        setDisableIncRes(true)
        setButtonSet(false)
        if (+e.currentTarget.value <= Number(minValueCount)) {
            setButtonSet(true)
        } else setButtonSet(false)
    }

    const onChangeInputMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setMinValueCount(+e.currentTarget.value)
        dispatch(setMinValueAC(+e.currentTarget.value))
        setDisableIncRes(true)
        if (+e.currentTarget.value >= Number(maxValueCount)) {
            setButtonSet(true)
        } else setButtonSet(false)

    }

    const render = () => {
        if (Number(maxValueCount) <= Number(minValueCount)) {
            return <div style={{color: "red"}}>Incorrect value!</div>
        }
        if (Number(minValueCount) < 0) {
            return <div style={{color: "red"}}>Incorrect value!</div>
        }
        if (!disableIncRes) {
            return count
        } else {
            return <p className={'setStyle'}>enter values and press 'set'</p>
        }
    }

    const displayRender = render()

    const styleH = count === maxValueCount ? 'red' : 'enter'

    return (
        <div className={'wrapper'}>
            <div className={'wrapper2'}>
                <div className={'borderOne'}>
                    <div className={'borderTwo'}>
                        <div>
                            max value:
                            <input value={maxValueCount} type={'number'} onChange={onChangeInputMaxHandler}/>
                        </div>
                        <div>
                            start vale:
                            <input value={minValueCount} type={'number'} onChange={onChangeInputMinHandler}/>
                        </div>
                    </div>

                    <div className={'borderButton'}>
                        <SuperButton callBack={setToLocalStorageHandler} disable={flagSet}
                                     className={'button'}>set</SuperButton>
                    </div>
                </div>
                <div>

                </div>
                <div className={'borderOne'}>
                    <div className={'borderTwo'}>
                        <h1 className={styleH}>
                            {displayRender}
                        </h1>
                    </div>
                    <div className={'borderButton'}>
                        <SuperButton callBack={countAddButtonHandler} disable={flagInc}
                                     className={'button'}>inc</SuperButton>
                        <SuperButton callBack={countResetHandler} disable={flagReset}
                                     className={'buttonRes'}>reset</SuperButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
