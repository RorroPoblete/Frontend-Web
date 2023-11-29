import React from 'react';
import './PrimaryButton.css';

function PrimaryButton({href, text}) {
    return (
        <a href={href} className="primary-button">{text}</a>
    );
}

export default PrimaryButton;