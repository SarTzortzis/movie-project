import React from "react";
import "./reviewContainer.css";

function ReviewContainer({ reviews }) {
  return (
    <>
      {reviews && (
        <div className="teeest">
          <div className="movie_carousel_header movie_review_header">
            <h2
              className="movie_carousel_h2"
              styles={{
                marginLeft: "50px",
              }}
            >
              User reviews
            </h2>
          </div>

          <section className="review_section">
            {reviews.map((item) => (
              <div className="review_item">
                <div className="review_item_header">
                  <div className="review_item_header_left">
                    <div className="review_item_header_left_author">
                      {item.author}
                    </div>
                    <div className="review_item_header_left_date">
                      {item.created_at
                        ? item.created_at.substring(0, 10)
                        : "nan"}
                    </div>
                  </div>
                  {item.author_details && (
                    <div className="review_item_header_right">
                      <i className="far fa-star" />

                      {item.author_details.rating}
                      <a className="review_external_link" href={item.url}>
                        <i className="fas fa-external-link-alt" />
                      </a>
                    </div>
                  )}
                </div>
                <div className="review_item_content">{item.content}</div>
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
}

export default ReviewContainer;
