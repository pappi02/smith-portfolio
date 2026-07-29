import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled route error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
            <div className="max-w-md space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">Unexpected issue</p>
              <h1 className="text-3xl font-serif">Something went wrong.</h1>
              <p className="text-sm leading-7 text-white/70">
                The page could not be loaded. Please refresh the page or return home and try again.
              </p>
              <a
                href="/"
                className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
              >
                Return home
              </a>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
