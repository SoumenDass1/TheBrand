import React, { useState } from 'react';
import {
    LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut,
    TrendingUp, DollarSign, Box
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const stats = [
        { title: 'Total Sales', value: '$12,450', icon: DollarSign, color: 'bg-green-100 text-green-600' },
        { title: 'Total Orders', value: '156', icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
        { title: 'Total Products', value: '48', icon: Box, color: 'bg-purple-100 text-purple-600' },
        { title: 'Total Users', value: '2,300', icon: Users, color: 'bg-orange-100 text-orange-600' },
    ];

    const recentOrders = [
        { id: '#ORD-001', customer: 'John Doe', date: '2025-12-01', amount: '$299.00', status: 'Delivered' },
        { id: '#ORD-002', customer: 'Jane Smith', date: '2025-12-02', amount: '$159.00', status: 'Processing' },
        { id: '#ORD-003', customer: 'Mike Johnson', date: '2025-12-03', amount: '$89.00', status: 'Shipped' },
        { id: '#ORD-004', customer: 'Sarah Wilson', date: '2025-12-03', amount: '$450.00', status: 'Pending' },
    ];

    const SidebarItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden lg:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
                </div>
                <nav className="px-4 space-y-2">
                    <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <SidebarItem id="products" icon={Package} label="Products" />
                    <SidebarItem id="orders" icon={ShoppingCart} label="Orders" />
                    <SidebarItem id="users" icon={Users} label="Users" />
                    <SidebarItem id="settings" icon={Settings} label="Settings" />
                </nav>
                <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500">Welcome back, Admin</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-green-500 text-sm font-medium flex items-center">
                                    <TrendingUp size={16} className="mr-1" /> +12%
                                </span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                        <button className="text-primary text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-primary">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.customer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{order.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{order.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
