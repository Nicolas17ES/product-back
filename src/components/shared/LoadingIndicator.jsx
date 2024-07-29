import useLanguageFile from '../../hooks/useLanguageFile';

/**
 * `LoadingIndicator` is a functional React component that displays a loading indicator with text.
 * It uses the `useLanguageFile` hook to fetch and display localized text for the loader.
 *
 * @returns {JSX.Element|null} Rendered loading indicator if content is available; otherwise, returns null.
 */

const LoadingIndicator = () => {

    const content = useLanguageFile('loader');

    if (!content) {
        return null;
    }

    return (
     <div className="loader" role="status" aria-live="polite">{content.load}</div>
    )
};

export default LoadingIndicator;

