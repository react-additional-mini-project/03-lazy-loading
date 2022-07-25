import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
// XG6aQt4UE_Cvgj7QLinAsvhmDMcR8DC-fvDCPLCTbN4
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const fetchImages = async () => {
        setLoading(true);
        let url;
        url = `${mainUrl}${clientID}&page=${page}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setPhotos([...photos, data]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [page]);

    useEffect(() => {
        const event = window.addEventListener("scroll", () => {
            console.log(`innerheight: ${window.innerHeight}`);
            console.log(`scrollY: ${window.scrollY}`);
            console.log(`body height: ${document.body.scrollHeight}`);
            if (
                !loading &&
                window.innerHeight + window.scrollY >=
                    document.body.scrollHeight - 100
            ) {
                setPage((prev) => {
                    return prev + 1;
                });
            }
        });
        return () => window.removeEventListener("scroll", event);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("asfd");
    };
    return (
        <main>
            <section className="search">
                <form className="search-form">
                    <input
                        type="text"
                        placeholder="search"
                        className="form-input"
                    />
                    <button
                        type="submit"
                        className="submit-btn"
                        onClick={handleSubmit}
                    >
                        <FaSearch />
                    </button>
                </form>
            </section>
            <section className="photos">
                <div className="photos-center">
                    {photos.map((item, index) => {
                        console.log(item);
                        return <Photo key={item.id} {...item} />;
                    })}
                </div>
                {loading && <h2 className="loading">loading...</h2>}
            </section>
        </main>
    );
}

export default App;
