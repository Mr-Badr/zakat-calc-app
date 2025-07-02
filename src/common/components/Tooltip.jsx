import React, { useState } from 'react';

export const Tooltip = ({ content, children, placement = 'top' }) => {
  const [visible, setVisible] = useState(false);
  return (
    <span className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
    >
      {children}
      {visible && (
        <span
          className={`z-50 absolute whitespace-pre-line px-3 py-2 rounded-lg shadow-lg text-xs font-medium bg-gray-900 text-white transition-opacity duration-200
            ${placement === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : ''}
            ${placement === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-2' : ''}
            ${placement === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2' : ''}
            ${placement === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' : ''}
          `}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
}; 