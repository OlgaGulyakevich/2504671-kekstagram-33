import { MAX_HASHTAGS, HASHTAG_REGEX, MAX_HASHTAG_LENGTH, HashtagErrorMessages } from './constants.js';

// Валидация хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) {
    return { valid: true };
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return { valid: false, error: HashtagErrorMessages.MAX_COUNT };
  }

  for (const hashtag of hashtags) {
    if (!hashtag.startsWith('#')) {
      return { valid: false, error: HashtagErrorMessages.START_WITH_HASH };
    }

    if (hashtag === '#') {
      return { valid: false, error: HashtagErrorMessages.START_ONLY_HASH };
    }

    if (!HASHTAG_REGEX.test(hashtag)) {
      return { valid: false, error: HashtagErrorMessages.VALID_CHARACTERS };
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return { valid: false, error: HashtagErrorMessages.MAX_LENGTH };
    }
  }

  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  if (uniqueHashtags.size !== hashtags.length) {
    return { valid: false, error: HashtagErrorMessages.UNIQUE };
  }

  return { valid: true };
};

export { validateHashtags };
