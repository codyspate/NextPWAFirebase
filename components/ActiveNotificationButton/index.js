import React, { Component } from 'react'
import { urlBase64ToUint8Array } from '../../utils/utility';

export default class ActiveNotificationButton extends Component {
  displayConfirmNotification = () => {
    const img = 'static/icons/app-icon-96x96.png'
    if ('serviceWorker' in navigator) {
      var options = {
        body: 'You successfully subscribed to our Notification service!',
        icon: img,
        dir: 'ltr',
        lang: 'en-US', // BCP 47,
        vibrate: [100, 50, 200],
        badge: img,
        tag: 'confirm-notification',
        renotify: true,
        actions: [
          { action: 'confirm', title: 'Okay', icon: img }
        ]
      };

      navigator.serviceWorker.ready.then(serviceWorker => {
        serviceWorker.showNotification('Successfully subscribed!', options);
      });
    }
  }

  configurePushSub = () => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    let reg;
    navigator.serviceWorker.ready
      .then(serviceWorker => {
        reg = serviceWorker;
        return serviceWorker.pushManager.getSubscription();
      })
      .then(sub => {
        if (sub === null) {
          // Create a new subscription
          let vapidPublicKey = 'BKapuZ3XLgt9UZhuEkodCrtnfBo9Smo-w1YXCIH8YidjHOFAU6XHpEnXefbuYslZY9vtlEnOAmU7Mc-kWh4gfmE';
          let convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidPublicKey
          });
        } else {
          // We have a subscription
        }
      })
      .then(newSub => {
        return fetch('https://pwagram-7decd.firebaseio.com/subscriptions.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(newSub)
        })
      })
      .then(res => {
        if (res.ok) {
          this.displayConfirmNotification();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleNotification = () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      Notification.requestPermission(result => {
        console.log('User Choice', result);
        if (result !== 'granted') {
          console.log('No notification permission granted!');
        } else {
          this.configurePushSub();
        }
      });
    }
  }

  render() {
    const { handleNotification } = this
    return (
      <React.Fragment>

        <span className='ActiveNotificationButton' onClick={handleNotification}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='ActiveNotificationButton-SVG'>
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </span>

        <style jsx>{`
        .ActiveNotificationButton {
          z-index: 1000;
          position: fixed;
          bottom: 0;
          right: 0;
          margin-right: 6rem;
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

        .ActiveNotificationButton-SVG {
          position: absolute;
          right: 25%;
          bottom: 28%;
          cursor: pointer;
        }
    `}</style>
      </React.Fragment>
    )
  }
}