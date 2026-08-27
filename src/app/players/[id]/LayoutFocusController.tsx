'use client';

import { useEffect } from 'react';

export default function LayoutFocusController() {
  useEffect(() => {
    // 1. Hide the global layout navbar (header) and footer (footer)
    const navbar = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    // 2. Remove standard padding & max width on root main container to allow full width
    const mainContainer = document.querySelector('main');
    let originalPadding = '';
    let originalMaxWidth = '';
    
    if (mainContainer) {
      originalPadding = mainContainer.style.padding || '';
      originalMaxWidth = mainContainer.style.maxWidth || '';
      
      // Force fullscreen spacing
      mainContainer.style.padding = '0';
      mainContainer.style.maxWidth = '100%';
    }

    // Restores elements when navigating back to other pages
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (mainContainer) {
        mainContainer.style.padding = originalPadding;
        mainContainer.style.maxWidth = originalMaxWidth;
      }
    };
  }, []);

  return null;
}
