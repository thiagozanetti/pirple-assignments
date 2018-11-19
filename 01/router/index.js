const router = routes => (data, callback) => {
  // try to find the given route between declared
  const route = routes.find(route => route.path === data.path && route.method === data.method);

  if (route) {
    // get the route handler response
    const { code, payload } = route.context(data);

    // pass the response back to the server handler
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