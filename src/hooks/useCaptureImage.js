import { useState } from "react"; // Import the useState hook from React for managing state
import * as htmlToImage from 'html-to-image'; // Import html-to-image library for capturing HTML as images
import { uploadImage } from '../context/UploadActions'; // Import uploadImage action for uploading captured images

/**
 * Custom hook to capture an HTML element as an image and upload it.
 * 
 * This hook provides functionality to capture an HTML element as an image and upload it using
 * a provided dispatch function and image name. It manages the state for the captured image
 * and handles the image submission and upload process.
 * 
 * @param {Function} dispatch - Function to dispatch actions to the global state (e.g., React Context).
 * @param {string} name - The name to be used for the uploaded image file.
 * 
 * @returns {Object} - An object containing various properties and functions:
 *  - {Function} handleSubmit - Function to capture the image and handle the upload process.
 *  - {Function} handleSelectImage - Function to set the captured image element based on selection.
 *  - {Object|null} capturedImage - The currently selected image element to be captured, or null if not selected.
 */
const useCaptureImage = (dispatch, name) => {
    // State to store the currently selected image element
    const [capturedImage, setCapturedImage] = useState(null);

    /**
     * Function to handle form submission, capture the selected element as an image,
     * and upload the image using the uploadImage action.
     * 
     * @param {Object} e - The event object from the form submission.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        dispatch({ type: 'SET_IS_LOADING', payload: true }); // Set loading state to true
        dispatch({ type: 'SET_LOADING_MESSAGE', payload: 'Transforming image...' }); // Set loading state to true

        // Select the element to capture, default to .preview-container if no image is selected
        let element = capturedImage ? capturedImage : document.querySelector('.preview-container');

        if (element) {
            try {
                // Capture the element as a PNG image
                const dataUrl = await htmlToImage.toPng(element, {
                    backgroundColor: undefined,
                    height: 500,
                    width: 500,
                    quality: 0.8
                });

                if (dataUrl) {
                    // Convert the data URL to a Blob
                    const response = await fetch(dataUrl);
                    const blob = await response.blob();
                    // Create a File object from the Blob
                    const file = new File([blob], name, { type: 'image/png' });

                    // Create a FormData object to hold the file and name
                    const formData = new FormData();
                    formData.append('image', file);
                    formData.append('name', name);

                    // Upload the image using the uploadImage action
                    uploadImage(dispatch, formData);
                }

            } catch (error) {
                // Log any errors that occur during the image capture or upload process
                console.error("Error capturing image:", error);
            }
        }
    };

    /**
     * Function to select the image element to be captured based on the provided image number.
     * 
     * @param {number} imageNumber - The number indicating which image container to select (1 or 2).
     */
    const handleSelectImage = (imageNumber) => {
        // Select the image container based on the provided number
        const container = imageNumber === 1 ? document.querySelector('.preview-container-one') : document.querySelector('.preview-container-two');
        setCapturedImage(container); // Set the selected image container
    };

    return {
        handleSubmit,        // Function to handle form submission and image upload
        handleSelectImage,  // Function to select the image element to be captured
        capturedImage        // The currently selected image element or null if not selected
    };
};

export default useCaptureImage;
