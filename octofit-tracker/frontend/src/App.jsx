import appLogo from './assets/octofitapp-small.png'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const usingFallbackApi = !codespaceName

  const links = [
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/teams', label: 'Teams' },
    { to: '/users', label: 'Users' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <img src={appLogo} width="56" height="56" alt="OctoFit Tracker logo" />
                <div>
                  <h1 className="h3 mb-1">OctoFit Tracker</h1>
                  <p className="text-body-secondary mb-0">React 19 presentation tier with API-backed resource views</p>
                </div>
              </div>

              {usingFallbackApi ? (
                <div className="alert alert-warning" role="alert">
                  <strong>Missing VITE_CODESPACE_NAME.</strong> Using local fallback API URLs so the app does not generate invalid
                  <code className="ms-1">https://undefined-8000.app.github.dev</code> requests.
                </div>
              ) : null}

              <nav className="nav nav-pills flex-wrap gap-2 mb-4" aria-label="Primary navigation">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-body-emphasis'}`}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <Routes>
                <Route path="/" element={<Navigate to="/activities" replace />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/users" element={<Users />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
