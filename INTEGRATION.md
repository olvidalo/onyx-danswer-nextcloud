# Nextcloud Connector Integration Guide

This guide provides step-by-step instructions for integrating the Nextcloud connector into the main Onyx repository.

## Overview

The Nextcloud connector consists of:

- **Backend**: Connector logic and WebDAV client
- **Frontend**: UI components and configuration forms
- **Documentation**: Setup and usage instructions

## Backend Integration

### 1. Add Connector Files

Copy the following files to the Onyx repository:

```bash
# Destination: onyx/backend/onyx/connectors/nextcloud/
backend/onyx/connectors/nextcloud/__init__.py
backend/onyx/connectors/nextcloud/connector.py
backend/onyx/connectors/nextcloud/client.py
```

### 2. Update DocumentSource Enum

Add the Nextcloud source to the DocumentSource enum:

**File**: `onyx/backend/onyx/configs/constants.py`

```python
class DocumentSource(str, Enum):
    # ... existing sources ...
    NEXTCLOUD = "nextcloud"
```

### 3. Update Connector Factory

Add the Nextcloud connector to the factory mapping:

**File**: `onyx/backend/onyx/connectors/factory.py`

```python
from onyx.connectors.nextcloud.connector import NextcloudConnector

# Add to the factory mappings
if source_type == DocumentSource.NEXTCLOUD:
    connector = NextcloudConnector(
        server_url=connector_specific_config.get("server_url"),
        username=connector_specific_config.get("username"),
        password=connector_specific_config.get("password"),
        path_filter=connector_specific_config.get("path_filter", ""),
        file_extensions=connector_specific_config.get("file_extensions"),
        verify_ssl=connector_specific_config.get("verify_ssl", True),
        batch_size=INDEX_BATCH_SIZE,
    )
```

### 4. Add Dependencies (if needed)

If using the secure XML parser, add to requirements:

**File**: `onyx/backend/requirements.txt`

```text
defusedxml>=0.7.1
```

## Frontend Integration

### 1. Add Source Metadata

**File**: `onyx/web/src/lib/sources.ts`

Add the Nextcloud source metadata:

```typescript
import { NextcloudIcon } from "@/components/icons/NextcloudIcon";

// Add to sources mapping
[DocumentSource.NEXTCLOUD]: {
  icon: NextcloudIcon,
  displayName: "Nextcloud",
  category: SourceCategory.StorageSystems,
},
```

### 2. Add Icon Component

**File**: `onyx/web/src/components/icons/NextcloudIcon.tsx`

Copy the icon component from `frontend/NextcloudIcon.tsx`.

### 3. Add to Valid Sources

**File**: `onyx/web/src/lib/types.ts`

Add Nextcloud to the ValidSources type:

```typescript
export type ValidSources =
  | "web"
  | "github"
  | "gitlab"
  | "slack"
  | "google_drive"
  | "gmail"
  | "bookstack"
  | "confluence"
  | "slab"
  | "jira"
  | "productboard"
  | "file"
  | "notion"
  | "guru"
  | "zulip"
  | "linear"
  | "hubspot"
  | "document360"
  | "requesttracker"
  | "loopio"
  | "dropbox"
  | "sharepoint"
  | "teams"
  | "zendesk"
  | "gong"
  | "nextcloud"; // Add this line
```

### 4. Add Connector Configuration

**File**: `onyx/web/src/app/admin/connectors/[connector]/page.tsx`

Add the Nextcloud configuration form. Create a new case in the connector switch:

```typescript
case "nextcloud":
  return <NextcloudConnectorPage />;
```

### 5. Create Configuration Page

**File**: `onyx/web/src/app/admin/connectors/nextcloud/page.tsx`

Create the configuration page using the template from `frontend/connector-config-patch.ts`.

## Configuration Schema

The connector expects the following configuration:

```typescript
interface NextcloudConfig {
  server_url: string; // Required: Nextcloud server URL
  username: string; // Required: Username
  password: string; // Required: Password or app token
  path_filter?: string; // Optional: Limit to specific path
  file_extensions?: string; // Optional: Comma-separated extensions
  verify_ssl?: boolean; // Optional: SSL verification (default: true)
}
```

## Credential Validation

The connector validates credentials with these required fields:

- `server_url`
- `username`
- `password`

## Form Validation

Use Yup validation schema:

```typescript
const validationSchema = Yup.object({
  server_url: Yup.string()
    .url("Must be a valid URL")
    .required("Server URL is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  path_filter: Yup.string(),
  file_extensions: Yup.string(),
});
```

## Testing Integration

### 1. Backend Tests

Run the standalone test to verify backend functionality:

```bash
cd onyx/backend/onyx/connectors/nextcloud
export NEXTCLOUD_SERVER_URL="https://demo.nextcloud.com"
export NEXTCLOUD_USERNAME="demo"
export NEXTCLOUD_PASSWORD="demo"
python test_connector.py
```

### 2. Frontend Tests

Test the UI components:

1. Navigate to `/admin/connectors`
2. Click "Add Connector"
3. Select "Nextcloud"
4. Fill in configuration form
5. Test connection
6. Create connector

### 3. End-to-End Testing

1. Configure a Nextcloud connector
2. Run initial sync
3. Verify documents appear in Onyx
4. Test search functionality
5. Verify incremental sync works

## Common Integration Issues

### 1. Import Errors

Ensure all import paths are correct for the Onyx repository structure.

### 2. Missing Dependencies

Install any required dependencies (`defusedxml`, etc.).

### 3. Type Mismatches

Verify TypeScript types match the expected interfaces.

### 4. Authentication Issues

Test with various Nextcloud configurations:

- Regular password
- App-specific password
- Two-factor authentication
- Self-signed certificates

## Security Review

Before deployment, review:

1. **Credential Handling**: Ensure no credentials are logged or exposed
2. **SSL Verification**: Default to secure settings
3. **Input Validation**: Sanitize user inputs
4. **Error Messages**: Don't expose sensitive information
5. **XML Parsing**: Use secure XML parser (defusedxml)

## Performance Considerations

1. **Batch Size**: Default `INDEX_BATCH_SIZE = 50`
2. **File Size Limits**: Configure appropriate limits
3. **Connection Timeouts**: Set reasonable timeout values
4. **Memory Usage**: Monitor memory with large file sets

## Deployment Checklist

- [ ] Backend connector files copied
- [ ] DocumentSource enum updated
- [ ] Factory mapping added
- [ ] Frontend components integrated
- [ ] Source metadata configured
- [ ] Configuration page created
- [ ] Dependencies installed
- [ ] Tests passing
- [ ] Security review completed
- [ ] Documentation updated

## Support and Maintenance

After integration:

1. Monitor connector performance
2. Handle user support requests
3. Update documentation as needed
4. Maintain compatibility with Nextcloud updates
5. Add new features based on user feedback

## Version Compatibility

This connector is compatible with:

- **Onyx**: Latest main branch
- **Nextcloud**: Version 20+
- **Python**: 3.8+
- **Node.js**: 16+ (for frontend)

## Additional Resources

- [Nextcloud WebDAV Documentation](https://docs.nextcloud.com/server/latest/developer_manual/client_apis/WebDAV/index.html)
- [Onyx Connector Development Guide](https://docs.onyx.app/connectors)
- [WebDAV RFC Specification](https://tools.ietf.org/html/rfc4918)
