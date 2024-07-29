import { toast } from 'react-toastify'; // Import toast for displaying notifications

/**
 * Upload an image and handle the response.
 * 
 * @async
 * @function
 * @param {Function} dispatch - The dispatch function from the useReducer hook.
 * @param {FormData} formData - The FormData object containing the image file and any other data.
 * 
 * @returns {Promise<void>} - A promise that resolves when the image is successfully uploaded and processed.
 */
export const uploadImage = async (dispatch, formData) => {
    dispatch({ type: 'SET_LOADING_MESSAGE', payload: 'Generating PDF...' }); 
    // Extract the file name from FormData and remove any image file extension
    const fileNameWithExtension = formData.get('name') || 'generated'; // Default to 'generated' if no name is provided
    const fileName = fileNameWithExtension.replace(/\.(jpg|jpeg|png)$/i, ''); // Remove image file extensions (jpg, jpeg, png)

    try {
        // Send a POST request to upload the image and generate a PDF
        const response = await fetch("/pdf/generate", {
            method: "POST", // HTTP method for the request
            body: formData, // The FormData object containing the image
        });

        // Check if the response is not OK (status code outside of 200-299 range)
        if (!response.ok) {
            // Attempt to read the response body as JSON
            const errorResponse = await response.json();
            const errorMessage = errorResponse.error || 'An unknown error occurred'; // Default error message
            toast.error(`Error: ${errorMessage}`); // Display error notification
            throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`); // Throw an error with status and message
        }

        // Get the response as a Blob (binary data)
        const blob = await response.blob();

        // Create a URL for the Blob to trigger a file download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob); // Create a URL for the Blob object
        link.download = `${fileName}.pdf`; // Set the filename for the downloaded PDF
        link.click(); // Trigger the download by simulating a click

        // Clean up the URL object to free memory
        window.URL.revokeObjectURL(link.href);

        // Dispatch actions to update the state
        dispatch({ type: 'SET_IS_LOADING', payload: false }); // Hide loading spinner
        dispatch({ type: 'SET_IS_PDF_READY', payload: true }); // Set PDF ready state to true
        dispatch({ type: 'SET_LOADING_MESSAGE', payload: '' }); 

        return

    } catch (error) {
        // Error handling
        const errorMessage = error.message || 'An unknown error occurred'; // Default error message
        toast.error(`Error: ${errorMessage}`); // Display error notification
    }
};

