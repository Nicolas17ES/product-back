import { useState, useEffect, useContext } from 'react'; // Import React hooks for state management, side effects, and context
import UploadContext from '../context/UploadContext'; // Import context for global state management

/**
 * Custom hook to load content from a language-specific JSON file based on the current language context.
 * 
 * This hook fetches content from a language-specific JSON file dynamically based on the current language
 * selected in the context. It uses `import()` to load the appropriate language file and provides the loaded
 * content based on the specified key.
 * 
 * @param {string} content - The key to fetch content for from the JSON file.
 * 
 * @returns {any} - The loaded content corresponding to the specified key from the language file.
 */
const useLanguageFile = (content) => {
    const { language } = useContext(UploadContext); // Access the current language from context
    const [loadedContent, setLoadedContent] = useState(null); // State to store the loaded content

    /**
     * Effect to fetch language-specific content when `language` or `content` changes.
     * 
     * Uses dynamic import to fetch the appropriate language file based on the current language context.
     * Updates the state with the fetched content.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Dynamically import the language file based on the current language context
                const languageFile = await import(`../languages/${language}/general.json`);
                // Update the state with the content corresponding to the provided key
                setLoadedContent(languageFile.default[content][0]);
            } catch (error) {
                // Log any errors that occur during the import process
                console.error(`Error loading language file: ${error}`);
            }
        };

        fetchData(); // Call the fetch function
    }, [language, content]); // Dependencies: re-run effect when `language` or `content` changes

    return loadedContent; // Return the loaded content
};

export default useLanguageFile;
