import { v4 as uuid } from 'uuid';

export const generateImageName = (image) => {
    return uuid() + "_" + image
}
