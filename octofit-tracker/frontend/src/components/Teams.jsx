import ResourceTable from './ResourceTable.jsx'

function Teams() {
  const endpointUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
    : 'http://localhost:8000/api/teams'

  return <ResourceTable title="Teams" resourceName="teams" endpointPath={endpointUrl} />
}

export default Teams