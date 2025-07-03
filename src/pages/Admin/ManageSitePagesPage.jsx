import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialForm = { slug: '', title: '', content: '' };

const ManageSitePagesPage = () => {
  const token = localStorage.getItem('token');
  const [pages, setPages] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/pages', { headers });
      setPages(res.data);
    } catch (err) {
      console.error('Failed to fetch pages:', err);
      setError('Could not load pages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/api/pages/${editing}`, form, { headers });
      } else {
        await axios.post('/api/pages', form, { headers });
      }
      setForm(initialForm);
      setEditing(null);
      fetchPages();
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save page');
    }
  };

  const handleEdit = (slug) => {
    const page = pages.find((p) => p.slug === slug);
    if (page) {
      setForm({ slug: page.slug, title: page.title, content: page.content });
      setEditing(slug);
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm('Delete page?')) return;
    try {
      await axios.delete(`/api/pages/${slug}`, { headers });
      fetchPages();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete page');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Manage Site Pages
      </h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="Slug"
          className="border px-3 py-1 rounded w-full"
          required
        />
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="border px-3 py-1 rounded w-full"
          required
        />
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Content"
          className="border px-3 py-1 rounded w-full"
          rows="4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {editing ? 'Update' : 'Create'} Page
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setEditing(null);
            }}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((p) => (
              <tr key={p.slug}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {p.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {p.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                  <button
                    onClick={() => handleEdit(p.slug)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.slug)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSitePagesPage;
