// import React from 'react';
import React, { useState } from "react";
import './SubmitQuote.css';

const Submit: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            // Create a preview URL for images
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result as string);
            };
            fileReader.readAsDataURL(selectedFile);
        }
    };
    
    return (
        <div className='column-container'>      
            <div className='left-column'>
                {previewUrl && (
                    <div>
                        <h3>Image:</h3>
                        {file?.type.startsWith("image/") ? (
                            <img src={previewUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
                        ) : (
                            <p>File uploaded: {file?.name}</p>
                        )}
                    </div>
                )}
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>

            <div className='right-column'>
                <h3 id="quoteHeader" style={{ color: 'white' }}>Quote</h3>
                <textarea className="input-quote" placeholder="Enter quote. . ."></textarea>
                <button>
                    Submit
                </button>
            </div>
        </div>
    )
}


async function PostQuote(newQuote: { firstName: string, lastName: string, _Quote: string, image: string }) {
    await fetch('https://localhost:7028/api/Quote', {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(newQuote) // Convert the JavaScript object to a JSON string
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            console.log('Quote successfully posted:', data);
            // You can handle the response data if needed
        })
        .catch(error => {
            console.error('Error while posting the quote:', error);
        });
}

export default Submit;