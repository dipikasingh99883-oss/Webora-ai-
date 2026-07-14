import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Line } from 'recharts';
import { Layout, Users, Activity, IndianRupee, Sparkles, TrendingUp } from 'lucide-react';

interface AdminAnalyticsProps {
  templatesCount: number;
  requestsCount: number;
}

export default function AdminAnalytics({ templatesCount, requestsCount }: AdminAnalyticsProps) {
  // Mock live metrics that update based on active requests and templates
  const totalClients = Math.max(12, requestsCount + 8);
  const activeProjects = Math.max(4, Math.round(requestsCount * 0.6));
  // In Rupees since founder CEO is Mr. Ujjwal Singh, and contact number is Indian
  const totalRevenue = Math.max(185000, requestsCount * 45000 + 95000);

  // Chart Data
  const templateUsageData = [
    { name: 'SaaS Spark', usage: Math.max(12, requestsCount * 3) },
    { name: 'Nova Portfolio', usage: Math.max(8, requestsCount * 2) },
    { name: 'Equinox Commerce', usage: Math.max(6, Math.round(requestsCount * 1.5)) },
    { name: 'Apex Corporate', usage: Math.max(9, requestsCount * 2) },
    { name: 'Aura Wellness', usage: Math.max(4, Math.round(requestsCount * 1)) },
  ];

  const conversionData = [
    { month: 'Jan', conversions: 4, revenue: 120000 },
    { month: 'Feb', conversions: 7, revenue: 210000 },
    { month: 'Mar', conversions: 11, revenue: 380000 },
    { month: 'Apr', conversions: 15, revenue: 540000 },
    { month: 'May', conversions: requestsCount + 12, revenue: totalRevenue },
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Templates */}
        <div className="p-6 rounded-2xl glass border border-[#EADBCE]/50 bg-white/70 flex items-center gap-4 hover:border-[#AA7C11]/50 transition-all shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#AA7C11]/10 text-[#AA7C11] flex items-center justify-center">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E7B6E] block">Total Templates</span>
            <span className="text-2xl font-bold text-[#312520] block">{templatesCount}</span>
            <span className="text-[10px] text-[#AA7C11] flex items-center gap-1 mt-0.5 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Dynamic library ready</span>
            </span>
          </div>
        </div>

        {/* Card 2: Total Clients */}
        <div className="p-6 rounded-2xl glass border border-[#EADBCE]/50 bg-white/70 flex items-center gap-4 hover:border-[#AA7C11]/50 transition-all shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#C5A86B]/15 text-[#AA7C11] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E7B6E] block">Total Clients</span>
            <span className="text-2xl font-bold text-[#312520] block">{totalClients}</span>
            <span className="text-[10px] text-[#AA7C11] flex items-center gap-1 mt-0.5 font-medium">
              <Activity className="w-3.5 h-3.5" />
              <span>Real-time connections</span>
            </span>
          </div>
        </div>

        {/* Card 3: Active Projects */}
        <div className="p-6 rounded-2xl glass border border-[#EADBCE]/50 bg-white/70 flex items-center gap-4 hover:border-[#AA7C11]/50 transition-all shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#AA7C11]/10 text-[#AA7C11] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E7B6E] block">Active Projects</span>
            <span className="text-2xl font-bold text-[#312520] block">{activeProjects}</span>
            <span className="text-[10px] text-[#AA7C11] flex items-center gap-1 mt-0.5 font-medium">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>48-72h SLA delivery</span>
            </span>
          </div>
        </div>

        {/* Card 4: Estimated Revenue */}
        <div className="p-6 rounded-2xl glass border border-[#EADBCE]/50 bg-white/70 flex items-center gap-4 hover:border-[#AA7C11]/50 transition-all shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#AA7C11]/10 text-[#AA7C11] flex items-center justify-center">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E7B6E] block">Estimated Revenue</span>
            <span className="text-2xl font-bold text-[#312520] block">
              {totalRevenue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
            </span>
            <span className="text-[10px] text-[#AA7C11] flex items-center gap-1 mt-0.5 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.5% MoM Growth</span>
            </span>
          </div>
        </div>

      </div>

      {/* Visual Analytics Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Graph 1: Template Usage Popularity */}
        <div className="p-6 rounded-2xl glass border border-[#EADBCE]/50 bg-white/70 space-y-4 shadow-sm">
          <div>
            <h4 className="text-sm font-serif font-bold uppercase tracking-wider text-[#312520]">Most Popular Layout Templates</h4>
            <p className="text-xs text-[#5C4C41] mt-1">Tracks template selection frequencies during customer specification compiles.</p>
          </div>
          
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={templateUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EADBCE" strokeOpacity={0.5} />
                <XAxis dataKey="name" stroke="#8E7B6E" />
                <YAxis stroke="#8E7B6E" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FAF6F0', borderColor: '#EADBCE', borderRadius: '12px', color: '#312520' }}
                  itemStyle={{ color: '#AA7C11' }}
                />
                <Bar dataKey="usage" fill="#C5A86B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2: Client Acquisition and Sales Revenue Trend */}
        <div className="p-6 rounded-2xl glass border border-[#EADBCE]/50 bg-white/70 space-y-4 shadow-sm">
          <div>
            <h4 className="text-sm font-serif font-bold uppercase tracking-wider text-[#312520]">Spec Conversion & Revenue Progress</h4>
            <p className="text-xs text-[#5C4C41] mt-1">Tracks month-over-month growth in completed website projects and payments.</p>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversionData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A86B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#C5A86B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EADBCE" strokeOpacity={0.5} />
                <XAxis dataKey="month" stroke="#8E7B6E" />
                <YAxis stroke="#8E7B6E" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FAF6F0', borderColor: '#EADBCE', borderRadius: '12px', color: '#312520' }}
                  itemStyle={{ color: '#AA7C11' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#AA7C11" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                <Line type="monotone" dataKey="conversions" stroke="#C5A86B" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
