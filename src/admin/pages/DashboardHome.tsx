import { apiClient } from '@/services/api';
import React, { useState, useEffect } from 'react';
import { FiFileText, FiImage, FiMessageSquare, FiMail } from 'react-icons/fi';

interface Stats {
  blogs: number;
  gallery: number;
  testimonials: number;
  contacts: number;
}

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    blogs: 0,
    gallery: 0,
    testimonials: 0,
    contacts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Fetch stats from all endpoints
      const [blogsRes, galleryRes, testimonialsRes, contactsRes] = await Promise.all([
        fetch(`${apiClient.url}/blogs`),
        fetch(`${apiClient.url}/images`),
        fetch(`${apiClient.url}/testimonials`),
        fetch(`${apiClient.url}/contacts`)
      ]);

      const [blogs, gallery, testimonials, contacts] = await Promise.all([
        blogsRes.json(),
        galleryRes.json(),
        testimonialsRes.json(),
        contactsRes.json()
      ]);

      setStats({
        blogs: blogs.data?.length || 0,
        gallery: gallery.data?.length || 0,
        testimonials: testimonials.data?.length || 0,
        contacts: contacts.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Blogs',
      value: stats.blogs,
      icon: FiFileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Gallery Images',
      value: stats.gallery,
      icon: FiImage,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: FiMessageSquare,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Contact Messages',
      value: stats.contacts,
      icon: FiMail,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to RK Events Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className={`${card.bgColor} rounded-lg p-6 border border-gray-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <IconComponent className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiFileText className="text-blue-500 mb-2" size={24} />
            <h3 className="font-medium text-gray-900">Create New Blog</h3>
            <p className="text-sm text-gray-600">Add a new blog post</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiImage className="text-green-500 mb-2" size={24} />
            <h3 className="font-medium text-gray-900">Upload Images</h3>
            <p className="text-sm text-gray-600">Add to gallery</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiMessageSquare className="text-purple-500 mb-2" size={24} />
            <h3 className="font-medium text-gray-900">View Testimonials</h3>
            <p className="text-sm text-gray-600">Manage testimonials</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiMail className="text-orange-500 mb-2" size={24} />
            <h3 className="font-medium text-gray-900">Check Messages</h3>
            <p className="text-sm text-gray-600">Review contacts</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
