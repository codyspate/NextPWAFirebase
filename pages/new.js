import Head from '../components/Head'
import React, { Component } from 'react'
import CenterLayout from '../components/CenterLayout'
import LinkToHome from '../components/LinkToHome'
import ActiveNotificationButton from '../components/ActiveNotificationButton';
import FormFeed from '../components/FormFeed';

export default class extends Component {
  render() {
    return (
      <React.Fragment>
        <Head title="Create new Feed" />
        <CenterLayout>
          <FormFeed onSubmitCallBack={() => this.props.url.back()} />
        </CenterLayout>
        <LinkToHome />
        <ActiveNotificationButton />
      </React.Fragment>
    )
  }
}
