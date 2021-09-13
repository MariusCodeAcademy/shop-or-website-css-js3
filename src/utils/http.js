import axios from 'axios';

export const postData = async (dataToSend, urlEnd, register, token = null) => {
  const sendPayload = register
    ? {
        username: dataToSend.email,
        email: dataToSend.email,
        password: dataToSend.password,
      }
    : { identifier: dataToSend.email, password: dataToSend.password };
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_STRAPI_URL}${urlEnd}`,
      sendPayload
      // {
      //   headers: {
      //     Authorization: 'Bearer token'
      //   },
      // }
    );
    return data;
  } catch (error) {
    console.warn(error);
  }
};
