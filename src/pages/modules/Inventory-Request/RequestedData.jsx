// Mock request data for Inventory Request page (JSX module)
// Exports grouped lists: allRequests, pendingRequests, approvedRequests, deliveredRequests, rejectedRequests

const base = (overrides = {}) => ({
  id: Math.random().toString(36).slice(2, 9),
  name: 'Ro Membrane Filter',
  model: 'RMF-200',
  requestId: 'REQ' + Math.floor(Math.random() * 900 + 100),
  quantity: '2 unit(s)',
  requestDate: '1/5/2025',
  reason: 'Replacement needed for customer installations',
  vendor: 'Techno Supplies',
  location: 'Warehouse A',
  createdAt: '2025-01-05T09:00:00Z',
  milestones: [
    { label: 'Delivered', date: '1/8/2025', state: 'done' },
    { label: 'Approved', date: '1/8/2025', state: 'approved' },
    { label: 'Requested', date: '1/8/2025', state: 'pending' },
  ],
  ...overrides,
});

// Create several sample items with different statuses
const deliveredRequests = [
  base({ status: 'Delivered', requestId: 'REQ001', name: 'Ro Membrane Filter' }),
  base({ status: 'Delivered', requestId: 'REQ002', name: 'Sediment Filter' }),
];

const approvedRequests = [
  base({ status: 'Approved', requestId: 'REQ010', name: 'Carbon Filter' }),
];

const pendingRequests = [
  base({ status: 'Pending', requestId: 'REQ020', name: 'O-Ring Set' }),
  base({ status: 'Pending', requestId: 'REQ021', name: 'Valve Assembly' }),
  base({ status: 'Pending', requestId: 'REQ022', name: 'Pressure Gauge' }),
];

const rejectedRequests = [
  base({ status: 'Rejected', requestId: 'REQ050', name: 'Special Adapter' }),
];

const allRequests = [...pendingRequests, ...approvedRequests, ...deliveredRequests, ...rejectedRequests];

function getRequestsByStatus(status) {
  if (!status || status === 'all') return allRequests;
  switch (status.toLowerCase()) {
    case 'pending':
      return pendingRequests;
    case 'approved':
    case 'completed':
      // support both 'approved' and 'completed' keys
      return approvedRequests;
    case 'delivered':
      return deliveredRequests;
    case 'rejected':
      return rejectedRequests;
    default:
      return allRequests.filter((r) => (r.status || '').toLowerCase() === status.toLowerCase());
  }
}

export { allRequests, pendingRequests, approvedRequests, deliveredRequests, rejectedRequests, getRequestsByStatus };