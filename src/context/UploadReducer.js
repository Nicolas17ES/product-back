

import { initialState } from "./UploadContext"; // Import the initial state from UploadContext

/**
 * Reducer function to manage state updates for the upload context.
 * 
 * @function
 * @param {Object} state - The current state of the context.
 * @param {Object} action - The action dispatched to update the state.
 * @param {string} action.type - The type of action to perform.
 * @param {any} action.payload - The data to be used in the state update.
 * 
 * @returns {Object} - The updated state after applying the action.
 */
const uploadReducer = (state, action) => {
    switch (action.type) {
        /*
         * @param {Object} action.payload - A boolean indicating if the PDF is ready.
         */
        case 'SET_IS_PDF_READY':
            return {
                ...state, 
                isPDFReady: action.payload, 
            };
        /**
         * @param {Object} action.payload - A boolean indicating whether to show the preview.
         */
        case 'SET_SHOW_PREVIEW':
            return {
                ...state, 
                showPreview: action.payload, 
            };
        /**
         * @param {Object} action.payload - The selected image object or null.
         */
        case 'SET_SELECTED_IMAGE':
            return {
                ...state, 
                selectedImage: action.payload, 
            };
        /**
         * @param {Object} action.payload - A string representing the language.
         */
        case 'SET_LANGUAGE':
            return {
                ...state, 
                language: action.payload, 
            };
        /**
         * @param {Object} action.payload - A boolean indicating whether to display the spinner.
         */
        case 'SET_IS_LOADING':
            return {
                ...state, 
                displaySpinner: action.payload, 
            };
        /**
         * @param {Object} action.payload - A boolean indicating whether to display the spinner.
         */
        case 'SET_LOADING_MESSAGE':
            return {
                ...state, 
                loadingMessage: action.payload, 
            };
        /**
         * @param {Object} state.language - Preserve the current language setting.
         */
        case 'RESET_STATE':
            return {
                ...initialState, // Reset all state values to their initial values
                language: state.language, // Preserve the current language setting
            };
        /**
         * Return the current state if the action type does not match any case.
         */
        default:
            return state;
    }
}

export default uploadReducer;
