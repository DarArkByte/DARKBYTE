# Security Specification - Dar-Ark Byte

## Data Invariants
1. A Result cannot exist without a valid School, Student, and Subject ID.
2. Only Teachers or Admins from the same School can create or edit Results.
3. Parents and Students can only read Results that are in 'published' status.
4. User profiles must belong to exactly one School (except Super Admins).
5. Only Super Admins can create new Schools.

## The "Dirty Dozen" Payloads (Denial Expected)

1. **Identity Spoofing**: Attempt to create a Result with `teacherId` of another user.
2. **State Shortcutting**: Teacher trying to set Result status to 'published' directly.
3. **Cross-Tenant Access**: User from School A attempting to read Results from School B.
4. **Privilege Escalation**: Teacher attempting to update their own `role` to 'school-admin'.
5. **Orphaned Results**: Creating a Result for a `studentId` that doesn't exist in the school.
6. **Value Poisoning**: Setting `ca1` score to 1,000,000.
7. **Malicious ID Injection**: Creating a document with a 2KB junk string as ID.
8. **Immutability Breach**: Attempting to change `schoolId` on an existing Result doc.
9. **PII Leakage**: Authenticated user from School A attempting to list all emails in `/users`.
10. **Unauthorized Approval**: Teacher attempting to change status from 'draft' to 'approved'.
11. **Draft Leakage**: Parent attempting to read a Result in 'draft' status.
12. **System Field Injection**: Attempting to overwrite `updatedAt` with a client-provided future timestamp (must use server timestamp).

## Test Runner
(See `firestore.rules.test.ts` for implementation)
