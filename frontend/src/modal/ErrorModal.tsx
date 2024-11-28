import * as React from 'react'
import * as ReactDOM from 'react-dom'

const ErrorModal: React.FC<{
    children: React.ReactNode
    onClose: () => void
}> = (props) => {
    const modalContent = (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
        >
            <button
                onClick={props.onClose}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'traqnsparent',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                x
            </button>
            {props.children}
        </div>)

    return ReactDOM.createPortal(modalContent, document.getElementById('portal-root')!)
}

export default ErrorModal