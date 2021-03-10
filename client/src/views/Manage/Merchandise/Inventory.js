import React from 'react'
import Dashboard from '../../../components/DashBoard/Dashboard';
import NotifyScaleUp from '../../Notify/NotifyScaleUp'
const Inventory = () => {
    return (
        <Dashboard nameSelect="Kiểm kho" defaulCheckKey="2">
             <NotifyScaleUp/>
        </Dashboard>
    )
}

export default Inventory
