import React from 'react'
import Link from 'next/link'


const LinkNewFeed = ({
  children
}) => {
  return (
    <React.Fragment>

      <Link href="/new">
        <span className='LinkNewFeed'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='LinkNewFeed-SVG'>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>
      </Link>

      <style jsx>{`
        .LinkNewFeed {
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

        .LinkNewFeed-SVG {
          position: absolute;
          right: 25%;
          bottom: 28%;
          cursor: pointer;
        }
    `}</style>
    </React.Fragment>
  )
}

export default LinkNewFeed