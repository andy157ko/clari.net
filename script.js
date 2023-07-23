document.addEventListener("DOMContentLoaded", function() {
    const imageViewer = document.querySelector(".image-viewer");
    const closeBtn = document.querySelector(".close-btn");
    const clarinetImage = document.querySelector(".clarinet-front");
    const fullSizeImage = document.querySelector(".image-viewer img");

    clarinetImage.addEventListener("click", function() {
        // Replace the clarinet image URL with the URL of another image
        const imageUrl = "images/Untitled drawing (1).png";
        fullSizeImage.src = imageUrl; // Set the source of the full-size image
        imageViewer.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        imageViewer.style.display = "none";
    });
});