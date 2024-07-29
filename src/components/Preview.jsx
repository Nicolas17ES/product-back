import { useContext, useRef } from "react";
import UploadContext from "../context/UploadContext";
import { IoIosSend } from "react-icons/io";
import useAspectRatio from "../hooks/useAspectRatio";
import useCaptureImage from "../hooks/useCaptureImage";
import SelectImageButton from './shared/SelectImageButton';
import ImagePreview from './shared/ImagePreview';
import useLanguageFile from '../hooks/useLanguageFile';
import useScreenWidth from '../hooks/useScreenWidth';
import Spinner from './shared/Spinner'

/**
 * `Preview` component renders image previews and a submit button based on aspect ratio and screen width.
 *
 * - Displays image previews in different layouts depending on aspect ratio.
 * - Provides buttons to select images for different preview options.
 * - Shows a spinner if data is loading.
 * - Includes a submit button for form submission.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The message to display on the image preview.
 * @param {string} props.image - The image data URL or file to display in the preview.
 * @param {string} props.name - The name for the image file.
 *
 * @returns {JSX.Element} The rendered preview component.
 */

const Preview = ({ message, image, name }) => {

    const { dispatch, displaySpinner } = useContext(UploadContext);

    const content = useLanguageFile('preview');
    const screenWidth = useScreenWidth();

    const imageRefOne = useRef(null);
    const imageRefTwo = useRef(null);

    const { dimensionsImageOne, dimensionsImageTwo, aspectRatio, isLoading, handleImageLoad } = useAspectRatio();
    const { capturedImage, handleSubmit, handleSelectImage } = useCaptureImage(dispatch, name);

    if (!content) {
        return null;
    }



    return (
        <>
            {aspectRatio > 1 ? <h2 className="title">{content.title}</h2> : null}
            {displaySpinner && <Spinner />}
            <div className="preview-images-container">
                <section className="image-container" aria-labelledby="image-one-label">
                    <ImagePreview
                        loadingState={isLoading}
                        image={image}
                        message={message}
                        dimensions={dimensionsImageOne}
                        ref={imageRefOne}
                        onLoad={() => handleImageLoad(imageRefOne)}
                        option={'one'}
                    />
                    {(aspectRatio > 1 && !capturedImage && screenWidth > 1000) &&
                        <SelectImageButton onClick={() => handleSelectImage(1)} text={content.opt_one} aria-label="Select image option one"/>
                    }
                </section>

                {(aspectRatio > 1 && screenWidth > 1000) && (
                    <section className="image-container" aria-labelledby="image-two-label">
                        <ImagePreview
                            image={image}
                            message={message}
                            dimensions={dimensionsImageTwo}
                            ref={imageRefTwo}
                            onLoad={() => handleImageLoad(imageRefTwo)}
                            option={'two'}
                        />
                        {aspectRatio > 1 && !capturedImage &&
                            <SelectImageButton onClick={() => handleSelectImage(2)} text={content.opt_two} aria-label="Select image option two"/>
                        }
                    </section>
                )}
            </div>
            {(aspectRatio <= 1 || (aspectRatio > 1 && capturedImage) || screenWidth < 1000) && (
                <button
                    onClick={handleSubmit}
                    className="button button-submit"
                    aria-label="Submit form"
                >
                    {content.button} <IoIosSend size={19} />
                </button>
            )}
        </>
    );
};

export default Preview;


