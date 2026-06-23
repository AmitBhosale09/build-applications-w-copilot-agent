import { useEffect, useMemo, useState } from 'react'

function toDisplayValue(value) {
  if (value === null || value === undefined) {
    return '-'
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      total: payload.length,
      next: null,
      previous: null,
    }
  }

  if (payload && Array.isArray(payload.results)) {
    return {
      items: payload.results,
      total: typeof payload.count === 'number' ? payload.count : payload.results.length,
      next: payload.next ?? null,
      previous: payload.previous ?? null,
    }
  }

  if (payload && Array.isArray(payload.data)) {
    return {
      items: payload.data,
      total: payload.data.length,
      next: null,
      previous: null,
    }
  }

  return {
    items: [],
    total: 0,
    next: null,
    previous: null,
  }
}

function buildApiUrl(resourceName, endpointPath) {
  const normalizedEndpoint = endpointPath?.trim() || `/api/${resourceName}/`
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return {
      url: `https://${codespaceName}-8000.app.github.dev${normalizedEndpoint}`,
      isFallback: false,
    }
  }

  return {
    url: `http://localhost:8000${normalizedEndpoint}`,
    isFallback: true,
  }
}

function ResourceTable({ title, resourceName, endpointPath }) {
  const [rows, setRows] = useState([])
  const [meta, setMeta] = useState({ total: 0, next: null, previous: null })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const { url, isFallback } = useMemo(
    () => buildApiUrl(resourceName, endpointPath),
    [resourceName, endpointPath],
  )

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status} ${response.statusText}`)
        }

        const payload = await response.json()
        const normalized = normalizeItems(payload)

        if (!cancelled) {
          setRows(normalized.items)
          setMeta({
            total: normalized.total,
            next: normalized.next,
            previous: normalized.previous,
          })
        }
      } catch (loadError) {
        if (!cancelled) {
          setRows([])
          setMeta({ total: 0, next: null, previous: null })
          setError(loadError instanceof Error ? loadError.message : 'Failed to load data')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [url])

  const columns = useMemo(() => {
    if (!rows.length) {
      return []
    }

    const keys = new Set()
    rows.forEach((row) => {
      if (row && typeof row === 'object') {
        Object.keys(row).forEach((key) => keys.add(key))
      }
    })
    return [...keys]
  }, [rows])

  return (
    <section>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <h2 className="h5 mb-0">{title}</h2>
        <span className="badge text-bg-secondary">Total: {meta.total}</span>
      </div>

      <p className="text-body-secondary small mb-3">
        Endpoint: <code>{url}</code>
      </p>

      {isFallback ? (
        <div className="alert alert-warning py-2" role="alert">
          Using fallback API base because <code>VITE_CODESPACE_NAME</code> is not set.
        </div>
      ) : null}

      {isLoading ? <div className="alert alert-info">Loading {title.toLowerCase()}...</div> : null}

      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}

      {!isLoading && !error && rows.length === 0 ? (
        <div className="alert alert-light border" role="status">
          No records returned.
        </div>
      ) : null}

      {!isLoading && !error && rows.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row?._id ?? row?.id ?? `${resourceName}-${index}`}>
                  {columns.map((column) => (
                    <td key={`${resourceName}-${index}-${column}`}>{toDisplayValue(row?.[column])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="d-flex flex-wrap gap-2 mt-2">
        <span className={`badge ${meta.previous ? 'text-bg-info' : 'text-bg-light border'}`}>
          Previous: {meta.previous ? 'Yes' : 'No'}
        </span>
        <span className={`badge ${meta.next ? 'text-bg-info' : 'text-bg-light border'}`}>
          Next: {meta.next ? 'Yes' : 'No'}
        </span>
      </div>
    </section>
  )
}

export default ResourceTable