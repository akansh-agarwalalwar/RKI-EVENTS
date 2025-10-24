import { apiClient } from '@/services/api';
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiFilter } from 'react-icons/fi';
interface ImageGallery {
  _id: string;
  imageUrl: string[];
  title: string;
  description: string;
  types: 'venue' | 'decoration' | 'photography' | 'catering' | 'reception' | 'other';
  createdAt: string;
  updatedAt: string;
}

const ImageGalleryAdmin: React.FC = () => {
  const [images, setImages] = useState<ImageGallery[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageGallery | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    types: 'venue' as ImageGallery['types'],
    imageUrl: [] as File[]
  });

  const imageTypes = [
    { value: 'venue', label: 'Venue' },
    { value: 'decoration', label: 'Decoration' },
    { value: 'photography', label: 'Photography' },
    { value: 'catering', label: 'Catering' },
    { value: 'reception', label: 'Reception' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiClient.url}/images`);
      const data = await response.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('types', formData.types);
      
      formData.imageUrl.forEach(file => {
        formDataToSend.append('imageUrl', file);
      });

      const url = editingImage ? `${apiClient.url}/images/${editingImage._id}` : `${apiClient.url}/images`;
      const method = editingImage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      const data = await response.json();
      if (data.success) {
        fetchImages();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image gallery?')) {
      try {
        const response = await fetch(`${apiClient.url}/images/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          fetchImages();
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const handleEdit = (image: ImageGallery) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      types: image.types,
      imageUrl: []
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      types: 'venue',
      imageUrl: []
    });
    setEditingImage(null);
  };

  const filteredImages = filterType === 'all' 
    ? images 
    : images.filter(image => image.types === filterType);

  // Helper function to get image URL
  const getImageUrl = (filename: string) => {
    return `${apiClient.image_url}/${filename}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Image Gallery Management</h1>
          <p className="text-gray-600 mt-1">Manage your image gallery</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
        >
          <FiPlus size={20} />
          <span>Add New Gallery</span>
        </button>
      </div>

      {/* Filter */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" size={20} />
            <span className="text-sm font-medium text-gray-700 sm:hidden">Filter by type:</span>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {imageTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          filteredImages.map((image) => (
            <div key={image._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={getImageUrl(image.imageUrl[0])}
                  alt={image.title}
                  className="w-full h-32 sm:h-48 object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 sm:gap-0">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">{image.title}</h3>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full self-start sm:self-auto">
                    {image.types}
                  </span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{image.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {image.imageUrl.length} image{image.imageUrl.length !== 1 ? 's' : ''}
                  </span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => handleEdit(image)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                {editingImage ? 'Edit Gallery' : 'Add New Gallery'}
              </h2>
              
              {/* Show existing images when editing */}
              {editingImage && editingImage.imageUrl.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Images
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {editingImage.imageUrl.map((filename, index) => (
                      <img
                        key={index}
                        src={getImageUrl(filename)}
                        alt={`Current image ${index + 1}`}
                        className="w-full h-16 sm:h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.types}
                    onChange={(e) => setFormData({ ...formData, types: e.target.value as ImageGallery['types'] })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {imageTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setFormData({ ...formData, imageUrl: Array.from(e.target.files || []) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {editingImage ? 'Select new images to replace existing ones' : 'Select multiple images for the gallery'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 order-1 sm:order-2"
                  >
                    {loading ? 'Saving...' : editingImage ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryAdmin;
