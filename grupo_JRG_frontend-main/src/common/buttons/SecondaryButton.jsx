import React from 'react';
import './SecondaryButton.css';

function SecondaryButton({href, text}) {
    return (
        <a href={href} className="secondary-button">{text}</a>
    );
}

export default SecondaryButton;