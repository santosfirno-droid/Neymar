import React, { useEffect } from 'react';
import { Check, ShoppingBag } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 pointer-events-none flex justify-center sm:justify-end animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-bold border border-emerald-400/40">
        <div className="w-5 h-5 rounded-full bg-white text-emerald-700 flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 stroke-[3]" />
        </div>
        <span>{message}</span>
      </div>
    </div>
  );
};
