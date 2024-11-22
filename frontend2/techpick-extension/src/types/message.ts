export type RequestMessageType = string;

export type ResponseMessageType = {
  type: string;
};

export type ResponseOgImageType = {
  type: 'OG_IMAGE' | string;
  ogImageUrl: string | null;
};

export const isResponseOgImageType = (
  message: ResponseMessageType
): message is ResponseOgImageType => {
  return message.type === 'OG_IMAGE' && 'ogImageUrl' in message;
};
