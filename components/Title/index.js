import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ children, blue, withoutMarginTop, withoutMarginBottom }) => {
  return (
    <React.Fragment>
      <h1
        className={
          `
        Title
          ${blue && '--blue'}
          ${withoutMarginTop && '--withoutMarginTop'}
          ${withoutMarginBottom && '--withoutMarginBottom'}
          `
        }
      >
        {children}
      </h1>
      <style jsx>{`
        .Title {
          font-family: Raleway;
          font-size: 32px;
          font-weight: 400;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.25;
          letter-spacing: normal;
          color: #273b49
        }
        
        .Title.--blue {
          color: #0d74af;
        }
        
        .Title.--withoutMarginTop {
          margin-top: 0;
        }
        
        .Title.--withoutMarginBottom {
          margin-bottom: 0;
        }
      `}</style>
    </React.Fragment>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  blue: PropTypes.bool,
  withoutMarginTop: PropTypes.bool,
  withoutMarginBottom: PropTypes.bool
}

export default Title