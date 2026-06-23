import ResourceTable from './ResourceTable.jsx'

function Workouts() {
  const endpointUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts'

  return <ResourceTable title="Workouts" resourceName="workouts" endpointPath={endpointUrl} />
}

export default Workouts