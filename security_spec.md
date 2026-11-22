# Firestore Security Specification (`injazbuilders.com`)

## 1. Data Invariants
1. **Default Deny**: All unconfigured paths under `/databases/{database}/documents` are denied by default.
2. **Verified Admin Gate**: All CMS writes (`site_settings`, `cms_nav_items`, `cms_services`, `cms_projects`, `cms_gallery`, `cms_careers`, `cms_clients`, `cms_legal_pages`, `email_templates`) and all PII reads/writes (`contact_inquiries`, `career_applications`, `admins`) require `request.auth != null && request.auth.token.email_verified == true` and membership in the verified admin allowlist or `/admins/{uid}`.
3. **PII Isolation**: Public visitors may only `create` `contact_inquiries` and `career_applications` with `status == 'new'` and `createdAt == request.time`. Public `get` or `list` on inquiries/applications/email templates is strictly denied.
4. **Strict Payload Boundaries**: Every `create` and `update` enforces required keys, `hasOnly(...)` allowlists (blocking shadow fields), bounded string lengths, valid document IDs (`^[a-zA-Z0-9_\-]+$`, max 128 chars), and immutable `createdAt` on updates.

## 2. Adversarial Test Matrix (Dirty Dozen Payloads)
1. **Unauthenticated CMS Write**: `POST /cms_projects/p1` with `auth == null` -> `PERMISSION_DENIED`.
2. **Unverified Admin Email Spoof**: `POST /cms_gallery/g1` with `email == 'shafiq.rehman31@gmail.com'` and `email_verified == false` -> `PERMISSION_DENIED`.
3. **Unauthorized Signed-In User CMS Write**: `POST /site_settings/main` by non-admin verified Gmail user -> `PERMISSION_DENIED`.
4. **Self-Assigned Admin Escalation**: Non-admin creates `/admins/{theirUid}` with `role: 'admin'` -> `PERMISSION_DENIED`.
5. **Public Inquiry Enumeration (PII Leak)**: `LIST /contact_inquiries` or `GET /career_applications/{id}` by anonymous or non-admin user -> `PERMISSION_DENIED`.
6. **Shadow Field Injection**: Public `CREATE /contact_inquiries/{id}` adding `isApproved: true` or `adminOverride: true` -> `PERMISSION_DENIED` (`hasOnly` rejects).
7. **Status Forgery on Public Submission**: Public `CREATE /contact_inquiries/{id}` with `status: 'replied'` -> `PERMISSION_DENIED`.
8. **Timestamp Forgery**: Public `CREATE /career_applications/{id}` with backdated `createdAt` != `request.time` -> `PERMISSION_DENIED`.
9. **ID Poisoning**: Creating document with 500-char or slash/space ID -> `PERMISSION_DENIED` (`isValidId`).
10. **Oversized String DoS**: Creating `cms_legal_pages` with `contentEn.size() > 8000` or `contact_inquiries` with `message.size() > 3000` -> `PERMISSION_DENIED`.
11. **Immutable `createdAt` Tampering**: Admin updating `contact_inquiries` while modifying `createdAt` -> `PERMISSION_DENIED`.
12. **Type Poisoning**: Sending a boolean or number in `titleEn` or `email` -> `PERMISSION_DENIED`.
