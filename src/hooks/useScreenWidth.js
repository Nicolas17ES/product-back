import { useState, useEffect } from "react"; // Import React hooks for state management and side effects

/**
 * Custom hook to track the current screen width and update it on window resize.
 * 
 * This hook provides the current width of the browser window and automatically updates
 * this value whenever the window is resized. It uses `window.innerWidth` to get the
 * initial screen width and listens to the `resize` event to keep the width up to date.
 * 
 * @returns {number} - The current width of the browser window.
 */
const useScreenWidth = () => {
    // State variable to store the current screen width
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    /**
     * Effect to handle window resize events and update the screen width.
     * 
     * Registers an event listener for the `resize` event to update the screen width state
     * whenever the window is resized. Cleans up the event listener on component unmount.
     */
    useEffect(() => {
        // Function to update the screen width state
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    return screenWidth; // Return the current screen width
};

export default useScreenWidth;
