// Add this script before the closing </body> tag
document.addEventListener('DOMContentLoaded', function() {
    // Get all images in the document
    const images = document.querySelectorAll('img');
    
    // Add hover effect styles
    const style = document.createElement('style');
    style.textContent = `
        img {
            transition: all 0.3s ease-in-out;
        }
        img:hover {
            transform: scale(1.1) translateY(-10px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            z-index: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners for each image
    images.forEach(img => {
        // Save original dimensions
        img.addEventListener('load', function() {
            this.dataset.originalWidth = this.offsetWidth;
            this.dataset.originalHeight = this.offsetHeight;
        });
        
        // Set position to relative for z-index to work
        img.style.position = 'relative';
        img.style.cursor = 'pointer';
    });
});