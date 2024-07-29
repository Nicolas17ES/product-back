import { useState, useEffect } from "react"; // Import hooks from React for managing state and side effects

/**
 * Custom hook to manage and calculate image aspect ratios and dimensions based on screen width.
 * 
 * This hook tracks the screen width, aspect ratio of an image, and adjusts image dimensions
 * and text height based on the screen width and aspect ratio.
 * 
 * @returns {Object} - An object containing various properties and functions:
 *  - {Object} dimensionsImageOne - The dimensions and text height for option 1 layout.
 *  - {Object} dimensionsImageTwo - The dimensions and text height for option 2 layout (if applicable).
 *  - {number|null} aspectRatio - The aspect ratio of the image (width / height), or null if not yet calculated.
 *  - {boolean} isLoading - A boolean indicating if the aspect ratio is still being calculated.
 *  - {Function} handleImageLoad - A function to handle image loading and calculate the aspect ratio.
 */
const useAspectRatio = () => {
    // State to track the current screen width
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // State to store the calculated aspect ratio of the image
    const [aspectRatio, setAspectRatio] = useState(null);

    // State to track if the aspect ratio calculation is in progress
    const [isLoading, setIsLoading] = useState(true);

    // State to store dimensions and text height for image layout option 1
    const [dimensionsImageOne, setDimensionsImageOne] = useState({
        imageHeight: 0,
        imageWidth: 0,
        textHeight: 100
    });

    // State to store dimensions and text height for image layout option 2
    const [dimensionsImageTwo, setDimensionsImageTwo] = useState({
        imageHeight: 0,
        imageWidth: 0,
        textHeight: 100
    });

    /**
     * Function to handle the image load event and calculate the aspect ratio.
     * 
     * @param {Object} imageRef - Ref object pointing to the image element.
     */
    const handleImageLoad = (imageRef) => {
        if (imageRef && imageRef.current) {
            const { naturalWidth, naturalHeight } = imageRef.current;
            if (naturalWidth && naturalHeight) {
                // Calculate aspect ratio as width / height
                setAspectRatio(naturalWidth / naturalHeight);
                setIsLoading(false); // Set loading to false once aspect ratio is calculated
            }
        }
    };

    /**
     * Function to update the screen width state when the window is resized.
     */
    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    // Use effect to add and clean up the resize event listener
    useEffect(() => {
        window.addEventListener('resize', updateScreenWidth);
        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    /**
     * Use effect to recalculate dimensions and text height whenever aspect ratio or screen width changes.
     */
    useEffect(() => {
        if (aspectRatio !== null) {
            // Determine container size and minimum text height based on screen width
            const containerSize = screenWidth < 600 ? 300 : 500;
            const minTextHeight = screenWidth < 600 ? 50 : 80;

            // OPTION 1: Calculate dimensions for image layout option 1
            let adjustedImageHeightOptionOne = containerSize / aspectRatio;
            let adjustedImageWidthOptionOne = containerSize;

            const remainingHeight = containerSize - adjustedImageHeightOptionOne;

            // Ensure minimum text height
            if (remainingHeight < minTextHeight) {
                adjustedImageHeightOptionOne = containerSize - minTextHeight;
            }

            setDimensionsImageOne({
                imageHeight: adjustedImageHeightOptionOne,
                imageWidth: adjustedImageWidthOptionOne,
                textHeight: containerSize - adjustedImageHeightOptionOne
            });

            // OPTION 2: Calculate dimensions for image layout option 2 (only if aspect ratio > 1)
            if (aspectRatio > 1) {
                let adjustedImageWidthOptionTwo = containerSize;
                let adjustedImageHeightOptionTwo = containerSize;

                const textHeightOptionTwo = Math.min(adjustedImageHeightOptionTwo, minTextHeight);
                adjustedImageHeightOptionTwo -= textHeightOptionTwo;

                setDimensionsImageTwo({
                    imageHeight: adjustedImageHeightOptionTwo,
                    imageWidth: adjustedImageWidthOptionTwo,
                    textHeight: textHeightOptionTwo
                });
            }
        }
    }, [aspectRatio, screenWidth]);

    return {
        dimensionsImageOne, // Dimensions and text height for option 1 layout
        dimensionsImageTwo, // Dimensions and text height for option 2 layout (if applicable)
        aspectRatio,        // The aspect ratio of the image
        isLoading,          // Loading state indicating if aspect ratio is being calculated
        handleImageLoad     // Function to handle image loading and aspect ratio calculation
    };
};

export default useAspectRatio;
