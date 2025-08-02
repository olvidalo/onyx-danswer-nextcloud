// Addition to web/src/lib/sources.ts SOURCE_METADATA_MAP

import { NextcloudIcon } from "@/components/icons/icons";

// Add this entry to the SOURCE_METADATA_MAP object:
nextcloud: {
  icon: NextcloudIcon,
  displayName: "Nextcloud",
  category: SourceCategory.Storage,
  docs: "https://docs.onyx.app/connectors/nextcloud",
},
