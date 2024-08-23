const { google } = require('googleapis');
const drive = google.drive('v3');
const fs = require('fs');
const path = require('path');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URL
);

// Load credentials
oauth2Client.setCredentials({
    refresh_token: YOUR_REFRESH_TOKEN,
});

async function uploadFileToDrive(filePath, fileName) {
    const fileMetadata = {
        name: fileName,
    };

    const media = {
        mimeType: 'video/mp4', // Adjust mimeType based on file type
        body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
        auth: oauth2Client,
        resource: fileMetadata,
        media: media,
        fields: 'id',
    });

    return response.data.id;
}

// Example usage
const filePath = path.join(__dirname, 'your-video-file.mp4');
const fileName = 'Uploaded Video.mp4';

uploadFileToDrive(filePath, fileName).then((fileId) => {
    console.log(`File uploaded to Google Drive with ID: ${fileId}`);
});
