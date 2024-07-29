import { renderHook, act } from '@testing-library/react';
import useAspectRatio from './useAspectRatio';

/**
 * @description
 * The test suite for the `useAspectRatio` hook. This suite includes tests for the initial state of the hook,
 * handling image load, and updating dimensions based on aspect ratio and screen width.
 *
 * Mocking `window.innerWidth` to control its value during tests ensures consistency in test results.
 */

// Mocking window.innerWidth to control its value during tests
const originalInnerWidth = window.innerWidth;
const mockScreenWidth = 1024;

describe('useAspectRatio hook', () => {
    /**
     * @description
     * Restore the original `window.innerWidth` value after all tests have completed.
     */
    afterAll(() => {
        window.innerWidth = originalInnerWidth;
    });


    /**
     * @description
     * Set the mock value for `window.innerWidth` before each test to ensure a consistent testing environment.
     */

    beforeEach(() => {
        // Set the mock value for window.innerWidth
        window.innerWidth = mockScreenWidth;
    });

    /**
     * @test {initial state and handleImageLoad function}
     * @description
     * This test verifies the initial state of the hook and the behavior of the `handleImageLoad` function.
     * It checks that the initial `aspectRatio` is null, `isLoading` is true, and dimensions are set to default values.
     * It also verifies that `handleImageLoad` correctly updates the aspect ratio and loading state based on the provided image reference.
     */

    test('initial state and handleImageLoad function', () => {
        // Render the hook
        const { result } = renderHook(() => useAspectRatio());

        // Assert initial state values
        expect(result.current.aspectRatio).toBeNull();  // Initially, aspectRatio should be null
        expect(result.current.isLoading).toBe(true);  // Initially, isLoading should be true
        expect(result.current.dimensionsImageOne).toEqual({ imageHeight: 0, imageWidth: 0, textHeight: 100 });  // Default dimensions
        expect(result.current.dimensionsImageTwo).toEqual({ imageHeight: 0, imageWidth: 0, textHeight: 100 });  // Default dimensions

        // Mock image reference
        const mockImageRef = {
            current: {
                naturalWidth: 800,
                naturalHeight: 600
            }
        };

        // Use act to perform state updates
        act(() => {
            result.current.handleImageLoad(mockImageRef);
        });

        // Assert updated state values after handleImageLoad is called
        expect(result.current.aspectRatio).toBe(mockImageRef.current.naturalWidth / mockImageRef.current.naturalHeight);  // Check if aspectRatio is updated
        expect(result.current.isLoading).toBe(false);  // After loading, isLoading should be false
    });

    /**
     * @test {updates dimensions based on aspectRatio and screenWidth}
     * @description
     * This test verifies that the hook correctly updates image dimensions based on the calculated aspect ratio and screen width.
     * It checks that after calling `handleImageLoad` and simulating a resize event, the dimensions of `dimensionsImageOne`
     * and `dimensionsImageTwo` are updated to the expected values.
     *
     * Note: `dimensionsImageTwo.imageHeight` is verified against the container size minus text height to match the calculated logic.
     */

    test('updates dimensions based on aspectRatio and screenWidth', () => {
        // Render the hook
        const { result } = renderHook(() => useAspectRatio());

        // Mock image reference
        const mockImageRef = {
            current: {
                naturalWidth: 800,
                naturalHeight: 400
            }
        };

        // Trigger image load to set aspect ratio
        act(() => {
            result.current.handleImageLoad(mockImageRef);
        });

        // Trigger a resize event to update screen width
        act(() => {
            window.dispatchEvent(new Event('resize'));
        });


        // Calculate expected values
        const containerSize = mockScreenWidth < 600 ? 300 : 500;
        const expectedImageHeightOne = containerSize / (mockImageRef.current.naturalWidth / mockImageRef.current.naturalHeight);
        const expectedImageHeightTwo = containerSize; // For option two, it should be containerSize as per the logic
        // Check updated values after handleImageLoad and screen resize
        expect(result.current.dimensionsImageOne.imageHeight).toBeCloseTo(expectedImageHeightOne, 1);  // Using tolerance of 1
        expect(result.current.dimensionsImageTwo.imageHeight).toBeCloseTo(expectedImageHeightTwo - result.current.dimensionsImageTwo.textHeight, 1);  // As per your hook's logic
    });
});
