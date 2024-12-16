import { Metadata } from "next";

const defaultMetadataValues: Metadata = {
  title: "CodeLingo",
  description: "CodeLingo masih dalam tahap development",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export const defineMetadata = (metadata?: Metadata) => {
  const title = metadata?.title
    ? `${metadata.title} | CodeLingo`
    : defaultMetadataValues.title;
  return {
    ...defaultMetadataValues,
    ...metadata,
    title,
  };
};
