import ResourceTable from './ResourceTable.jsx'

function Activities() {
  const endpointUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities'

  return <ResourceTable title="Activities" resourceName="activities" endpointPath={endpointUrl} />
}

export default Activities