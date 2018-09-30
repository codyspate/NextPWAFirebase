import React from 'react'

export default ({ ...props }) => {
  return (
    <React.Fragment>
      <img {...props} className='Image' />
      <style jsx>{`
        .Image {
          height: auto;
          width: 100%;
          margin: auto;
          display: block;
          border-radius: 5px;
          box-shadow: 0 0px 13px 1px #00000085;
        }
      `}</style>
    </React.Fragment>
  )
}
