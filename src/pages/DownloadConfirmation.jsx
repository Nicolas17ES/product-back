import UploadContext from "../context/UploadContext";
import {useNavigate} from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useContext } from "react";
import useLanguageFile from '../hooks/useLanguageFile';

/**
 * `DownloadConfirmation` page displays a confirmation message after a PDF is downloaded.
 *
 * - Provides options to restart the process or visit the Mes Plaques website.
 * - Resets application state upon user interaction.
 *
 * @returns {JSX.Element} The rendered confirmation page.
 */

function DownloadConfirmation() {

    const { dispatch } = useContext(UploadContext);

    const content = useLanguageFile('confirmation');

    const navigate = useNavigate();

    const handleButtonClick = () => {

        navigate('/');

        dispatch({
            type: 'RESET_STATE'
        })

    }

    if (!content) {
        return null;
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta name="description" content="Your PDF has been successfully downloaded. Thank you for using Mesplaques. Would you like to generate another PDF?" />
                    <title>Confirmation</title>
                </Helmet>
            </HelmetProvider>
            <section className="page-container">
                <h2 className="confirmation-title title">{content.title}</h2>
                <p className="confirmation-paragraph subtitle">{content.paragraph}</p>
                <div className="buttons-container" style={{ marginTop: '100px' }}>
                <button onClick={handleButtonClick} className="confirmation-button button" aria-label="Try the process again">{content.again}</button>
                <a href="https://www.mesplaques.fr/" className="confirmation-button button" aria-label="Visit Mesplaques website">{content.visit}</a>
                </div>
            </section>
        </>
    );

}

export default DownloadConfirmation;