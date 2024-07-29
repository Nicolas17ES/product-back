import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useLanguageFile from '../../hooks/useLanguageFile';

/**
 * `TextArea` is a controlled component that renders a textarea with character limit warnings and error messages.
 *
 * @param {Object} props - Component props.
 * @param {string} props.value - The current value of the textarea.
 * @param {Function} props.onChange - Callback function to handle changes in the textarea.
 * @param {number} props.maxLength - The maximum number of characters allowed in the textarea.
 * @returns {JSX.Element} The rendered textarea component.
 */

const TextArea = ({ value, onChange, maxLength }) => {
    const content = useLanguageFile('textarea');
    const [alert, setAlert] = useState({ isVisible: false, color: '', message: '' });
    const [text, setText] = useState('');


    /**
     * Handles changes to the textarea value.
     *
     * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event from the textarea.
     */

    const handleChange = (e) => {
        const text = e.target.value;
        if (text.length <= maxLength) {
            onChange(text);
            setText(text);
        } else {
            toast.error(`Message cannot exceed ${maxLength} characters.`);
        }
    };

    useEffect(() => {
         // Determine the appropriate alert message and style based on text length.
        let alertColor = '';
        let alertMessage = '';
        let isVisible = false;

        if (text.length >= maxLength - 6 && text.length < maxLength - 2) {
            alertColor = 'orange';
            alertMessage = `${maxLength - text.length} ${content.characters}`;
            isVisible = true;
        } else if (text.length >= maxLength - 2 && text.length < maxLength) {
            alertColor = 'red';
            alertMessage = `${maxLength - text.length} ${content.characters}`;
            isVisible = true;
        } else if (text.length === maxLength) {
            alertColor = 'red';
            alertMessage = content.allowed;
            isVisible = true;
        }
        setAlert({ isVisible, color: alertColor, message: alertMessage });
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, maxLength]);

    if (!content) {
        return null;
    }

    return (
        <>
            <label htmlFor="textarea" className="upload-label">
                {content.label}
            </label>
            <textarea
                className="textarea"
                value={value}
                onChange={handleChange}
                placeholder={content.placeholder}
                name="message"
                maxLength={maxLength}
                aria-describedby="character-count"
                aria-required="true"
                required
            />
            {alert.isVisible && <sub id="character-count" className="alert-message" style={{ color: alert.color }}>{alert.message}</sub>}
            <hr style={{marginBottom: '50px'}}/>
        </>
    );
};

export default TextArea;
