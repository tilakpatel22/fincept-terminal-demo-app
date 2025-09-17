import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginScreenProps {
  onSwitchToSignUp?: () => void
  onNavigateToHelp?: () => void
}

export function LoginScreen({ onSwitchToSignUp, onNavigateToHelp }: LoginScreenProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log("Login attempt:", { username, password })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col" style={{ minHeight: '100vh', height: '100%' }}>
      {/* Fixed Background - Covers entire viewport and beyond */}
      <div className="fixed inset-0 w-full h-full" style={{ top: '-10vh', left: '-10vw', right: '-10vw', bottom: '-10vh', width: '120vw', height: '120vh' }}>
        <div className="w-full h-full bg-black">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="2" height="2" patternUnits="userSpaceOnUse">
                <path d="M 2 0 L 0 0 0 2" fill="none" stroke="#404040" strokeWidth="0.15" opacity="0.8"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Fixed Diamond Pattern Overlay */}
      <div className="fixed inset-0 w-full h-full" style={{ top: '-10vh', left: '-10vw', right: '-10vw', bottom: '-10vh', width: '120vw', height: '120vh' }}>
        <div className="w-full h-full bg-black">
          <svg className="w-full h-full" viewBox="0 0 1600 1200">
            {Array.from({ length: 120 }).map((_, i) => {
              const x = (i % 20) * 100
              const y = Math.floor(i / 20) * 240
              const offset = (Math.floor(i / 20) % 2) * 50
              return (
                <g key={i} opacity="0.25">
                  <path
                    d={`M${x + offset},${y} L${x + 50 + offset},${y + 60} L${x + 100 + offset},${y} L${x + 50 + offset},${y - 60} Z`}
                    fill="none"
                    stroke="#525252"
                    strokeWidth="0.8"
                  />
                  <circle
                    cx={x + 50 + offset}
                    cy={y}
                    r="2"
                    fill="#737373"
                    opacity="0.6"
                  />
                  <path
                    d={`M${x + 25 + offset},${y + 30} L${x + 75 + offset},${y + 30}`}
                    stroke="#525252"
                    strokeWidth="0.4"
                    opacity="0.7"
                  />
                  <path
                    d={`M${x + 25 + offset},${y - 30} L${x + 75 + offset},${y - 30}`}
                    stroke="#525252"
                    strokeWidth="0.4"
                    opacity="0.7"
                  />
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-8 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">FinceptTerminal</h1>
        <button 
          onClick={onNavigateToHelp}
          className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Help
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center flex-1">
        <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-lg p-8 w-full max-w-md mx-4 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-white text-3xl font-light mb-4">Login</h2>
            <p className="text-zinc-400 text-sm leading-6">
              This is a secure FinceptTerminal authentication service that allows you access to FinceptTerminal services from wherever you are.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white text-sm">
                Terminal username
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-3 bg-zinc-600 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-1 bg-zinc-400 rounded-sm"></div>
                  </div>
                </div>
                <Input
                  id="username"
                  type="text"
                  placeholder="Terminal username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 pl-10 py-3 focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-white text-sm">
                  Password
                </Label>
                <a href="#" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                  Forgot Password
                </a>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-3 bg-zinc-600 rounded-sm flex items-center justify-center">
                    <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                  </div>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 pl-10 py-3 focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="text-zinc-400 text-sm">
              Your B-Unit may be required to log in.
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-2 font-normal transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Next
                  </div>
                ) : "Next"}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-700">
            <p className="text-zinc-400 text-sm text-center">
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={onSwitchToSignUp}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="relative z-10 p-4 text-xs text-zinc-500 flex justify-between items-center mt-auto border-t border-zinc-800">
        <div>© 2025 FinceptTerminal LP All rights reserved.</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-zinc-400 transition-colors">Contact Us</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Trademarks</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
          <button 
            onClick={onNavigateToHelp}
            className="hover:text-zinc-400 transition-colors"
          >
            Help Center
          </button>
        </div>
      </div>
    </div>
  )
}