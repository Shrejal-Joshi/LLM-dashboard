// src/components/WidgetShell.tsx
import React from 'react';
import clsx from 'clsx';

export const WidgetShell: React.FC<{
  title?: string;
  onRemove?: () => void;
  children?: React.ReactNode;
}> = ({ title, onRemove, children }) => {
  return (
    <div className={clsx('bg-white rounded-xl shadow p-3 h-full flex flex-col')}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        <div>
          {onRemove && (
            <button onClick={onRemove} className="text-xs px-2 py-1 rounded bg-red-50 text-red-600">
              Remove
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};
