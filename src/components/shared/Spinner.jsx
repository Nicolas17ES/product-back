import { useContext } from "react";
import UploadContext from "../../context/UploadContext";
/**
 * `Spinner` is a functional React component that renders a loading spinner.
 *
 * @returns {JSX.Element} The rendered spinner element.
 */

function Spinner() {

    const { loadingMessage } = useContext(UploadContext);

    return (
        <div className="loadingSpinnerContainer">
            <div className="loadingSpinner"></div>
            <p className="loadingMessage">{loadingMessage}</p>
        </div>
    )
}

export default Spinner