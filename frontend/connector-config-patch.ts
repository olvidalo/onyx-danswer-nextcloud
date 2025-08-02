// Addition to web/src/lib/connectors/connectors.tsx

// 1. Add NextcloudConfig interface after other config interfaces:

export interface NextcloudConfig {
  server_url: string;
  username: string;
  password: string;
  path_filter?: string;
  file_extensions?: string[];
}

// 2. Add to connectorConfigs object:

nextcloud: {
  description: "Configure Nextcloud connector",
  values: [
    {
      type: "text",
      query: "Enter your Nextcloud server URL (e.g., https://cloud.example.com):",
      label: "Server URL",
      name: "server_url",
      optional: false,
      description: "The base URL of your Nextcloud instance",
    },
    {
      type: "text", 
      query: "Enter your Nextcloud username:",
      label: "Username",
      name: "username",
      optional: false,
      description: "Your Nextcloud username for authentication",
    },
    {
      type: "text",
      query: "Enter your Nextcloud password or app password:",
      label: "Password",
      name: "password",
      optional: false,
      description: "Your Nextcloud password or app-specific password",
    },
  ],
  advanced_values: [
    {
      type: "text",
      query: "Enter path filter (optional):",
      label: "Path Filter",
      name: "path_filter",
      optional: true,
      description: "Optional path to limit indexing to a specific folder (e.g., /Documents)",
    },
    {
      type: "list",
      query: "Enter file extensions to include (optional):",
      label: "File Extensions",
      name: "file_extensions",
      optional: true,
      description: "Optional list of file extensions to include (e.g., .pdf, .docx, .txt)",
    },
  ],
},
