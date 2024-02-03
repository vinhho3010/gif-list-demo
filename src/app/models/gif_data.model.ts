export interface GifData {
  id: string;
  title: string;
  url: string;
  rating: string;
  source: string;
  import_datetime: string;
  trending_datetime: string;
  images: any;
  user: User;
}

export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  description: string;
  display_name: string;
  instagram_url: string;
  is_verified: string;
  profile_url: string;
  username: string;
  website_url: string;
}

export interface Image {
  '480w_still': ImageData;
  downsized: ImageData;
  downsized_large: ImageData;
  downsized_medium: ImageData;
  downsized_small: ImageData;
  downsized_still: ImageData;
  fixed_height: ImageData;
  fixed_height_downsampled: ImageData;
  fixed_height_small: ImageData;
  fixed_height_small_still: ImageData;
  fixed_height_still: ImageData;
  fixed_width: ImageData;
  fixed_width_downsampled: ImageData;
  fixed_width_small: ImageData;
  fixed_width_small_still: ImageData;
  fixed_width_still: ImageData;
  looping: Mp4Data;
  original: ImageData;
  original_mp4: Mp4Data;
  original_still: ImageData;
  preview: ImageData;
  preview_gif: ImageData;
  preview_webp: ImageData;

  import_datetime: string;
  trending_datetime: string;
  title: string;
  username: string;
  source: string;
  rating: string;
  slug: string;
  type: string;
  id: string;
}

export interface ImageData {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface Mp4Data {
  height?: string;
  mp4: string;
  mp4_size: string;
  width?: string;
}
