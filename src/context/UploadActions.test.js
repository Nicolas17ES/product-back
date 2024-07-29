// Import the uploadImage function from UploadActions to be tested
import { uploadImage } from './UploadActions';
// Import toast for error handling
import { toast } from 'react-toastify';

// Mock the global fetch function for network requests
global.fetch = jest.fn();

// Mock the toast module for displaying error messages
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(), // Mock the error method of toast
    },
}));

// Mock the URL methods used to handle Blob URLs
const createObjectURL = jest.fn(); // Mock function for creating object URLs
const revokeObjectURL = jest.fn(); // Mock function for revoking object URLs

// Replace the URL methods with the mocked versions
window.URL.createObjectURL = createObjectURL;
window.URL.revokeObjectURL = revokeObjectURL;

describe('uploadImage function', () => {
    // Setup before each test runs
    beforeEach(() => {
        // Clear any previous mock calls and results
        jest.clearAllMocks();
        // Mock URL.createObjectURL to return a dummy URL
        createObjectURL.mockReturnValue('dummy-url');
    });

    /**
     * Test the scenario where the image is successfully uploaded and download is triggered.
     * 
     * @test {successfully uploads an image and triggers download}
     * @description This test checks if the uploadImage function correctly handles a successful image upload,
     *              triggers the creation of a Blob URL, and initiates a file download.
     */
    test('successfully uploads an image and triggers download', async () => {
        // Create a mock File object representing an image file
        const file = new File(['mock image content'], 'test.png', { type: 'image/png' });

        // Mock the fetch response for a successful image upload
        global.fetch.mockResolvedValueOnce({
            ok: true, // Simulate a successful response
            blob: jest.fn().mockResolvedValue(new Blob()), // Mock Blob response
        });

        // Mock the dispatch function from context
        const dispatch = jest.fn();

        // Create a FormData object and append the mock file and name
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', 'test.png');

        // Mock document.createElement to return a mock anchor element with a click method
        document.createElement = jest.fn().mockImplementation((tagName) => {
            if (tagName === 'a') {
                return {
                    href: '', // URL to be set
                    download: '', // Filename for the download
                    click: jest.fn(), // Mock click method
                };
            }
            // For other tag names, use the default behavior
            return document.createElement(tagName);
        });

        // Call the uploadImage function
        await uploadImage(dispatch, formData);

        // Verify that fetch was called with the correct URL and options
        expect(fetch).toHaveBeenCalledWith("/pdf/generate", {
            method: "POST",
            body: formData,
        });

        // Verify that dispatch was called with the correct actions
        expect(dispatch).toHaveBeenCalledWith({ type: 'SET_LOADING_MESSAGE', payload: 'Generating PDF...' });
        expect(dispatch).toHaveBeenCalledWith({ type: 'SET_IS_LOADING', payload: false });
        expect(dispatch).toHaveBeenCalledWith({ type: 'SET_IS_PDF_READY', payload: true });
        expect(dispatch).toHaveBeenCalledWith({ type: 'SET_LOADING_MESSAGE', payload: '' });

        // Verify that createObjectURL and revokeObjectURL were called
        expect(createObjectURL).toHaveBeenCalled();
        expect(revokeObjectURL).toHaveBeenCalled();
    });

    /**
     * Test the scenario where an error occurs during image upload.
     * 
     * @test {handles errors correctly}
     * @description This test verifies that the uploadImage function handles errors correctly by displaying an error toast
     *              and ensuring that dispatch is not called when the fetch request fails.
     */
    test('handles errors correctly', async () => {
        // Mock the fetch response for an error
        global.fetch.mockResolvedValueOnce({
            ok: false, // Simulate a failed response
            json: jest.fn().mockResolvedValue({ error: 'Test error' }), // Mock JSON response with an error message
        });

        // Mock the dispatch function from context
        const dispatch = jest.fn();

        // Create a FormData object with only the name field
        const formData = new FormData();
        formData.append('name', 'test.jpg');

        // Call the uploadImage function
        await uploadImage(dispatch, formData);

        // Verify that toast.error was called with the correct error message
        expect(toast.error).toHaveBeenCalledWith('Error: Test error');

        // Verify that dispatch was called with the initial loading message
        expect(dispatch).toHaveBeenCalledWith({ type: 'SET_LOADING_MESSAGE', payload: 'Generating PDF...' });

        // Verify that dispatch was not called with other actions
        expect(dispatch).not.toHaveBeenCalledWith({ type: 'SET_IS_LOADING', payload: false });
        expect(dispatch).not.toHaveBeenCalledWith({ type: 'SET_IS_PDF_READY', payload: true });
        expect(dispatch).not.toHaveBeenCalledWith({ type: 'SET_LOADING_MESSAGE', payload: '' });
    });
});
