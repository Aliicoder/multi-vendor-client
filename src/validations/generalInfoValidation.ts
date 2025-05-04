import { z } from "zod";
const fileTypeValidation = (file: File) => {
  //if (typeof file === "string") return true; // Assuming URLs (strings) are always valid
  return file.type === "image/jpeg" || file.type === "video/mp4";
};

export default z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  image: z.instanceof(File)
    .refine(fileTypeValidation, {
      message: "Only JPG and MP4 files are allowed.",
    }), 
});