import type { Concrete } from './util.type';
import type { components } from '@/schema';

export type TagType = Concrete<
  components['schemas']['baguni.api.application.tag.dto.TagApiResponse$Read']
>;

export type GetTagListResponseType = Concrete<
  components['schemas']['baguni.api.application.tag.dto.TagApiResponse$Read']
>[];

export type CreateTagRequestType =
  components['schemas']['baguni.api.application.tag.dto.TagApiRequest$Create'];

export type CreateTagResponseType = Concrete<
  components['schemas']['baguni.api.application.tag.dto.TagApiResponse$Create']
>;

export type UpdateTagRequestType =
  components['schemas']['baguni.api.application.tag.dto.TagApiRequest$Update'];

export type UpdateTagResponseType = Concrete<
  components['schemas']['baguni.api.application.tag.dto.TagApiResponse$Create']
>;

export type DeleteTagRequestType =
  components['schemas']['baguni.api.application.tag.dto.TagApiRequest$Delete'];
