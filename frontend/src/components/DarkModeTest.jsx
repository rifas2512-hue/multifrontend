import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/slices/uiSlice';

const DarkModeTest = () => {
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();

  return (
    <div className="p-4 m-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Dark Mode Test
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Current theme: <span className="font-bold">{theme}</span>
      </p>
      <button
        onClick={() => dispatch(toggleTheme())}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Toggle Theme
      </button>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Class on html: {document.documentElement.classList.contains('dark') ? 'dark ✓' : 'light ✗'}
      </p>
    </div>
  );
};

export default DarkModeTest;
