import React from 'react';
import {Button} from 'react-bootstrap'
import styles from './StatusBlock.module.css'

const StatusBlock = ({tasks, setStatus, status }) => {
    return (
        <div className={styles.row}>
            <Button variant="primary" onClick={()=> setStatus('total')}>Total: {tasks.length}</Button>
            <Button variant="success" onClick={()=> setStatus('success')}>Success: {tasks.filter((item) => item.success).length}</Button>
            <Button variant="warning" onClick={()=> setStatus('pending')}>Pending: {tasks.filter((item) => item.pending).length}</Button>
        </div>
    );
};

export default StatusBlock;