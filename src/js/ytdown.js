var convertBtn = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');
var isAudio_checkbox = document.querySelector('.isAudio');
var highquality_mp4 = document.querySelector('.highquality_mp4');
var highqualityLabel = document.querySelector('.highqualityLabel');
var quality = document.querySelector('.quality');

isAudio_checkbox.addEventListener('click', () => {
    if (isAudio_checkbox)
    {
        if (!isAudio_checkbox.checked) {
            quality.style.display = 'block';
          } else if (isAudio_checkbox.checked) {
            quality.style.display = 'none';
            highquality_mp4.checked = false;
          }
    }
})

convertBtn.addEventListener('click', () => {
    console.log(`URL: ${URLinput.value}`);
    sendURL(URLinput.value);
});

function sendURL(URL) {
    // Check if isAudio is checked
    if (isAudio_checkbox.checked)
    {
        // Download in Audio Format
        window.location.href = `http://localhost:4000/downloadmp3?URL=${URL}`;
    } 
    else if (!isAudio_checkbox.checked) {
        // check if highquality_mp4 is checked
        if (highquality_mp4.checked)
        {
            // Download in Video Format with High Quality
            window.location.href = `http://localhost:4000/downloadmp4?URL=${URL}&Quality=high`;
        } else if (!highquality_mp4.checked) {
            // Download in Video Format with Low Quality
            window.location.href = `http://localhost:4000/downloadmp4?URL=${URL}&Quality=low`;
        }
        
    }
    
}