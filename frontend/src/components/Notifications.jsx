import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { useFetch } from '../hooks/useFetch';
import { Check } from 'lucide-react';
import Cookie from '../helpers/Cookie';
import image from '../assets/noNotifications.png';

function Notifications() {
  const accessToken = Cookie.get('accessToken');
  const [checked, setChecked] = useState(false);
  const [read, setRead] = useState(false);
  const { data, error } = useFetch(
    import.meta.env.VITE_SERVER_ORIGIN + '/api/notifications/get',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    read
  );

  const notifications = data?.data ?? [];

  async function handleNotificationRead(notificationId) {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_ORIGIN + `/api/notifications/read/${notificationId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {}
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        {notifications && notifications.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-600">Notifications</h1>
            <div className="space-y-4">
              {notifications.map((notification) =>
                !notification.read ? (
                  <div
                    key={notification._id}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex justify-between"
                  >
                    <div className="flex">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                      />
                      <p className="mx-2 text-gray-600">{notification.message}</p>
                    </div>
                    <div>
                      {checked ? (
                        <div onClick={() => handleNotificationRead(notification._id)}>
                          <Check
                            onClick={() => setRead(true)}
                            className="bg-gray-200 rounded-md hover:cursor-pointer"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center mt-10">
            <img src={image} width={300} height={300} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
