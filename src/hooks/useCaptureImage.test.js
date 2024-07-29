// Import necessary utilities from @testing-library/react for testing hooks
import { renderHook, act } from '@testing-library/react';

// Import the hook to be tested
import useCaptureImage from './useCaptureImage';

// Import the html-to-image library and uploadImage function to be mocked
import * as htmlToImage from 'html-to-image';
import { uploadImage } from '../context/UploadActions';

// Mock the html-to-image library's toPng function
jest.mock('html-to-image', () => ({
    toPng: jest.fn(), // Mock implementation of toPng
}));

// Mock the uploadImage function from UploadActions
jest.mock('../context/UploadActions', () => ({
    uploadImage: jest.fn(), // Mock implementation of uploadImage
}));

describe('useCaptureImage hook', () => {
    // Mock dispatch function to simulate dispatching actions
    let dispatchMock;
    // Sample image name to be used in tests
    const name = 'test-image';

    /**
     * Setup before each test runs to ensure a clean test environment.
     */
    beforeEach(() => {
        // Clear all previous mock calls and results
        jest.clearAllMocks();
        // Initialize the mock dispatch function
        dispatchMock = jest.fn();
    });

    /**
     * Test the initial state of the hook.
     * 
     * @test {initial state is correct}
     * @description This test verifies that the initial state of capturedImage is null when the hook is first rendered.
     */
    test('initial state is correct', () => {
        // Render the hook and obtain the result
        const { result } = renderHook(() => useCaptureImage(dispatchMock, name));
        // Assert that the initial state of capturedImage is null
        expect(result.current.capturedImage).toBeNull();
    });

    /**
     * Test if handleSelectImage correctly updates the capturedImage state.
     * 
     * @test {handleSelectImage updates capturedImage state}
     * @description This test checks if the handleSelectImage function correctly updates the capturedImage state with the selected DOM element.
     */
    test('handleSelectImage updates capturedImage state', () => {
        // Create a mock DOM element
        const mockElement = document.createElement('div');
        // Mock document.querySelector to return the mockElement
        document.querySelector = jest.fn().mockReturnValue(mockElement);

        // Render the hook and obtain the result
        const { result } = renderHook(() => useCaptureImage(dispatchMock, name));

        // Use act to perform state updates
        act(() => {
            // Call handleSelectImage with image number 1
            result.current.handleSelectImage(1);
        });

        // Assert that capturedImage state is updated to the mockElement
        expect(result.current.capturedImage).toBe(mockElement);
        // Assert that document.querySelector was called with the correct selector
        expect(document.querySelector).toHaveBeenCalledWith('.preview-container-one');
    });

    /**
     * Test if handleSubmit captures an image and calls uploadImage correctly.
     * 
     * @test {handleSubmit captures image and calls uploadImage}
     * @description This test verifies that the handleSubmit function correctly captures an image from the selected DOM element,
     *              converts it to a PNG Data URL, fetches the image as a Blob, and calls uploadImage with the correct FormData.
     */
    test('handleSubmit captures image and calls uploadImage', async () => {
        // Create a mock DOM element
        const mockElement = document.createElement('div');
        // Mock document.querySelector to return the mockElement
        document.querySelector = jest.fn().mockReturnValue(mockElement);

        // Fake Data URL to be returned by htmlToImage.toPng
        const fakeDataUrl = 'data:image/png;base64,example';
        // Mock htmlToImage.toPng to resolve with the fakeDataUrl
        htmlToImage.toPng.mockResolvedValue(fakeDataUrl);

        // Fake Blob and File to simulate image data
        const fakeBlob = new Blob(['mock image content'], { type: 'image/png' });
        global.fetch = jest.fn().mockResolvedValue({
            ok: true, // Simulate a successful fetch response
            blob: jest.fn().mockResolvedValue(fakeBlob), // Mock Blob response
        });

        // Render the hook and obtain the result
        const { result } = renderHook(() => useCaptureImage(dispatchMock, name));

        // Use act to perform state updates
        act(() => {
            // Call handleSelectImage with image number 1
            result.current.handleSelectImage(1);
        });

        // Use act to handle the asynchronous submission
        await act(async () => {
            // Call handleSubmit with a mock event object
            await result.current.handleSubmit({ preventDefault: jest.fn() });
        });

        // Assert that htmlToImage.toPng was called with the correct element and options
        expect(htmlToImage.toPng).toHaveBeenCalledWith(mockElement, {
            backgroundColor: undefined,
            width: 500,
            height: 500,
            quality: 0.8,
        });

        // Assert that fetch was called with the fakeDataUrl
        expect(global.fetch).toHaveBeenCalledWith(fakeDataUrl);
        // Assert that uploadImage was called with the mock dispatch function and a FormData object
        expect(uploadImage).toHaveBeenCalledWith(dispatchMock, expect.any(FormData));
    });
});
