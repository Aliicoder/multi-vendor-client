import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Header from "@/components/shared/Header";
import { useGetAiSearchedProductsMutation } from "@/store/apiSlices/productSlice";
import { FaArrowUp } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import { IProduct } from "@/types/types";
import { useState } from "react";
import CustomButton from "@/components/buttons/CustomButton";
import ProductCard from "@/components/cards/ProductCard";
import { errorToast, successToast } from "@/lib/utils";
import Loader from "@/components/Loaders/Loader";
const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
function AISearchPage() {
  const [aiSearchMutation] = useGetAiSearchedProductsMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await aiSearchMutation({
        prompt: values.prompt,
        perPage: 4,
        curPage: 1,
        outOfStock: false,
      }).unwrap();
      console.log("response >>", response);
      successToast(response.message);
      setProducts(response.products);
    } catch (error: any) {
      errorToast(error.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Header className="border-b border-neutral-100" />
      <div
        style={{ height: "calc(100svh - var(--header-height))" }}
        className="relative flex flex-col justify-between"
      >
        {isLoading && <Loader />}

        <div className="container grow grid grid-cols-4 p-3 gap-3 mx-auto px-6">
          {products &&
            products.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
        <div className="bg-white border-neutral-100 border-t">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="container p-8 mx-auto space-y-8"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about what you are looking for"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end p-3">
                <CustomButton
                  className="bg-black p-3 rounded-full shadow-sm drop-shadow-lg"
                  type="submit"
                >
                  <FaArrowUp className="text-white" />
                </CustomButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AISearchPage;
