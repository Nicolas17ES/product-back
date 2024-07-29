/**
 * `SelectImageButton` is a functional React component that renders a button used for selecting an image.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.text] - The text to display inside the button. Defaults to "Select image" if not provided.
 *
 * @returns {JSX.Element} The rendered button element.
 */

const SelectImageButton = ({ onClick, text }) => (
    <button
        onClick={onClick}
        className="button select-image-button"
        aria-label={text || "Select image"}
    >
        {text}
    </button>
);

export default SelectImageButton;
