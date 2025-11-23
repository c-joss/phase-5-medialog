const BASE_URL = 'http://127.0.0.1:5000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (_) {}

  if (!res.ok) {
    const message = data?.errors?.join(', ') || data?.error || res.statusText || 'Request failed';
    throw new Error(message);
  }

  return data;
}

export function login(email, password) {
  return request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function fetchItems() {
  return request('/items');
}

export function fetchItem(id) {
  return request(`/items/${id}`);
}

export function createItem(payload) {
  return request('/items', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateItem(id, payload) {
  return request(`/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteItem(id) {
  return request(`/items/${id}`, {
    method: 'DELETE',
  });
}
