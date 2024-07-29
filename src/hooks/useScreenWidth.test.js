import { renderHook, act } from '@testing-library/react'; // Import testing utilities for rendering and interacting with hooks
import useScreenWidth from './useScreenWidth'; // Import the hook to be tested

describe('useScreenWidth hook', () => {
    /**
     * Before all tests, set up a mock for the global window.innerWidth property.
     * This simulates an initial screen width for testing purposes.
     */
    beforeAll(() => {
        global.innerWidth = 800; // Set initial screen width to 800 pixels
    });

    /**
     * After each test, restore the original behavior of mocked functions.
     * This ensures tests are clean and isolated.
     */
    afterEach(() => {
        jest.restoreAllMocks(); // Restore original implementation of all mocked functions
    });

    /**
     * Test case to verify that the hook returns the initial screen width.
     */
    test('should return initial screen width', () => {
        // Render the hook
        const { result } = renderHook(() => useScreenWidth());

        // Assert that the hook returns the initial screen width
        expect(result.current).toBe(800); // Should be 800 as set in beforeAll
    });

    /**
     * Test case to verify that the hook updates the screen width on window resize.
     */
    test('should update screen width on resize', () => {
        // Render the hook
        const { result } = renderHook(() => useScreenWidth());

        // Simulate a resize event by changing the global innerWidth and dispatching a resize event
        act(() => {
            global.innerWidth = 1200; // Set new screen width
            window.dispatchEvent(new Event('resize')); // Dispatch resize event
        });

        // Assert that the hook updates with the new width
        expect(result.current).toBe(1200); // Should be 1200 after resize
    });

    /**
     * Test case to verify that the hook cleans up event listeners on unmount.
     */
    test('should clean up event listeners on unmount', () => {
        // Spy on window.removeEventListener to verify cleanup
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        // Render the hook
        const { unmount } = renderHook(() => useScreenWidth());

        // Unmount the hook to trigger cleanup
        unmount();

        // Assert that removeEventListener was called to clean up the resize event listener
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});

