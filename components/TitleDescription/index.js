import React from 'react'
import PropTypes from 'prop-types'

const TitleDescription = ({ children, blue, small, withoutMarginTop, withoutMarginBottom }) => {
  return (
    <React.Fragment>
      <h1
        className={
          `
          TitleDescription
          ${small && '--small'}
          ${blue && '--blue'}
          ${withoutMarginTop && '--withoutMarginTop'}
          ${withoutMarginBottom && '--withoutMarginBottom'}
        `
        }
      >
        {children}
      </h1>
      <style jsx>{`
        .TitleDescription {
          font-family: Raleway;
          font-size: 16px;
          font-weight: 400;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.5;
          letter-spacing: normal;
          color: #273b49;
        }
        
        .TitleDescription.--blue {
          color: #0d74af
        }
        
        .TitleDescription.--small {
          font-size: 14px;
        }
        
        .TitleDescription.--withoutMarginTop {
          margin-top: 0;
        }
        
        .TitleDescription.--withoutMarginBottom {
          margin-bottom: 0;
        }
      `}</style>
    </React.Fragment>
  )
}

TitleDescription.propTypes = {
  children: PropTypes.node.isRequired,
  small: PropTypes.bool
}

export default TitleDescription