import React, { useState } from 'react'
import './NewsItem.css';
const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    const [imageLoadError, setImageLoadError] = useState(false);

    const handleImageError = () => {
        setImageLoadError(true);
    };

    return (
        <div className="my-3 ">
            <div className="card " >
                <div className="d-flex justify-content-end position-absolute end-0">
                    <span className="badge rounded-pill bg-danger" > {source}</span>
                </div>
                
                {!imageLoadError ? (
                    <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top custom-image" alt="..."
                        onError={handleImageError} />
                ) : (
                    <div className="card-img-top">
                        <p>Image not available</p>
                    </div>
                )}

                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>

    )
}
export default NewsItem