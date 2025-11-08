export function extractAvatarUrl(userMetadata: any): string | undefined {
  if (!userMetadata) return undefined;

  const possibleFields = [
    'avatar_url',
    'picture',
    'photo',
    'image',
    'profile_image',
    'avatar',
  ];

  for (const field of possibleFields) {
    const value = userMetadata[field];
    if (value && typeof value === 'string' && value.trim() !== '') {
      return value;
    }
  }

  return undefined;
}

export function extractUserName(userMetadata: any, email?: string): string {
  if (!userMetadata) return email || 'User';

  const possibleFields = [
    'full_name',
    'name',
    'display_name',
    'given_name',
  ];

  for (const field of possibleFields) {
    const value = userMetadata[field];
    if (value && typeof value === 'string' && value.trim() !== '') {
      return value;
    }
  }

  return email || 'User';
}
