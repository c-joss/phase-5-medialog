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

export function fetchItems(userId, categoryId) {
  const params = new URLSearchParams();
  if (userId) params.append('user_id', userId);
  if (categoryId) params.append('category_id', categoryId);

  return request(`/items?${params.toString()}`);
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

export function fetchCategories(userId) {
  const params = new URLSearchParams();
  if (userId) params.append('user_id', userId);
  return request(`/categories?${params.toString()}`);
}

export function createCategory(name, userId) {
  return request('/categories', {
    method: 'POST',
    body: JSON.stringify({ name, user_id: userId }),
  });
}

export function fetchTags() {
  return request('/tags');
}

export function createTag(name) {
  return request('/tags', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export function fetchCreators() {
  return request('/creators');
}

export function createCreator(name) {
  return request('/creators', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function downloadItemsExport(userId) {
  const params = new URLSearchParams();
  if (userId) params.append('user_id', userId);

  const res = await fetch(`${BASE_URL}/export/items?${params.toString()}`);

  if (!res.ok) {
    let message = 'Failed to export items';
    try {
      const text = await res.text();
      const data = JSON.parse(text);
      message = data?.errors?.join(', ') || data?.error || message;
    } catch (_) {}
    throw new Error(message);
  }

  return res.blob();
}

export function emailItemsExport(userId) {
  return request('/export/items/email', {
    method: 'POST',
    body: JSON.stringify({ user_id: userId }),
  });
}
