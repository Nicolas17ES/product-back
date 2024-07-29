import { createContext, useReducer } from 'react'; // Import React functions for context and reducer management
import uploadReducer from './UploadReducer'; // Import the reducer function for managing state

// Create a React context for managing upload-related state
const UploadContext = createContext();

/**
 * Initial state for the upload context.
 * 
 * @type {Object}
 * @property {boolean} isPDFReady - Indicates if the PDF is ready.
 * @property {boolean} showPreview - Controls whether to show a preview of the selected image.
 * @property {Object|null} selectedImage - Holds the currently selected image or null if no image is selected.
 * @property {string} language - Language setting for the application, default is 'en'.
 * @property {boolean} displaySpinner - Indicates whether to display a loading spinner.
 */
export const initialState = {
    isPDFReady: false, // Initially, the PDF is not ready
    showPreview: false, // Initially, the image preview is not shown
    selectedImage: null, // No image is selected initially
    language: 'en', // Default language is English
    displaySpinner: false, // No spinner is displayed initially
    loadingMessage: '', // No spinner is displayed initially
};

/**
 * Context provider component for managing upload-related state.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - Child components that will have access to this context.
 * 
 * @returns {JSX.Element} - The provider component wrapping child components.
 */
export const UploadProvider = ({ children }) => {
    // Initialize state and dispatch function using useReducer
    const [state, dispatch] = useReducer(uploadReducer, initialState);

    return (
        <UploadContext.Provider value={{
            isPDFReady: state.isPDFReady, // Pass the isPDFReady state
            showPreview: state.showPreview, // Pass the showPreview state
            selectedImage: state.selectedImage, // Pass the selectedImage state
            language: state.language, // Pass the language state
            displaySpinner: state.displaySpinner, // Pass the displaySpinner state
            loadingMessage: state.loadingMessage, // Pass the displaySpinner state
            dispatch, // Pass the dispatch function for state updates
        }}>
            {children} {/* Render child components */}
        </UploadContext.Provider>
    );
};

export default UploadContext; // Export the context for use in other components
