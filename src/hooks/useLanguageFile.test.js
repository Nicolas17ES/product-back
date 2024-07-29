import { renderHook, waitFor } from '@testing-library/react'; // Import testing utilities for hooks
import { UploadProvider } from '../context/UploadContext'; // Import the context provider for wrapping the hook
import useLanguageFile from './useLanguageFile'; // Import the hook to be tested

// Mock dynamic imports for language JSON files
// These mocks simulate the actual language files to control the test environment

// Mock English language JSON file
jest.mock('../languages/en/general.json', () => ({
    home: [
        {
            toast: "PDF has been downloaded.",
            title: "PDF Generator",
            subtitle: "Upload a message and an image to generate your PDF file.",
            start: "Get started"
        }
    ],
    textarea: [
        {
            characters: "characters left",
            allowed: "No more characters allowed",
            placeholder: "Text goes here...",
            label: "1) Add your text"
        }
    ]
}), { virtual: true }); // { virtual: true } is used to mock modules without creating actual files

// Mock French language JSON file
jest.mock('../languages/fr/general.json', () => ({
    home: [
        {
            toast: "Le PDF a été téléchargé.",
            title: "Générateur de PDF",
            subtitle: "Téléchargez un message et une image pour générer votre fichier PDF.",
            start: "Commencer"
        }
    ],
    textarea: [
        {
            characters: "caractères restants",
            allowed: "Plus de caractères autorisés",
            placeholder: "Le texte va ici...",
            label: "1) Ajoutez votre texte"
        }
    ]
}), { virtual: true });

describe('useLanguageFile hook', () => {
    /**
     * Test case to verify that the hook fetches the correct content
     * for the "home" key in the "en" language.
     */
    test('fetches correct content for "home" in "en" language', async () => {
        // Render the hook within the context provider
        const { result } = renderHook(() => useLanguageFile('home'), {
            wrapper: ({ children }) => <UploadProvider>{children}</UploadProvider>
        });

        // Wait for the hook to complete and assert that the result matches the expected content
        await waitFor(() => {
            expect(result.current).toEqual({
                toast: "PDF has been downloaded.",
                title: "PDF Generator",
                subtitle: "Upload a message and an image to generate your PDF file.",
                start: "Get started"
            });
        });
    });

    /**
     * Test case to verify that the hook fetches the correct content
     * for the "textarea" key in the "en" language.
     */
    test('fetches correct content for "textarea" in "en" language', async () => {
        // Render the hook within the context provider
        const { result } = renderHook(() => useLanguageFile('textarea'), {
            wrapper: ({ children }) => <UploadProvider>{children}</UploadProvider>
        });

        // Wait for the hook to complete and assert that the result matches the expected content
        await waitFor(() => {
            expect(result.current).toEqual({
                characters: "characters left",
                allowed: "No more characters allowed",
                placeholder: "Text goes here...",
                label: "1) Add your text"
            });
        });
    });

    /**
     * Test case to handle scenarios where the content key is missing from the JSON file.
     * The hook should return null if the specified content key does not exist.
     */
    test('handles errors when the content key is missing', async () => {
        // Render the hook with a nonexistent content key
        const { result } = renderHook(() => useLanguageFile('nonexistent'), {
            wrapper: ({ children }) => <UploadProvider>{children}</UploadProvider>
        });

        // Wait for the hook to complete and assert that the result is null due to missing content
        await waitFor(() => {
            expect(result.current).toBeNull(); // Should be null as the content key is missing
        });
    });

    /**
     * Test case to handle scenarios where the language file or content is missing.
     * The hook should return null if there is an error loading the JSON file.
     */
    test('handles errors when the language file or content is missing', async () => {
        // Mock to throw error for missing file
        jest.mock('../languages/en/general.json', () => {
            throw new Error('File not found');
        }, { virtual: true });

        // Render the hook within the context provider
        const { result } = renderHook(() => useLanguageFile('home'), {
            wrapper: ({ children }) => <UploadProvider>{children}</UploadProvider>
        });

        // Wait for the hook to complete and assert that the result is null due to file loading error
        await waitFor(() => {
            expect(result.current).toBeNull(); // Should be null due to file loading error
        });
    });
});
