const apiUrl = "/api/subscription"

// Get all subscriptions
export const getAllSubscriptions = () => {
  return fetch(apiUrl).then(res => res.json())
}

// Get a subscription by ID
export const getSubscriptionById = (id) => {
  return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

// Create a new subscription
export const createSubscription = (subscriptionData) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscriptionData)
  }).then(res => res.json())
}
export const deleteSubscription = (id) => {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to delete order");
    }
    return res.status === 204 ? null : res.json();
  });
}