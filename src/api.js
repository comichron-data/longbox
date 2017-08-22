import axios from 'axios';

export function getComments(pageId) {
  const url = `https://comichron-data.github.io/staticman-comments-test/page-comments/${pageId}.json`;
  return axios.get(url)
    .then(response => response.data);
}

export function addComment({name, text, x, y, pageId}) {
  const url = `https://api.staticman.net/v2/entry/comichron-data/staticman-comments-test/master/comments`;

  const comment = {
    name,
    message: text,
    x,
    y,
    pageId
  };

  const params = Object.keys(comment)
    .reduce((wrappedProps, key) => {
      wrappedProps[`fields[${key}]`] = comment[key];
      return wrappedProps;
    }, {})

  return axios.post(url, params);
}
