import React from 'react';

/**
 * Renders an icon using inline SVG (standard practice in React projects without a dedicated icon library)
 * @param {string} name - The name of the icon (e.g., 'sprout', 'leaf')
 * @param {string} className - Tailwind CSS classes for styling
 */
const Icon = ({ name, className = "w-5 h-5" }) => {
    // A simplified placeholder for Lucide icons using SVGs or Emojis
    const icons = {
        sprout: <span role="img" aria-label="sprout">🌱</span>,
        leaf: <span role="img" aria-label="leaf">🌿</span>,
        droplet: <span role="img" aria-label="droplet">💧</span>,
        'clipboard-list': <span role="img" aria-label="list">📋</span>,
        'check-circle': <span role="img" aria-label="check">✅</span>,
        'alert-triangle': <span role="img" aria-label="warning">⚠️</span>,
        user: <span role="img" aria-label="user">👤</span>,
        'log-out': <span role="img" aria-label="logout">🚪</span>,
    };
    
    const IconContent = icons[name] || <span>?</span>;

    return <span className={`inline-block align-middle ${className}`}>{IconContent}</span>;
};

export default Icon;