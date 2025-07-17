document.addEventListener('DOMContentLoaded', () => {
    // Function to set the current date in the signature section
    const setSignatureDate = () => {
        const signatureDateElement = document.getElementById('signatureDate');
        if (signatureDateElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = now.getFullYear();
            signatureDateElement.textContent = `${hours}:${minutes}, Ngày ${day} tháng ${month} năm ${year}`;
        }
    };

    setSignatureDate();

    // Event listener for the print button
    const printButton = document.querySelector('.print-button');
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }

    // Optional: Add event listeners for input fields to save data locally
    const inputs = document.querySelectorAll('input[type="text"], textarea, [contenteditable="true"]');

    inputs.forEach(input => {
        const id = input.id;
        if (id) {
            // Load saved data
            const savedValue = localStorage.getItem(id);
            if (savedValue) {
                if (input.tagName === 'DIV' || input.tagName === 'SPAN') {
                    input.textContent = savedValue;
                } else {
                    input.value = savedValue;
                }
            }

            // Save data on input change
            if (input.tagName === 'DIV' || input.tagName === 'SPAN') {
                input.addEventListener('input', (event) => {
                    localStorage.setItem(id, event.target.textContent);
                });
            } else {
                input.addEventListener('input', (event) => {
                    localStorage.setItem(id, event.target.value);
                });
            }
        }
    });
});