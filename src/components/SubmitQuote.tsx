import React, { useState } from "react";
import './SubmitQuote.css';

const Submit: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [anime, setAnime] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [quote, setQuote] = useState("");
    const [uploaded_imgUrl, setImgUrl] = useState<string | null>(null);

    //handles an event change on the input element
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let uploadedImageUrl = uploaded_imgUrl;

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                uploadedImageUrl = data.fileUrl;
                setImgUrl(uploadedImageUrl); // Update the state with the uploaded image URL
            } else {
                alert("Error uploading file: " + data.message);
                return;
            }
        }

        const newQuote = { anime, firstName, lastName, quote, img_url: uploadedImageUrl };

        const response = await fetch("http://localhost:5000/add-quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newQuote),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Quote added successfully!");
            setAnime("");
            setFirstName("");
            setLastName("");
            setQuote("");
            setImgUrl("");
            setFile(null);
            setPreviewUrl(null);
        } else {
            alert("Error: " + data.message);
        }
    };

    return (
        <div className='submit-column-container'>
            <div className='submit-left-column'>
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
                    onChange={handleImageChange}
                    accept="image/*"
                />
            </div>
            <form className='submit-right-column' onSubmit={handleSubmit}>
                <div className="anime-title-container">
                    <label>Anime</label>
                    <input className="input-anime" placeholder="Anime from . ." value={anime} onChange={(e) => setAnime(e.target.value)} required />
                </div>
                <div className="name-column">
                    <div className="first-name-contaier">
                        <label>First name</label>
                        <input className="firstName" placeholder="Enter first name. . ." value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="last-name-container">
                        <label>Last name</label>
                        <input className="lastName" placeholder="Enter last name. . ." value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="submit-quote-container">
                    <label>Quote</label>
                    <textarea className="input-quote" placeholder="Enter quote. . ." value={quote} onChange={(e) => setQuote(e.target.value)} required />
                </div>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Submit;