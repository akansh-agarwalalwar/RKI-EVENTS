import { apiClient } from '@/services/api';
import React, { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiTrash2, FiSearch, FiCalendar } from 'react-icons/fi';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
}

const ContactAdmin: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiClient.url}/contacts`);
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`${apiClient.url}/contacts/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          fetchContacts();
          if (selectedContact?._id === id) {
            setSelectedContact(null);
          }
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Contact Management</h1>
        <p className="text-gray-600 mt-1">Manage customer inquiries and messages</p>
      </div>

      {/* Search */}
      <div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">
                Contacts ({filteredContacts.length})
              </h2>
            </div>
            <div className="max-h-96 xl:max-h-[calc(100vh-300px)] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="p-6 text-center">
                  <FiMail className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-500">No contacts found</p>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact._id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedContact?._id === contact._id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {contact.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(contact._id);
                        }}
                        className="text-red-600 hover:text-red-900 p-1 flex-shrink-0"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {contact.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="xl:col-span-2">
          {selectedContact ? (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {selectedContact.name}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <FiCalendar className="mr-1 flex-shrink-0" size={14} />
                    <span className="truncate">
                      {new Date(selectedContact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(selectedContact._id)}
                  className="text-red-600 hover:text-red-700 px-3 py-1 border border-red-300 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                >
                  Delete
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <FiMail className="text-gray-400 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-blue-600 hover:text-blue-700 break-all"
                      >
                        {selectedContact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-gray-400 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <a
                        href={`tel:${selectedContact.phoneNumber}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {selectedContact.phoneNumber}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Message</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 whitespace-pre-wrap text-sm sm:text-base">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reply via Email
                  </a>
                  <a
                    href={`tel:${selectedContact.phoneNumber}`}
                    className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 sm:p-12 text-center">
              <FiMail className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a contact
              </h3>
              <p className="text-gray-600">
                Choose a contact from the list to view details and respond.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactAdmin;
