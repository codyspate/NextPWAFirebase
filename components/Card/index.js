import React from 'react'
import PropTypes from 'prop-types'


const Card = ({
  image,
  title,
  location
}) => {
  return (
    <div className="Card">
      <div>
        <img src={image} alt={title} />
      </div>
      <div className="Card-Text">
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          <h4>{location}</h4>
        </div>
      </div>

      <style jsx>{`
        .Card {
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
          font-size: 16px;
          font-weight: 400;
          min-height: 200px;
          overflow: hidden;
          width: 330px;
          z-index: 1;
          position: relative;
          background: #fff;
          border-radius: 2px;
          box-sizing: border-box;
          margin: 15px;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
        }

        .Card-Text {
          padding: .75rem;
        }

        .Card img {
          max-width: 100%;
          width: 100%;
        }

        @media(min-width: 768px) {
          .Card {
            width: 45%
          }
        }

        @media(max-width: 380px) {
          .Card {
            width: 250px
          }
        }

        @media(max-width: 300px) {
          .Card {
            width: 200px
          }
        }
    `}</style>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
}

export default Card