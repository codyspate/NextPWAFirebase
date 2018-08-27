import React from 'react'
import Link from 'next/link'

const LinkToHome = ({
  children
}) => {
  return (
    <React.Fragment>

      <Link href="/">
        <span className='LinkToHome'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='LinkToHome-SVG'>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>
      </Link>

      <style jsx>{`
        .LinkToHome {
          z-index: 1000;
          position: fixed;
          bottom: 0;
          right: 0;
          margin-right: 20px;
          margin-bottom: 20px;
          padding: 30px;
          border-radius: 50%;
          font-size: 24px;
          height: 48px;
          min-width: 48px;
          width: 48px;
          padding: 0;
          overflow: hidden;
          background: white;
          box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.24);
          line-height: normal;
        }

        .LinkToHome-SVG {
          position: absolute;
          right: 25%;
          bottom: 28%;
          cursor: pointer;
        }
    `}</style>
    </React.Fragment>
  )
}

export default LinkToHome