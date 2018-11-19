const router = routes => (data, callback) => {
  const route = routes.find(route => route.path === data.path && route.method === data.method);

  if (route) {
    const { code, payload } = route.context(data);

    callback(code, payload);
  }

  // fallback to 404 if no match
  callback(404, {});
};

const routes = [
  {
    path: 'hello',
    method: 'POST',
    context: data => ({ code: 200, payload: `message received: ${data.body || ''}` }) 
  }
];

module.exports = router(routes);