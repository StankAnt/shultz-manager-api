module.exports.shultzTypes = {
  WHISPER: { power: 1, name: 'Whisper' },
  LIKE_A_GIRL: { power: 2, name: 'Like a girl' },
  DAFAULT: { power: 3, name: 'Default' },
  SHULTZ: { power: 4, name: 'Shultz' },
  SKURCHIK: { power: 5, name: 'Skurchik' },
  ALCO_SHULTZ: { power: 6, name: 'Alco shultz' }
};

module.exports.errorTypes = {
  // request errors
  DUBLICATE_COMMENT: 100,
  REQUIRED_PARAMS: 101,
  VALIDATION_ERROR: 102,
  INVALID_AUTH: 103,
  INVALID_DATA: 104,
  // DB errors
  DUPLICATE_RECORD: 200,
  INTERNAL_DB_ERROR: 201,
  // Untyped errors
  FCM_ERROR: 300
};
