# Addition to backend/onyx/configs/constants.py

# Add to DocumentSource enum:
class DocumentSource(str, Enum):
    # ... existing sources ...
    NEXTCLOUD = "nextcloud"
