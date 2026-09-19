const KEY = 'ps_device_id';

// Client-generated and client-persisted only - the server never issues or validates this,
// it just needs to be a stable string sent on every progress-sync call (see docs on
// claimDeviceHistory in pariksha-saathi-server). Generated once, reused for the life of the browser
// profile.
export function getOrCreateDeviceId(): string {
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}
