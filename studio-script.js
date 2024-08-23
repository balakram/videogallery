document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const uploadContainer = document.querySelector('.upload-container');
    const loginContainer = document.querySelector('.login-container');

    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');
    const thumbnailInput = document.getElementById('thumbnail-input');
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const categorySelect = document.getElementById('category-select');

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple login logic (you can replace this with real authentication)
        if (username === "1" && password === "1") {
            loginContainer.classList.add('hidden');
            uploadContainer.classList.remove('hidden');
        } else {
            alert('Invalid username or password');
        }
    });

    uploadButton.addEventListener('click', () => {
        if (fileInput.files.length > 0 && titleInput.value.trim() !== "" && thumbnailInput.files.length > 0) {
            const category = categorySelect.value;
            alert(`File uploaded successfully with the title: ${titleInput.value}, category: ${category}`);

            // Clear the inputs
            fileInput.value = '';
            thumbnailInput.value = '';
            titleInput.value = '';
            descriptionInput.value = '';
        } else {
            alert('Please select a video file, upload a thumbnail, and enter a title.');
        }
    });
});

const uploadButton = document.getElementById('upload-button');

uploadButton.addEventListener('click', () => {
    const formData = new FormData();
    formData.append('video', fileInput.files[0]);
    formData.append('thumbnail', thumbnailInput.files[0]);
    formData.append('title', titleInput.value.trim());
    formData.append('description', descriptionInput.value.trim());
    formData.append('category', categorySelect.value);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('File uploaded successfully');
            } else {
                alert('Failed to upload file');
            }
        })
        .catch(error => console.error('Error:', error));
});
