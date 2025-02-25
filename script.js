const loadVideoButton = document.getElementById('load-video');
        const openVideoButton = document.getElementById('open-video');
        const videoInput = document.getElementById('video-url');
        const iframe = document.getElementById('youtube-video');

        let videoID = '';
        let playlistID = '';

        function extractIDs(url) {
            const videoRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:v=|\/)([\w-]+)/;
            const shortVideoRegex = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([\w-]+)/;
            const playlistRegex = /[?&]list=([\w-]+)/;

            const videoMatch = url.match(videoRegex) || url.match(shortVideoRegex);
            const playlistMatch = url.match(playlistRegex);

            return {
                video: videoMatch ? videoMatch[1] : null,
                playlist: playlistMatch ? playlistMatch[1] : null
            };
        }
        loadVideoButton.addEventListener('click', () => {
            const url = videoInput.value;
            const ids = extractIDs(url);

            videoID = ids.video;
            playlistID = ids.playlist;

            if (playlistID) {
                iframe.src = `https://www.youtube.com/embed/videoseries?list=${playlistID}`;
                alert("Playlist loaded successfully!");
            } else if (videoID) {
                iframe.src = `https://www.youtube.com/embed/${videoID}`;
                alert("Video loaded successfully!");
            } else {
                alert("Invalid YouTube URL. Please try again.");
            }
        });

       
        openVideoButton.addEventListener('click', () => {
            if (!videoID && !playlistID) {
                alert("Please load a video or playlist first!");
                return;
            }

            const popupUrl = playlistID 
                ? `https://www.youtube.com/embed/videoseries?list=${playlistID}` 
                : `https://www.youtube.com/embed/${videoID}`;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const options = `width=${width},height=${height},resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`;
            
            window.open(popupUrl, "_blank", options);
        });