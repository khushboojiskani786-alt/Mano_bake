import React from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, X, AlertCircle } from 'lucide-react';

export const Notification: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div id="toast-wrapper" className="fixed top-24 right-4 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="pointer-events-auto bg-secondary border border-primary/40 rounded-lg p-4 shadow-xl flex items-start gap-3 backdrop-blur-md"
          >
            {toast.type === 'success' && (
              <div className="bg-primary/20 text-text-dark rounded-full p-1 self-start">
                <Check className="h-4 w-4" />
              </div>
            )}
            {toast.type === 'info' && (
              <div className="bg-accent/20 text-text-dark rounded-full p-1 self-start">
                <Info className="h-4 w-4" />
              </div>
            )}
            {toast.type === 'error' && (
              <div className="bg-red-100 text-red-800 rounded-full p-1 self-start">
                <AlertCircle className="h-4 w-4" />
              </div>
            )}

            <div className="flex-1">
              <p className="text-sm font-medium text-text-dark">{toast.text}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-light hover:text-text-dark transition-colors duration-200 self-start p-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
