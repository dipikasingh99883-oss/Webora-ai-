import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getAccessToken } from '../firebase';
import { FileText, Download, Check, AlertCircle, Loader, ExternalLink } from 'lucide-react';

interface RequirementPreviewProps {
  documentText: string;
  projectName: string;
  hasGoogleToken: boolean;
  onTriggerGoogleLogin: () => void;
}

export default function RequirementPreview({
  documentText,
  projectName,
  hasGoogleToken,
  onTriggerGoogleLogin
}: RequirementPreviewProps) {
  const [exporting, setExporting] = useState(false);
  const [exportedFileUrl, setExportedFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExportToGoogleDrive = async () => {
    // MANDATORY USER CONFIRMATION DIALOG FOR OAUTH WRITING ACTIONS
    const confirmed = window.confirm(
      `Confirm Google Drive Export:\n\nThis will create a new document named "Webora_${projectName || 'AI'}_Requirements.md" in your Google Drive root.\n\nDo you grant Webora AI permission to upload this file on your behalf?`
    );
    if (!confirmed) return;

    setExporting(true);
    setError(null);
    setExportedFileUrl(null);

    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error('Google Drive access token has expired or is invalid. Please sign out and sign in with Google again.');
      }

      // Metadata for the file creation
      const metadata = {
        name: `Webora_${projectName.replace(/\s+/g, '_') || 'AI'}_Requirements.md`,
        mimeType: 'text/markdown',
      };

      const boundary = 'WEBORA_MULTIPART_BOUNDARY_2026';
      const delimiter = `\r\n--${boundary}\r\n`;
      const close_delim = `\r\n--${boundary}--`;

      // Multipart upload body
      const body = 
        delimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: text/markdown\r\n\r\n' +
        documentText +
        close_delim;

      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload requirements file to Google Drive.');
      }

      const responseData = await response.json();
      if (responseData.id) {
        setExportedFileUrl(`https://drive.google.com/file/d/${responseData.id}/view`);
      } else {
        throw new Error('Upload succeeded but Google Drive did not return a valid File ID.');
      }
    } catch (err: any) {
      console.error('Export Error:', err);
      setError(err.message || 'An unexpected error occurred during the Google Drive upload.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="rounded-2xl glass overflow-hidden border border-gray-800 flex flex-col h-[600px] flex-grow">
      {/* Header */}
      <div className="p-4 bg-gray-900/60 border-b border-b-gray-850 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Requirement Document</h4>
            <p className="text-[10px] text-gray-400">Compiled specifications & development blueprint</p>
          </div>
        </div>

        {/* Google Drive Export buttons */}
        <div className="flex items-center gap-2">
          {!hasGoogleToken ? (
            <button
              onClick={onTriggerGoogleLogin}
              className="text-xs bg-gray-800 hover:bg-gray-750 text-white font-semibold py-2 px-3.5 rounded-xl border border-gray-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Connect Drive to Export</span>
            </button>
          ) : exportedFileUrl ? (
            <a
              href={exportedFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg shadow-emerald-500/10 flex items-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Open in Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={handleExportToGoogleDrive}
              disabled={exporting}
              className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg shadow-blue-500/10 flex items-center gap-1.5 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {exporting ? <Loader className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{exporting ? 'Exporting...' : 'Export to Drive'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Output Content */}
      <div className="flex-grow p-6 overflow-y-auto bg-gray-950/40">
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4.5 h-4.5 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {exportedFileUrl && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2.5">
            <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold">Successfully uploaded to Google Drive!</p>
              <p className="text-gray-400 text-[10px] mt-0.5">You can view the document directly in your drive root folder.</p>
            </div>
          </div>
        )}

        {/* Document Markdown Body */}
        {documentText ? (
          <div className="prose">
            <ReactMarkdown>{documentText}</ReactMarkdown>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-8 space-y-3">
            <FileText className="w-12 h-12 text-gray-700" />
            <div>
              <p className="text-sm font-bold text-gray-400">No Specification Document Generated Yet</p>
              <p className="text-xs text-gray-600 max-w-sm mt-1">
                Complete the step-by-step chat consultation with our AI Web Agent to convert your ideas into a detailed, formal document ready for execution.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
