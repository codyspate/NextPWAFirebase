import React from 'react'
import PropTypes from 'prop-types'

const CenterLayout = ({
  children
}) => {
  return (
    <div className="CenterLayout">

      {children}

      <style jsx>{`
        .CenterLayout {
          min-height: 100vh;
          display: flex;
          background-color: #009688;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-family: 'Raleway', 'Arial'
        }
    `}</style>
    </div>
  )
}

CenterLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CenterLayout