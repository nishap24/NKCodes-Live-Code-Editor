// script.js
const html_code = document.querySelector('.html-code textarea');
const css_code = document.querySelector('.css-code textarea');
const js_code = document.querySelector('.js-code textarea');
const result = document.querySelector('#result');
const fileNameInput = document.getElementById('file-name');

// Function to run the code in the iframe
function run() {
    // Executing HTML, CSS & JS code
    result.contentDocument.body.innerHTML = `<style>${css_code.value}</style>` + html_code.value;
    result.contentWindow.eval(js_code.value);
}

// Function to save the code to Local Storage
function saveCode() {
    // Check if any code is entered
    if (!html_code.value && !css_code.value && !js_code.value) {
        alert("⚠️Enter code before saving.");
        return;
    }

    // Check if a file name is entered
    if (!fileNameInput.value) {
        alert("⚠️Enter the title for saving.");
        return;
    }

    // Storing data in Local Storage
    localStorage.setItem('fileName', fileNameInput.value);
    localStorage.setItem(`${fileNameInput.value}.html`, html_code.value);
    localStorage.setItem(`${fileNameInput.value}.css`, css_code.value);
    localStorage.setItem(`${fileNameInput.value}.js`, js_code.value);

    alert("☑️Code saved successfully!");
}

// Function to download the code as a zip file
function downloadCode() {
    // Check if any code is entered
    if (!html_code.value && !css_code.value && !js_code.value) {
        alert("⚠️Enter code before downloading.");
        return;
    }

    // Check if a file name is entered
    if (!fileNameInput.value) {
        alert("⚠️Enter the title for saving.");
        return;
    }

    const zip = new JSZip();
    zip.file(`${fileNameInput.value}.html`, html_code.value);
    zip.file(`${fileNameInput.value}.css`, css_code.value);
    zip.file(`${fileNameInput.value}.js`, js_code.value);

    zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `${fileNameInput.value}.zip`);
    });
}

// Function to reset the editor and clear Local Storage
function resetEditor() {
    html_code.value = '';
    css_code.value = '';
    js_code.value = '';
    result.contentDocument.body.innerHTML = '';

    // Clear Local Storage for the specific file name
    const savedFileName = localStorage.getItem('fileName');
    if (savedFileName) {
        localStorage.removeItem(`${savedFileName}.html`);
        localStorage.removeItem(`${savedFileName}.css`);
        localStorage.removeItem(`${savedFileName}.js`);
    }

    // Clear the file name from Local Storage
    localStorage.removeItem('fileName');
}

// Checking if the user is typing anything in the input field
html_code.addEventListener('keyup', run);
css_code.addEventListener('keyup', run);
js_code.addEventListener('keyup', run);

// Retrieve and display saved code from Local Storage
const savedFileName = localStorage.getItem('fileName');
if (savedFileName) {
    const savedHTML = localStorage.getItem(`${savedFileName}.html`);
    const savedCSS = localStorage.getItem(`${savedFileName}.css`);
    const savedJS = localStorage.getItem(`${savedFileName}.js`);

    // Set the file name in the input field
    fileNameInput.value = savedFileName;

    if (savedHTML) {
        html_code.value = savedHTML;
    }

    if (savedCSS) {
        css_code.value = savedCSS;
    }

    if (savedJS) {
        js_code.value = savedJS;
    }

    // Call the run function initially to display any saved code
    run();
}
