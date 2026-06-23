import ResourceTable from './ResourceTable.jsx'

function Leaderboard() {
  const endpointUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
    : 'http://localhost:8000/api/leaderboard'

  return <ResourceTable title="Leaderboard" resourceName="leaderboard" endpointPath={endpointUrl} />
}

export default Leaderboard