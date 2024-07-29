import React from "react";

/**
 * `ImagePreview` is a functional React component that displays an image preview with a message overlay.
 * It uses `React.forwardRef` to allow a parent component to access the image element's ref.
 * 
 * Props:
 * - `image` (string): URL of the image to be displayed.
 * - `message` (string): Text to be displayed overlaid on the image.
 * - `dimensions` (object): Dimensions for the image and text container. It should include:
 *     - `imageWidth` (number): Width of the image in pixels.
 *     - `imageHeight` (number): Height of the image in pixels.
 *     - `textHeight` (number): Height of the text container in pixels.
 * - `onLoad` (function): Callback function to be executed when the image is loaded.
 * - `loadingState` (boolean): Controls whether the image preview is visible or hidden based on loading state.
 * - `option` (number): A number used to apply different styling based on the option value.
 * 
 * @param {object} props - Component props.
 * @param {string} props.image - URL of the image to display.
 * @param {string} props.message - Overlay message for the image.
 * @param {object} props.dimensions - Object containing image and text container dimensions.
 * @param {function} props.onLoad - Callback function executed on image load.
 * @param {boolean} props.loadingState - Visibility control for the image preview.
 * @param {number} props.option - Styling option for the preview container.
 * @param {React.Ref} ref - Forwarded ref for the image element.
 * 
 * @returns {JSX.Element} Rendered image preview component.
 */
const ImagePreview = React.forwardRef(({ image, message, dimensions, onLoad, loadingState, option }, ref) => (
    <div
        className={`preview-container preview-container-${option}`}
        style={{ display: loadingState ? 'none' : 'block' }}
        role="region"
        aria-label={`Image preview container, option ${option}`}
    >
        <img
            className="image"
            src={image}
            alt="Preview"
            ref={ref}
            style={{ width: `${dimensions.imageWidth}px`, height: `${dimensions.imageHeight}px`, objectFit: 'cover' }}
            onLoad={onLoad}
        />
        <div className="image-text-container" style={{ height: `${dimensions.textHeight}px` }}>
            <p className="image-text">{message}</p>
        </div>
    </div>
));

export default ImagePreview;
