
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, BookPlus, Users, Clock, Calendar, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Mock data for analytics
const monthlyReaders = [
  { name: 'Jan', count: 65 },
  { name: 'Feb', count: 59 },
  { name: 'Mar', count: 80 },
  { name: 'Apr', count: 81 },
  { name: 'May', count: 56 },
  { name: 'Jun', count: 55 },
  { name: 'Jul', count: 40 },
  { name: 'Aug', count: 72 },
  { name: 'Sep', count: 90 },
  { name: 'Oct', count: 85 },
  { name: 'Nov', count: 78 },
  { name: 'Dec', count: 62 }
];

const categoryData = [
  { name: 'Fiksi', value: 45 },
  { name: 'Non-Fiksi', value: 25 },
  { name: 'Akademik', value: 15 },
  { name: 'Komik', value: 10 },
  { name: 'Lainnya', value: 5 }
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const dailyActivities = [
  { day: 'Sen', borrow: 24, return: 16, read: 38 },
  { day: 'Sel', borrow: 18, return: 22, read: 42 },
  { day: 'Rab', borrow: 29, return: 19, read: 45 },
  { day: 'Kam', borrow: 32, return: 28, read: 50 },
  { day: 'Jum', borrow: 27, return: 31, read: 48 },
  { day: 'Sab', borrow: 43, return: 19, read: 62 },
  { day: 'Min', borrow: 35, return: 13, read: 55 }
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("weekly");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-[400px]">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="weekly">Minggu Ini</TabsTrigger>
            <TabsTrigger value="monthly">Bulan Ini</TabsTrigger>
            <TabsTrigger value="yearly">Tahun Ini</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,246</div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12% dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buku</CardTitle>
            <BookPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,872</div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+8% dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pembaca Aktif</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">845</div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+16% dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Statistik Kategori Buku</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Tren Pembaca Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyReaders}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    name="Pembaca"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Harian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyActivities}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="borrow" name="Peminjaman" fill="#8884d8" />
                <Bar dataKey="return" name="Pengembalian" fill="#82ca9d" />
                <Bar dataKey="read" name="Pembacaan Online" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
