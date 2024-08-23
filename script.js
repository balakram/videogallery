document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality
    const searchBar = document.querySelector('.search-bar input');
    const videoGrid = document.querySelector('.video-grid');

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const videoCards = videoGrid.querySelectorAll('.video-card');

        videoCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Sidebar Toggle Functionality
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.menu-button');

    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('visible');
    });

    // Dark Theme Toggle
    const themeToggleButton = document.getElementById('theme-toggle');
    const signatureImgDark = document.getElementById('signature-img-dark');
    const signatureImgLight = document.getElementById('signature-img-light');
    const authorLink = document.getElementById('author-link');

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');

        if (document.body.classList.contains('light-theme')) {
            themeToggleButton.textContent = '🌙'; // Moon icon for dark theme
            signatureImgLight.style.display = 'block';
            signatureImgDark.style.display = 'none';
            authorLink.style.color = '#000000'; // Blue color for light theme
        } else {
            themeToggleButton.textContent = '🌞'; // Sun icon for light theme
            signatureImgDark.style.display = 'block';
            signatureImgLight.style.display = 'none';
            authorLink.style.color = '#FFD700'; // Gold color for dark theme
        }
    });

    // Categories Toggle Functionality
    const categoriesToggle = document.getElementById('categories-toggle');
    const categoriesList = document.getElementById('categories-list');

    categoriesToggle.addEventListener('click', () => {
        categoriesList.classList.toggle('visible');
    });

    // Video data categorized by type
    /*const videoData = {
        "Music": [
            { title: "Song 1", url: "https://youtu.be/SZrQ7UO7-ks?si=R_1tt1YWKvqrCN5x", views: 1000 },
            { title: "Song 2", url: "https://example.com/song2", views: 1500 },
            { title: "Song 3", url: "https://example.com/song3", views: 2000 },
            { title: "Song 2", url: "https://example.com/song2", views: 1500 },
        ],
        "Technology": [
            { title: "Tech Review 1", url: "https://example.com/tech1", views: 2000 },
            { title: "Tech Review 2", url: "https://example.com/tech2", views: 3000 },
            { title: "Tech Review 1", url: "https://example.com/tech1", views: 2000 },
            { title: "Tech Review 2", url: "https://example.com/tech2", views: 3000 },
        ],
        "Gaming": [
            { title: "Gameplay 1", url: "https://example.com/gameplay1", views: 500 },
            { title: "Gameplay 2", url: "https://example.com/gameplay2", views: 750 },
            { title: "Gameplay 1", url: "https://example.com/gameplay1", views: 500 },
        ],
        // More categories can be added here
    };*/


    const videoData = {
        "Music": [
            {
                title: "Song 1",
                embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/SZrQ7UO7-ks?si=OfbpM_6W1RyvpEkB&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
                views: 1000
            },
            {
                title: "Song 2",
                embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/exampleID2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                views: 1500
            },
            {
                title: "Song 3",
                embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/exampleID3" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                views: 2000
            }
        ],
        "Technology": [
            {
                title: "Tech Review 1",
                embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/exampleTech1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                views: 2000
            },
            {
                title: "Tech Review 2",
                embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/exampleTech2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                views: 3000
            }
        ],
        "Gaming": [
            {
                title: "Gameplay 1",
                embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/exampleGame1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                views: 500
            },
            {
                title: "Gameplay 2",
                embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/exampleGame2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                views: 750
            }
        ],
        // More categories can be added here
    };

    // Combine all videos into one array
    function getAllVideos() {
        let allVideos = [];
        for (let category in videoData) {
            allVideos = allVideos.concat(videoData[category]);
        }
        return allVideos;
    }

    // Display videos for the selected category
    // Display videos for the selected category
    function displayVideos(videos) {
        videoGrid.innerHTML = ''; // Clear existing videos
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
            <img src="https://via.placeholder.com/250x140" alt="${video.title}">
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.views} views</p>
            </div>
        `;
            videoCard.addEventListener('click', () => {
                playVideo(video.youtubeId);
            });
            videoGrid.appendChild(videoCard);
        });
    }

    function playVideo(youtubeId) {
        const videoPlayerContainer = document.getElementById('video-player-container');
        const videoPlayer = document.getElementById('video-player');

        // Create or update the iframe for YouTube embed
        videoPlayer.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
    `;

        videoPlayerContainer.classList.remove('hidden'); // Show the video player
    }


    // Close the video player
    document.getElementById('close-video-player').addEventListener('click', () => {
        const videoPlayerContainer = document.getElementById('video-player-container');
        const videoPlayer = document.getElementById('video-player');

        videoPlayer.pause(); // Pause the video
        videoPlayerContainer.classList.add('hidden'); // Hide the video player
    });

    // Initialize the sidebar and video display functionality
    function init() {
        const allVideos = getAllVideos(); // Get all videos
        displayVideos(allVideos); // Display all videos on page load

        const categoriesListItems = document.querySelectorAll('#categories-list li');
        categoriesListItems.forEach((item) => {
            item.addEventListener('click', (event) => {
                const category = event.target.dataset.category;
                highlightCategory(event.target); // Highlight selected category
                if (videoData[category]) {
                    displayVideos(videoData[category]);
                }
            });
        });
    }

    // Highlight the selected category in the sidebar
    function highlightCategory(selectedItem) {
        const categoriesListItems = document.querySelectorAll('#categories-list li');
        categoriesListItems.forEach((item) => {
            item.classList.remove('active');
        });
        selectedItem.classList.add('active');
    }

    init(); // Initialize the sidebar and video display functionality

    // Close the upload dialog
    const closeDialogButton = document.getElementById('close-dialog');
    const uploadDialog = document.getElementById('upload-dialog');

    closeDialogButton.addEventListener('click', () => {
        uploadDialog.style.display = 'none';
    });

    // Open the upload dialog
    const uploadButton = document.getElementById('upload-btn');
    uploadButton.addEventListener('click', () => {
        uploadDialog.style.display = 'block';
    });

    // Handle file upload (just a mockup, won't actually upload files)
    const uploadFileButton = document.getElementById('upload-file-btn');
    const fileInput = document.getElementById('file-input');

    uploadFileButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            alert(`Uploaded file: ${file.name}`);
            uploadDialog.style.display = 'none';
        } else {
            alert('No file selected');
        }
    });

});
document.getElementById('videoContainer').innerHTML = videoData['Music'][0].embed;