import Head from '../components/Head'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CenterLayout from '../components/CenterLayout'
import { FormFeed } from '../components/FormFeed ';

export default class extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired
  }

  render() {

    return (
      <React.Fragment>
        <Head title="Create new Feed" />
        <CenterLayout>
          <FormFeed />
        </CenterLayout>
      </React.Fragment>
    )
  }
}