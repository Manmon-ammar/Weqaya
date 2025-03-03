import React from 'react';
import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className={styles.loading}> 
            <svg width="16px" height="12px">
                <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6" />
                <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6" />
            </svg>
        </div>
    );
}
