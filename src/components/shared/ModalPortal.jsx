import ReactDom from 'react-dom'

/**
 * `ModalPortal` is a functional React component that uses React Portal to render modal elements into a specific DOM node outside of the main component hierarchy.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 *
 * @returns {JSX.Element} The rendered portal for the modal.
 */


const ModalPortal = ({children}) => {

    return ReactDom.createPortal(
        <>
            <div
                className="modal-overlay"
                role="presentation"
                aria-hidden="true"
            ></div>
            <div className="modal" role="dialog">
                {children}
            </div>
        </>,
        document.getElementById('preview-modal')
    );
};

export default ModalPortal;