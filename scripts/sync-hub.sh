#!/bin/sh
# Copy registries into the hub so its layout/model pickers see new entries (run before hub deploy; hub deploy needs owner approval)
cd "$(dirname "$0")/../.." && mkdir -p hub/lib/ds-registry && cp design-system/registry/layouts.json design-system/registry/models.json design-system/registry/typography.json hub/lib/ds-registry/ && echo "PASS: registries synced to hub/lib/ds-registry"
