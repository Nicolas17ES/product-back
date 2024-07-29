import { useContext } from "react";
import UploadContext from "../../context/UploadContext";
import { MdOutlinePreview } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import useLanguageFile from '../../hooks/useLanguageFile';

/**
 * `PreviewButton` is a functional React component that provides a button to toggle the visibility of a preview.
 *
 * @returns {JSX.Element|null} The rendered button element or null if content is not loaded.
 */


const PreviewButton = () => {

    const { dispatch, showPreview, displaySpinner } = useContext(UploadContext);

    const content = useLanguageFile('previewButton');

    const togglePreviewState = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SET_SHOW_PREVIEW',
            payload: !showPreview
        })
    }

    const buttonStyle = showPreview ? { position: 'absolute', top: '10px', right: '10px' , zIndex: 999, backgroundColor: 'transparent'} : {};

    if (!content) {
        return null;
    }

    return (

        <button 
            onClick={togglePreviewState} 
            style={buttonStyle}
            className="button"
            disabled={displaySpinner}
            aria-expanded={showPreview}
            aria-label={showPreview ? content.hide : content.show}
        >
            {showPreview ? content.hide : content.show}
            {showPreview ? <FaWindowClose aria-hidden="true" /> : <MdOutlinePreview size={19} aria-hidden="true" />}
        </button>
    );
};

export default PreviewButton;