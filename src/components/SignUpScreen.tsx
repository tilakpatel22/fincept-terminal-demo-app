import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SignUpScreenProps {
  onSwitchToSignIn?: () => void
  onNavigateToHelp?: () => void
}

export function SignUpScreen({ onSwitchToSignIn, onNavigateToHelp }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.username.trim()) newErrors.username = "Terminal username is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log("Sign up attempt:", formData)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">
      {/* Premium Grid Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="2" height="2" patternUnits="userSpaceOnUse">
              <path d="M 2 0 L 0 0 0 2" fill="none" stroke="#404040" strokeWidth="0.15" opacity="0.8"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Diamond Pattern Overlay */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1600 1200">
          {Array.from({ length: 80 }).map((_, i) => {
            const x = (i % 16) * 100
            const y = Math.floor(i / 16) * 240
            const offset = (Math.floor(i / 16) % 2) * 50
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
      <div className="relative z-10 flex items-center justify-center flex-1 py-8">
        <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-lg p-8 w-full max-w-lg mx-4 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-white text-3xl font-light mb-4">Create Account</h2>
            <p className="text-zinc-400 text-sm leading-6">
              Register for a new FinceptTerminal account to access our financial terminal services and market data.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white text-sm">First name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className={`bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 py-3 focus:border-primary focus:ring-primary ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white text-sm">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className={`bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 py-3 focus:border-primary focus:ring-primary ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-white text-sm">Terminal username</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-3 bg-zinc-600 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-1 bg-zinc-400 rounded-sm"></div>
                  </div>
                </div>
                <Input
                  id="username"
                  placeholder="Terminal username"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className={`bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 pl-10 py-3 focus:border-primary focus:ring-primary ${
                    errors.username ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-xs">{errors.username}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@company.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 py-3 focus:border-primary focus:ring-primary ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm">Password</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-3 bg-zinc-600 rounded-sm flex items-center justify-center">
                    <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                  </div>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 pl-10 py-3 focus:border-primary focus:ring-primary ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white text-sm">Confirm password</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-3 bg-zinc-600 rounded-sm flex items-center justify-center">
                    <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                  </div>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className={`bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 pl-10 py-3 focus:border-primary focus:ring-primary ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1.5 w-4 h-4 bg-zinc-800 border-zinc-600 rounded" 
                required 
              />
              <Label htmlFor="terms" className="text-zinc-400 text-sm leading-5">
                I agree to the FinceptTerminal{" "}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Privacy Policy
                </a>
              </Label>
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
                    Creating...
                  </div>
                ) : "Create Account"}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-700">
            <p className="text-zinc-400 text-sm text-center">
              Already have an account?{" "}
              <button 
                type="button"
                onClick={onSwitchToSignIn}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Sign In
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