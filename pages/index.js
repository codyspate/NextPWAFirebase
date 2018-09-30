import Head from '../components/Head'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import Card from '../components/Card'
import uuid from 'uuid'
import CenterLayout from '../components/CenterLayout'
import LinkNewFeed from '../components/LinkNewFeed';
import ActiveNotificationButton from '../components/ActiveNotificationButton';

export default class extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired
  }

  static getInitialProps = async ({ req }) => {
    const res = await axios.get('https://pwagram-7decd.firebaseio.com/posts.json')
      .then(function (response) {
        return response.data
      })
    return { posts: res }
  }

  render() {
    const { posts } = this.props
    const arrayOfPost = []

    for (let i in posts) {
      arrayOfPost.push(
        {
          id: posts[i].id,
          image: posts[i].image,
          title: posts[i].title,
          location: posts[i].location
        }
      )
    }

    return (
      <React.Fragment>
        <Head title="Home" />
        <CenterLayout>
          {arrayOfPost.reverse().map(post => (
            <Card
              key={uuid()}
              {...post}
            />
          ))}
        </CenterLayout>
        <LinkNewFeed />
        <ActiveNotificationButton />
      </React.Fragment>
    )
  }
}
