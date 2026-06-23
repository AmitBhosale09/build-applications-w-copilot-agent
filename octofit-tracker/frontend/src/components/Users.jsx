import ResourceTable from './ResourceTable.jsx'

function Users() {
  const endpointUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
    : 'http://localhost:8000/api/users'

  return <ResourceTable title="Users" resourceName="users" endpointPath={endpointUrl} />
}

export default Users