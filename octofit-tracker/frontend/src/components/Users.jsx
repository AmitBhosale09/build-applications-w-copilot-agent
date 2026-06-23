import ResourceTable from './ResourceTable.jsx'

function Users() {
  return <ResourceTable title="Users" resourceName="users" endpointPath="/api/users/" />
}

export default Users