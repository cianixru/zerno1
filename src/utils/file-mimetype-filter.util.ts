import { UnsupportedMediaTypeException } from '@nestjs/common';
import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  const allowedMimetypes = ['image/jpeg', 'image/png']; // TODO: в config
  if (!allowedMimetypes.includes(file.mimetype)) {
    return callback(
      new UnsupportedMediaTypeException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 1000).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
