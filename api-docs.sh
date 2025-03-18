#!/bin/bash

DOCS_ENPOINT=http://localhost:8080/api/v3/api-docs
curl  http://localhost:8080/api/v3/api-docs -o openapi.json
# openapi -i $DOCS_ENPOINT -c axios -o ./clockee-ui/src/gen/ --request ./clockee-ui/src/gen/core/request.ts

npx openapi-typescript-codegen --input ./openapi.json   --client axios --request ./clockee-ui/src/lib/request.ts --output ./clockee-ui/src/gen/
