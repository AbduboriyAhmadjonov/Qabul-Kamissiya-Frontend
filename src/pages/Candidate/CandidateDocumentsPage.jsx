import { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateDocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const userId = localStorage.getItem('userId'); // Get current candidate ID
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/api/candidates/${userId}/documents`,
          {
            // API endpoint to get candidate's documents
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocuments(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch documents:', err);
        setError('Could not load your documents.');
        setLoading(false);
      }
    };
    if (userId) fetchDocuments();
    else {
      setError('User ID not found. Please log in.');
      setLoading(false);
    }
  }, [userId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus(''); // Clear previous status
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }
    if (!userId) {
      setUploadStatus('User not identified.');
      return;
    }

    setUploading(true);
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('document', selectedFile); // Key must match your backend expectation
    // Optionally append documentType if your API requires it on upload
    // formData.append('documentType', 'Passport');

    try {
      // API endpoint for uploading documents
      const response = await axios.post(
        `/api/candidates/${userId}/documents`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUploadStatus('Upload successful!');
      // Refresh the list of documents
      setDocuments([...documents, response.data]); // Add new document to state
      setSelectedFile(null); // Clear selected file
      // Reset file input value if needed (can be tricky with controlled components)
      document.getElementById('documentUpload').value = '';
    } catch (err) {
      console.error('Document upload failed:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setUploadStatus(`Upload failed: ${err.response.data.error}`);
      } else {
        setUploadStatus('Upload failed. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return <div className="text-center py-10">Loading documents...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Documents</h1>

      <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">
          Upload New Document
        </h3>
        <div className="flex items-center space-x-4">
          <input
            id="documentUpload"
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            className={`px-6 py-2 text-white rounded-lg font-semibold ${
              uploading || !selectedFile
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {uploadStatus && (
          <p
            className={`mt-2 text-sm ${
              uploadStatus.includes('failed')
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            {uploadStatus}
          </p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Submitted Documents
      </h2>
      {documents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Document Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  File Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Uploaded On
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {doc.documentType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        doc.status === 'Verified'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {doc.status || 'Pending Review'}{' '}
                      {/* Assuming a status field */}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => window.open(doc.fileUrl, '_blank')}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-10 text-gray-600">
          You haven't uploaded any documents yet.
        </p>
      )}
    </div>
  );
};

export default CandidateDocumentsPage;
