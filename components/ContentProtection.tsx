"use client";
import { useEffect } from 'react';

export default function ContentProtection() {
  useEffect(() => {
    // Disable right-click context menu
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection
    const disableSelection = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop for images
    const disableDragDrop = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for developer tools and other actions
    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      // Disable F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+C (Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+S (Save As)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+A (Select All)
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+P (Print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+C (Copy)
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+V (Paste)
      if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+X (Cut)
      if (e.ctrlKey && e.key === 'x') {
        e.preventDefault();
        return false;
      }
    };

    // Disable image saving on mobile (long press)
    const disableLongPress = (e: TouchEvent) => {
      if (e.touches.length > 1) return; // Allow multi-touch gestures
      
      let timer: NodeJS.Timeout;
      
      const startTimer = () => {
        timer = setTimeout(() => {
          e.preventDefault();
        }, 500); // 500ms for long press
      };

      const clearTimer = () => {
        clearTimeout(timer);
      };

      startTimer();
      
      document.addEventListener('touchend', clearTimer, { once: true });
      document.addEventListener('touchmove', clearTimer, { once: true });
    };

    // Detect developer tools (basic detection)
    const detectDevTools = () => {
      const threshold = 160;
      
      setInterval(() => {
        if (
          window.outerHeight - window.innerHeight > threshold ||
          window.outerWidth - window.innerWidth > threshold
        ) {
          // Developer tools might be open
          console.clear();
          console.log('%cStop!', 'color: red; font-size: 50px; font-weight: bold;');
          console.log('%cThis is a browser feature intended for developers. Content is protected.', 'color: red; font-size: 16px;');
        }
      }, 1000);
    };

    // Add event listeners
    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('selectstart', disableSelection);
    document.addEventListener('dragstart', disableDragDrop);
    document.addEventListener('keydown', disableKeyboardShortcuts);
    document.addEventListener('touchstart', disableLongPress, { passive: false });

    // Disable image dragging specifically
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('dragstart', disableDragDrop);
      img.style.userSelect = 'none';
      (img.style as any).webkitUserSelect = 'none';
      img.style.pointerEvents = 'none';
      (img.style as any).webkitTouchCallout = 'none';
    });

    // Apply CSS to prevent selection and dragging
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      img, video, svg {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
      
      /* Allow interaction for buttons and interactive elements */
      button, a, input, textarea, select, [role="button"] {
        pointer-events: auto !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }

      /* Prevent text selection highlighting */
      ::selection {
        background: transparent !important;
      }
      
      ::-moz-selection {
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);

    // Start developer tools detection
    detectDevTools();

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('selectstart', disableSelection);
      document.removeEventListener('dragstart', disableDragDrop);
      document.removeEventListener('keydown', disableKeyboardShortcuts);
      document.removeEventListener('touchstart', disableLongPress);
      
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return null; // This component doesn't render anything
}
