import appLogo from './assets/octofitapp-small.png'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <img src={appLogo} width="56" height="56" alt="OctoFit Tracker logo" />
                <div>
                  <h1 className="h3 mb-1">OctoFit Tracker</h1>
                  <p className="text-body-secondary mb-0">Modern multi-tier fitness platform scaffold</p>
                </div>
              </div>

              <p className="mb-4">
                Frontend runs on <strong>5173</strong>, backend API runs on <strong>8000</strong>, and MongoDB runs on <strong>27017</strong>.
              </p>

              <div className="alert alert-primary mb-0" role="alert">
                Initial stack is ready: React 19 + Vite, Express + TypeScript, and Mongoose.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
