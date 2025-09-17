import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HelpScreenProps {
  onBack?: () => void
}

export function HelpScreen({ onBack }: HelpScreenProps) {
  const [searchTerm, setSearchTerm] = useState("Search Help Topics")
  const [activeTab, setActiveTab] = useState("About")

  const currentTime = new Date().toLocaleString()

  const helpSections = [
    { name: "ABOUT FINCEPT", status: "AVAILABLE", action: "VIEW" },
    { name: "FEATURES", status: "AVAILABLE", action: "VIEW" },
    { name: "MARKET DATA", status: "AVAILABLE", action: "VIEW" },
    { name: "PORTFOLIO", status: "AVAILABLE", action: "VIEW" },
    { name: "ANALYTICS", status: "AVAILABLE", action: "VIEW" },
    { name: "SUPPORT", status: "AVAILABLE", action: "CONTACT" },
    { name: "TUTORIALS", status: "COMING SOON", action: "NOTIFY" },
    { name: "API DOCS", status: "AVAILABLE", action: "OPEN" },
    { name: "COMMUNITY", status: "AVAILABLE", action: "JOIN" },
    { name: "FEEDBACK", status: "AVAILABLE", action: "SEND" }
  ]

  const features = [
    { category: "Market Data", description: "Real-time quotes, indices, forex, commodities", status: "ACTIVE", access: "ALL USERS" },
    { category: "Portfolio Mgmt", description: "Track holdings, P&L, asset allocation", status: "ACTIVE", access: "ALL USERS" },
    { category: "Technical Analysis", description: "Advanced charting, indicators, overlays", status: "ACTIVE", access: "PRO" },
    { category: "News & Sentiment", description: "Financial news aggregation, sentiment scoring", status: "ACTIVE", access: "PRO" },
    { category: "Risk Analytics", description: "VaR, stress testing, correlation analysis", status: "ACTIVE", access: "ENTERPRISE" },
    { category: "Algo Trading", description: "Strategy backtesting, execution algorithms", status: "BETA", access: "ENTERPRISE" },
    { category: "Options Analytics", description: "Greeks, volatility surface, strategies", status: "ACTIVE", access: "PRO" },
    { category: "Fixed Income", description: "Bond analytics, yield curves, duration", status: "ACTIVE", access: "ENTERPRISE" },
    { category: "ESG Analytics", description: "Sustainability metrics, ESG scoring", status: "COMING SOON", access: "PRO" },
    { category: "AI Insights", description: "Machine learning predictions, pattern recognition", status: "BETA", access: "ENTERPRISE" }
  ]

  const apiEndpoints = [
    { endpoint: "/api/v1/market/quotes", method: "GET", description: "Real-time market quotes", rateLimit: "1000/min", auth: "YES" },
    { endpoint: "/api/v1/portfolio/holdings", method: "GET", description: "Portfolio holdings data", rateLimit: "100/min", auth: "YES" },
    { endpoint: "/api/v1/news/latest", method: "GET", description: "Latest financial news", rateLimit: "500/min", auth: "NO" },
    { endpoint: "/api/v1/analytics/technical", method: "POST", description: "Technical analysis calculations", rateLimit: "50/min", auth: "YES" },
    { endpoint: "/api/v1/market/history", method: "GET", description: "Historical market data", rateLimit: "200/min", auth: "YES" },
    { endpoint: "/api/v1/user/profile", method: "GET", description: "User profile information", rateLimit: "10/min", auth: "YES" },
    { endpoint: "/api/v1/orders/submit", method: "POST", description: "Submit trading orders", rateLimit: "100/min", auth: "YES" },
    { endpoint: "/api/v1/market/screener", method: "POST", description: "Stock screening criteria", rateLimit: "50/min", auth: "YES" },
    { endpoint: "/api/v1/research/reports", method: "GET", description: "Research reports access", rateLimit: "20/min", auth: "YES" },
    { endpoint: "/api/v1/alerts/manage", method: "POST", description: "Manage price alerts", rateLimit: "100/min", auth: "YES" }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Background Pattern */}
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

      {/* Header */}
      <div className="relative z-10 bg-zinc-900/90 border-b border-zinc-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-primary font-bold text-xl">FINCEPT</span>
            <span className="text-white font-bold text-xl">HELP TERMINAL</span>
            <span className="text-zinc-500">|</span>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-800 border-zinc-600 text-white w-80"
              onFocus={() => searchTerm === "Search Help Topics" && setSearchTerm("")}
            />
            <Button className="bg-zinc-700 hover:bg-zinc-600">SEARCH</Button>
            <span className="text-zinc-500">|</span>
            <span className="text-white text-sm">{currentTime}</span>
          </div>
          <Button onClick={onBack} className="bg-zinc-700 hover:bg-zinc-600">
            BACK
          </Button>
        </div>

        {/* Function Keys */}
        <div className="flex space-x-2 mt-4">
          {["F1:ABOUT", "F2:FEATURES", "F3:SUPPORT", "F4:CONTACT", "F5:FEEDBACK", "F6:DOCS"].map((key) => (
            <Button
              key={key}
              className="bg-zinc-800 hover:bg-zinc-700 text-xs h-6 px-3"
              onClick={() => setActiveTab(key.split(":")[1])}
            >
              {key}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 p-4 space-x-4">
        {/* Left Panel - Help Navigator */}
        <Card className="w-80 bg-zinc-900/90 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-primary text-sm">HELP NAVIGATOR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {helpSections.map((section, index) => (
                <div key={index} className="flex justify-between items-center py-1 border-b border-zinc-800">
                  <span className="text-white text-xs">{section.name}</span>
                  <div className="flex space-x-2">
                    <span className={`text-xs ${section.status === "AVAILABLE" ? "text-green-400" : "text-yellow-400"}`}>
                      {section.status}
                    </span>
                    <span className={`text-xs ${section.action === "VIEW" ? "text-blue-400" : "text-primary"}`}>
                      {section.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-yellow-400 text-sm mb-2">HELP STATISTICS</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Total Help Topics:</span>
                  <span className="text-white">47</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Video Tutorials:</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">FAQ Articles:</span>
                  <span className="text-white">25</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">API Endpoints:</span>
                  <span className="text-white">156</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-yellow-400 text-sm mb-2">SYSTEM STATUS</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-xs">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Center Panel - Main Content */}
        <Card className="flex-1 bg-zinc-900/90 border-zinc-700">
          <CardContent className="p-6">
            <div className="border-b border-zinc-700 mb-4">
              <div className="flex space-x-4">
                {["About", "Features", "Support", "API Docs"].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-2 px-4 text-sm border-b-2 transition-colors ${
                      activeTab === tab || activeTab === tab.toUpperCase()
                        ? "border-primary text-primary"
                        : "border-transparent text-zinc-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {activeTab === "About" && (
                <div>
                  <h2 className="text-primary text-xl mb-4">ABOUT FINCEPT TERMINAL</h2>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-primary text-lg mb-2">Fincept Financial Terminal</h3>
                      <p className="text-zinc-400 mb-4">Professional Trading & Analytics Platform</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Version:</span>
                          <span className="text-white">4.2.1 Professional</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Build:</span>
                          <span className="text-white">20250115.1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">License:</span>
                          <span className="text-green-400">Enterprise</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Data Sources:</span>
                          <span className="text-green-400">Real-time</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">API Status:</span>
                          <span className="text-green-400">Connected</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-yellow-400 text-lg mb-2">Core Features</h3>
                      <ul className="text-zinc-300 space-y-1 text-sm">
                        <li>• Real-time market data & analytics</li>
                        <li>• Portfolio management & tracking</li>
                        <li>• Advanced charting & technical analysis</li>
                        <li>• Financial news & sentiment analysis</li>
                        <li>• Risk management tools</li>
                        <li>• Algorithmic trading support</li>
                        <li>• Multi-asset class coverage</li>
                        <li>• Professional-grade security</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-zinc-300 mt-6 leading-relaxed">
                    Fincept Terminal is a cutting-edge financial analysis platform designed to provide 
                    real-time market data, portfolio management, and actionable insights to investors, traders, 
                    and financial professionals. Our platform integrates advanced analytics, AI-driven sentiment analysis, 
                    and the latest market trends to help you make well-informed investment decisions.
                  </p>
                </div>
              )}

              {activeTab === "Features" && (
                <div>
                  <h2 className="text-primary text-xl mb-4">TERMINAL FEATURES & CAPABILITIES</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="text-left py-2 text-zinc-400">Feature Category</th>
                          <th className="text-left py-2 text-zinc-400">Description</th>
                          <th className="text-left py-2 text-zinc-400">Status</th>
                          <th className="text-left py-2 text-zinc-400">Access Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {features.map((feature, index) => (
                          <tr key={index} className="border-b border-zinc-800">
                            <td className="py-2 text-yellow-400">{feature.category}</td>
                            <td className="py-2 text-white">{feature.description}</td>
                            <td className={`py-2 ${
                              feature.status === "ACTIVE" ? "text-green-400" :
                              feature.status === "BETA" ? "text-yellow-400" : "text-primary"
                            }`}>
                              {feature.status}
                            </td>
                            <td className={`py-2 ${
                              feature.access === "ALL USERS" ? "text-green-400" :
                              feature.access === "PRO" ? "text-blue-400" : "text-primary"
                            }`}>
                              {feature.access}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "Support" && (
                <div>
                  <h2 className="text-primary text-xl mb-4">CUSTOMER SUPPORT & ASSISTANCE</h2>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-yellow-400 text-lg mb-2">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Email Support:</span>
                          <span className="text-blue-400">support@fincept.in</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Phone Support:</span>
                          <span className="text-white">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Live Chat:</span>
                          <span className="text-green-400">Available 24/7</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Response Time:</span>
                          <span className="text-green-400">&lt; 2 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Support Hours:</span>
                          <span className="text-green-400">24/7/365</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-yellow-400 text-lg mb-2">Support Channels</h3>
                      <div className="space-y-2">
                        <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start">📧 Email Support</Button>
                        <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start">💬 Live Chat</Button>
                        <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start">📞 Phone Support</Button>
                        <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start">📖 Documentation</Button>
                        <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start">🎥 Video Tutorials</Button>
                        <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start">👥 Community Forum</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "API Docs" && (
                <div>
                  <h2 className="text-primary text-xl mb-4">API DOCUMENTATION & ENDPOINTS</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="text-left py-2 text-zinc-400">Endpoint</th>
                          <th className="text-left py-2 text-zinc-400">Method</th>
                          <th className="text-left py-2 text-zinc-400">Description</th>
                          <th className="text-left py-2 text-zinc-400">Rate Limit</th>
                          <th className="text-left py-2 text-zinc-400">Auth Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiEndpoints.map((api, index) => (
                          <tr key={index} className="border-b border-zinc-800">
                            <td className="py-2 text-blue-400">{api.endpoint}</td>
                            <td className={`py-2 ${api.method === "GET" ? "text-green-400" : "text-primary"}`}>
                              {api.method}
                            </td>
                            <td className="py-2 text-white">{api.description}</td>
                            <td className="py-2 text-yellow-400">{api.rateLimit}</td>
                            <td className={`py-2 ${api.auth === "YES" ? "text-red-400" : "text-green-400"}`}>
                              {api.auth}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Quick Actions */}
        <Card className="w-80 bg-zinc-900/90 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-primary text-sm">QUICK ACTIONS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start text-sm">📞 Contact Support</Button>
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start text-sm">📝 Send Feedback</Button>
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start text-sm">📚 User Manual</Button>
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start text-sm">🎥 Watch Tutorials</Button>
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start text-sm">👥 Join Community</Button>
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start text-sm">🔄 Check Updates</Button>
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start text-sm">⚙️ System Settings</Button>
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 justify-start text-sm">🐛 Report Issue</Button>
            </div>

            <div className="mt-6">
              <h3 className="text-yellow-400 text-sm mb-2">SYSTEM INFORMATION</h3>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Terminal Version:</span>
                  <span className="text-white">4.2.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Build Date:</span>
                  <span className="text-white">2025-01-15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Platform:</span>
                  <span className="text-white">Windows 11</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Memory Usage:</span>
                  <span className="text-white">2.4 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Network Status:</span>
                  <span className="text-green-400">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Data Feed:</span>
                  <span className="text-green-400">Live</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-yellow-400 text-sm mb-2">RECENT HELP TOPICS</h3>
              <div className="space-y-1 text-xs">
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span className="text-white">How to create portfolios</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span className="text-white">Setting up price alerts</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span className="text-white">Understanding P&L calculations</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span className="text-white">Using technical indicators</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-zinc-900/90 border-t border-zinc-700 p-4">
        <div className="flex justify-between items-center text-xs text-zinc-500">
          <div className="flex space-x-4">
            <span>HELP STATUS: <span className="text-green-400">ONLINE</span></span>
            <span>SUPPORT AVAILABLE: <span className="text-green-400">24/7</span></span>
            <span>LAST UPDATED: <span className="text-white">2025-01-15</span></span>
            <span>HELP VERSION: <span className="text-white">4.2.1</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}