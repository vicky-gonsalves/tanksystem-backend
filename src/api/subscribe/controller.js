const webpush = require('web-push');
const fakeDatabase = [];
export const subscription = (req, res, next) => {
  const subscription = req.body;
  fakeDatabase.push(subscription)
};

export const sendNotification = (req, res, next) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png',
    },
  };

  const promises = [];
  fakeDatabase.forEach(subscription => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    )
  });
  Promise.all(promises).then(() => res.sendStatus(200));
};
