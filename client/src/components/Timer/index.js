import React, { useState, useEffect } from 'react';
import { userAnswer } from '../../redux/actions/action.js'
import { useSelector, useDispatch } from 'react-redux'

function Timer({handleSubmit}){
    const [timeUp, setTimeUp] = useState(false)
    const [timer, setTimer] = useState(10)

    const socketConnection = useSelector(state => state.player.socketConnection)

    socketConnection.socketConnect.on('countdown', (time) => {
        setTimer(time);
    })
    
    socketConnection.socketConnect.on('timeUp',() => {
        setTimeUp(true)
        
    })

    useEffect(() => {
        if(timeUp){
            handleSubmit()
            setTimeUp(false)
            console.log('called', timeUp)
        }
        console.log('called2', timeUp)
    }, [timeUp])

    return (<p>Timer: {timer}</p>)
}

export default Timer