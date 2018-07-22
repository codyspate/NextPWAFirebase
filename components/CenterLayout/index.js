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
          display: flex;
          padding: 15px;
          justify-content: center;
          background-color: #009688;
          box-shadow: 0 0 9px 1px #272727;
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